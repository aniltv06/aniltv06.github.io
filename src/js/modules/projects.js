/**
 * Projects Page Module
 * Handles rendering and interactions for projects showcase
 */

import { projects, getProjectStats } from '../data/projects.js';
import { ProjectsFilter } from './projects-filter.js';
import { trackEvent } from './analytics.js';
import { qs, announce } from './utils.js';

let projectsFilter = null;

/**
 * Initialize projects page
 */
export function initProjectsPage() {
  // Show skeleton loader
  showSkeletonLoader();

  // Update stats
  updateStats();

  // Initialize filter system
  projectsFilter = new ProjectsFilter(projects, handleFilterChange);

  // Initial render
  renderProjects(projects);

  // Update initial results count
  updateResultsCount(projects.length);

  // Setup modal triggers (will be handled by existing modal.js)
  setupProjectCardListeners();

  // Hide skeleton loader after render
  hideSkeletonLoader();
}

/**
 * Update results count display
 */
function updateResultsCount(count) {
  const countEl = qs('[data-results-count]');
  const pluralEl = qs('[data-results-plural]');

  if (countEl) countEl.textContent = count;
  if (pluralEl) pluralEl.textContent = count === 1 ? '' : 's';
}

/**
 * Update stats display
 */
function updateStats() {
  const stats = getProjectStats();

  const updateStat = (selector, value) => {
    const el = qs(`[data-stat="${selector}"]`);
    if (el) el.textContent = value;
  };

  updateStat('total', stats.total);
  updateStat('platforms', stats.platforms);
  updateStat('technologies', stats.technologies);
}

/**
 * Handle filter change callback
 */
function handleFilterChange(filteredProjects) {
  renderProjects(filteredProjects);

  // Show/hide empty state
  const emptyState = qs('[data-component="empty-state"]');
  const grid = qs('[data-component="projects-grid"]');

  if (filteredProjects.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (grid) grid.style.display = 'none';
    announce('No projects found. Try adjusting your filters.');
  } else {
    if (emptyState) emptyState.style.display = 'none';
    if (grid) grid.style.display = 'grid';
    announce(`Showing ${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'}`);
  }
}

/**
 * Render projects grid
 */
function renderProjects(projectsArray) {
  const grid = qs('[data-component="projects-grid"]');
  if (!grid) return;

  console.log('Rendering projects:', projectsArray.length, projectsArray);

  // Clear existing projects
  grid.innerHTML = '';

  // Render each project
  projectsArray.forEach((project, index) => {
    const card = createProjectCard(project, index);
    grid.appendChild(card);
  });
}

/**
 * Create a project card element
 */
function createProjectCard(project, index) {
  try {
    const card = document.createElement('article');
    card.className = `project-card-full ${project.featured ? 'project-card-full--featured' : ''}`;
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${project.title}`);
    card.setAttribute('data-modal-trigger', project.id);

    // Get first 4 stats
    const statsEntries = Object.entries(project.stats).slice(0, 4);

    console.log('Creating card for:', project.title, 'Stats:', statsEntries.length, 'Tags:', project.tags.length);

    const statsHtml = statsEntries.map(([key, value]) => {
      const label = formatStatLabel(key);
      const escapedValue = escapeHtml(value);
      return `
        <div class="project-stat">
          <span class="project-stat__value">${escapedValue}</span>
          <span class="project-stat__label">${label}</span>
        </div>
      `;
    }).join('');

    const tagsHtml = project.tags.slice(0, 5).map(tag => {
      const escapedTag = escapeHtml(tag);
      const tagCategory = getTagCategory(tag, project);
      return `<span class="project-tag project-tag--${tagCategory}">${escapedTag}</span>`;
    }).join('');

    card.innerHTML = `
      <div class="project-card-full__header">
        <span class="project-card-full__year">${project.year}</span>
        <h2 class="project-card-full__title">${escapeHtml(project.title)}</h2>
        <p class="project-card-full__subtitle">${escapeHtml(project.subtitle)}</p>
      </div>

      <p class="project-card-full__description">
        ${escapeHtml(project.shortDescription)}
      </p>

      <div class="project-card-full__stats">
        ${statsHtml}
      </div>

      <div class="project-card-full__tags">
        ${tagsHtml}
      </div>

      <div class="project-card-full__action">
        View Details →
      </div>
    `;

    console.log('Card HTML length:', card.innerHTML.length);
    return card;
  } catch (error) {
    console.error('Error creating project card:', error, project);
    const errorCard = document.createElement('article');
    errorCard.className = 'project-card-full';
    errorCard.innerHTML = '<p>Error loading project</p>';
    return errorCard;
  }
}

/**
 * Format stat label for display
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
    receipts: 'Receipts'
  };

  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Escape HTML to prevent XSS
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

/**
 * Get tag category for color coding
 */
function getTagCategory(tag, project) {
  // Check if tag is in platform category
  if (project.categories.platform.includes(tag)) {
    return 'platform';
  }

  // Check if tag is in type category
  if (project.categories.type.includes(tag)) {
    return 'type';
  }

  // Check if tag is in tech category
  if (project.categories.tech.includes(tag)) {
    return 'tech';
  }

  // Default to tech if not found
  return 'tech';
}

/**
 * Get project by ID (utility)
 */
export function getProjectById(id) {
  return projects.find(p => p.id === id);
}

/**
 * Get filtered projects (utility)
 */
export function getFilteredProjects() {
  return projectsFilter ? projectsFilter.getFilteredProjects() : projects;
}

/**
 * Show skeleton loader
 */
function showSkeletonLoader() {
  const skeleton = qs('[data-component="skeleton-loader"]');
  const grid = qs('[data-component="projects-grid"]');

  if (skeleton) skeleton.style.display = 'grid';
  if (grid) grid.style.display = 'none';
}

/**
 * Hide skeleton loader
 */
function hideSkeletonLoader() {
  const skeleton = qs('[data-component="skeleton-loader"]');
  const grid = qs('[data-component="projects-grid"]');

  if (skeleton) skeleton.style.display = 'none';
  if (grid) grid.style.display = 'grid';
}

/**
 * Setup project card listeners
 */
function setupProjectCardListeners() {
  // Modal triggers are handled by modal.js
  // This function can be extended if needed
}
