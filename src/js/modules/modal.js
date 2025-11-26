/**
 * Modal Module
 * Handles modal display, focus trapping, and accessibility
 */

import { qs, trapFocus, announce } from './utils.js';
import { trackEvent } from './analytics.js';

let currentModal = null;
let previousFocus = null;
let removeFocusTrap = null;

// Import projects data dynamically
let projectsData = null;

// Legacy modal content for education (non-project modals)
const LEGACY_MODAL_CONTENT = {
  masters: {
    title: 'Master of Science',
    subtitle: 'Computer Science & Information Engineering',
    content: `
      <h3>Asia University, Taiwan (2014)</h3>
      <p>Specialized in software engineering and distributed systems.</p>
      <h4>Key Coursework:</h4>
      <ul>
        <li>Advanced Algorithms & Data Structures</li>
        <li>Distributed Systems</li>
        <li>Software Architecture</li>
        <li>Machine Learning Fundamentals</li>
      </ul>
    `,
  },
  bachelors: {
    title: 'Bachelor of Engineering',
    subtitle: 'Electronics & Communication Engineering',
    content: `
      <h3>Visvesvaraya Technological University, India (2010)</h3>
      <p>Foundation in electronics and software development.</p>
      <h4>Achievements:</h4>
      <ul>
        <li>First Class with Distinction</li>
        <li>Led student technical team</li>
        <li>Published research paper on embedded systems</li>
      </ul>
    `,
  },
};

/**
 * Load projects data lazily
 */
async function loadProjectsData() {
  if (projectsData) return projectsData;

  try {
    const module = await import('../data/projects.js');
    projectsData = module.projects;
    return projectsData;
  } catch (error) {
    console.warn('Could not load projects data:', error);
    return [];
  }
}

/**
 * Get modal content for a given ID
 */
async function getModalContent(modalId) {
  // Check legacy content first (education)
  if (LEGACY_MODAL_CONTENT[modalId]) {
    return LEGACY_MODAL_CONTENT[modalId];
  }

  // Load projects data
  const projects = await loadProjectsData();
  const project = projects.find(p => p.id === modalId);

  if (project) {
    return generateProjectModalContent(project);
  }

  return null;
}

/**
 * Generate rich modal content from project data
 */
function generateProjectModalContent(project) {
  const statsHtml = Object.entries(project.stats).map(([key, value]) => `
    <div class="project-stat-inline">
      <strong>${formatStatLabel(key)}:</strong> ${escapeHtml(value)}
    </div>
  `).join('');

  const content = `
    <div class="modal-project">
      <div class="modal-project__meta">
        <span class="modal-project__year">Year: ${project.year}</span>
        ${project.featured ? '<span class="modal-project__badge">⭐ Featured</span>' : ''}
      </div>

      <div class="modal-project__stats">
        ${statsHtml}
      </div>

      ${project.overview ? `
        <h3>Overview</h3>
        <p>${escapeHtml(project.overview)}</p>
      ` : ''}

      <h3>Key Features</h3>
      <ul>
        ${project.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
      </ul>

      <h3>Impact & Results</h3>
      <ul>
        ${project.impact.map(i => `<li>${escapeHtml(i)}</li>`).join('')}
      </ul>

      <h3>My Role</h3>
      <ul>
        ${project.myRole.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
      </ul>

      <h3>Technology Stack</h3>
      <div class="modal-tech-stack">
        ${project.techStack.languages ? `
          <div class="tech-stack-section">
            <h4>Languages</h4>
            <p>${project.techStack.languages.join(', ')}</p>
          </div>
        ` : ''}
        ${project.techStack.frameworks ? `
          <div class="tech-stack-section">
            <h4>Frameworks</h4>
            <p>${project.techStack.frameworks.join(', ')}</p>
          </div>
        ` : ''}
        ${project.techStack.systemAPIs ? `
          <div class="tech-stack-section">
            <h4>System APIs</h4>
            <p>${project.techStack.systemAPIs.join(', ')}</p>
          </div>
        ` : ''}
        ${project.techStack.infrastructure ? `
          <div class="tech-stack-section">
            <h4>Infrastructure</h4>
            <p>${project.techStack.infrastructure.join(', ')}</p>
          </div>
        ` : ''}
        ${project.techStack.architecture ? `
          <div class="tech-stack-section">
            <h4>Architecture</h4>
            <p>${project.techStack.architecture.join(', ')}</p>
          </div>
        ` : ''}
      </div>

      <div class="modal-project__timeline">
        <strong>Timeline:</strong> ${project.timeline.duration}
        ${project.timeline.start ? ` (${project.timeline.start} - ${project.timeline.end})` : ''}
      </div>
    </div>
  `;

  return {
    title: project.title,
    subtitle: project.subtitle,
    content
  };
}

/**
 * Format stat label
 */
function formatStatLabel(key) {
  const labels = {
    users: 'Users',
    stores: 'Stores',
    accuracy: 'Accuracy',
    impact: 'Impact',
    uptime: 'Uptime',
    integrations: 'Integrations',
    rating: 'Rating',
    apis: 'APIs',
    bookings: 'Bookings',
    savings: 'Savings',
    platforms: 'Platforms',
    timeSaved: 'Time Saved',
    receipts: 'Receipts Scanned'
  };
  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

export function initModal() {
  setupModalTriggers();
  setupModalClose();
  setupKeyboardHandlers();
}

function setupModalTriggers() {
  // Use event delegation on document for dynamically created triggers
  document.addEventListener('click', async (e) => {
    const trigger = e.target.closest('[data-modal-trigger]');
    if (trigger) {
      await handleModalOpen.call(trigger, e);
    }
  });

  document.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const trigger = e.target.closest('[data-modal-trigger]');
      if (trigger) {
        e.preventDefault();
        await handleModalOpen.call(trigger, e);
      }
    }
  });
}

async function handleModalOpen() {
  const modalId = this.dataset.modalTrigger;
  const content = await getModalContent(modalId);

  if (content) {
    openModal(content);
    trackEvent('modal_open', { modal_id: modalId });
  }
}

function openModal(content) {
  const modal = qs('[data-component="modal"]');
  const modalBody = qs('[data-modal-body]', modal);

  if (!modal || !modalBody) return;

  previousFocus = document.activeElement;

  modalBody.innerHTML = `
    <h2 id="modal-title" class="modal__title">${content.title}</h2>
    <p class="modal__subtitle">${content.subtitle}</p>
    <div class="modal__text">${content.content}</div>
  `;

  modal.dataset.state = 'open';
  modal.classList.add('modal--active');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  removeFocusTrap = trapFocus(modal);

  setTimeout(() => {
    const closeBtn = qs('[data-action="close-modal"]', modal);
    if (closeBtn) closeBtn.focus();
  }, 100);

  currentModal = modal;
  announce(`Modal opened: ${content.title}`);
}

function setupModalClose() {
  document.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  const modal = qs('[data-component="modal"]');
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }
}

function setupKeyboardHandlers() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && currentModal) {
      closeModal();
    }
  });
}

export function closeModal() {
  const modal = qs('[data-component="modal"]');
  if (!modal || modal.dataset.state === 'closed') return;

  if (removeFocusTrap) {
    removeFocusTrap();
    removeFocusTrap = null;
  }

  modal.dataset.state = 'closed';
  modal.classList.remove('modal--active', 'modal--easter-egg');
  modal.style.display = 'none';
  document.body.style.overflow = '';

  // Reset modal content styling (in case easter egg was shown)
  const modalContent = modal.querySelector('.modal__content');
  if (modalContent) {
    modalContent.style.animation = '';
    modalContent.style.background = '';
    modalContent.style.border = '';
    modalContent.style.boxShadow = '';
  }

  if (previousFocus) {
    previousFocus.focus();
    previousFocus = null;
  }

  currentModal = null;
  announce('Modal closed');
  trackEvent('modal_close');
}
