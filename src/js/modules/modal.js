/**
 * Modal Module
 * Handles modal display, focus trapping, and accessibility
 */

import { qs, trapFocus, announce } from './utils.js';
import { trackEvent } from './analytics.js';

let currentModal = null;
let previousFocus = null;
let removeFocusTrap = null;

const MODAL_CONTENT = {
  genius: {
    title: 'Genius & RepairCentral',
    subtitle: 'AI-Powered Repair Management System',
    content: `
      <p>Transformative AI-powered system serving 500+ Apple Retail stores worldwide.</p>
      <h3>Key Features:</h3>
      <ul>
        <li>AI/ML models reducing diagnostic time by 40%</li>
        <li>95% accuracy in repair recommendations</li>
        <li>Real-time inventory management</li>
        <li>Intelligent workflow automation with Claude AI</li>
      </ul>
      <h3>Impact:</h3>
      <ul>
        <li>Reduced customer wait time by 30%</li>
        <li>Improved repair success rate by 25%</li>
        <li>Saved $2M annually in operational costs</li>
      </ul>
    `,
  },
  'customer-success': {
    title: 'Customer Success Platform',
    subtitle: 'Enterprise Customer Management System',
    content: `
      <p>Comprehensive platform managing 1000+ daily users with 99.9% uptime.</p>
      <h3>Features:</h3>
      <ul>
        <li>Real-time customer analytics dashboard</li>
        <li>Automated workflow management</li>
        <li>Integration with 5+ backend systems</li>
        <li>Advanced reporting and insights</li>
      </ul>
    `,
  },
  appletravel: {
    title: 'Apple Travel',
    subtitle: 'Enterprise Travel Management',
    content: `
      <p>Comprehensive travel management app with 4.6 star rating.</p>
      <h3>Features:</h3>
      <ul>
        <li>Integration with 3 third-party travel APIs</li>
        <li>Real-time flight and hotel booking</li>
        <li>Expense tracking and reporting</li>
        <li>Offline support for travel itineraries</li>
      </ul>
    `,
  },
  expenses: {
    title: 'Expenses (iOS & macOS)',
    subtitle: 'Cross-Platform Expense Management',
    content: `
      <p>Universal app for iOS and macOS with seamless sync.</p>
      <h3>Features:</h3>
      <ul>
        <li>OCR receipt scanning reducing entry time by 70%</li>
        <li>CloudKit sync across devices</li>
        <li>Automated expense categorization</li>
        <li>Export to multiple formats (PDF, Excel, QuickBooks)</li>
      </ul>
    `,
  },
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

export function initModal() {
  setupModalTriggers();
  setupModalClose();
  setupKeyboardHandlers();
}

function setupModalTriggers() {
  document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
    trigger.addEventListener('click', handleModalOpen);
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleModalOpen.call(trigger);
      }
    });
  });
}

function handleModalOpen() {
  const modalId = this.dataset.modalTrigger;
  const content = MODAL_CONTENT[modalId];

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
