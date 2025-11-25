/**
 * Projects Filter Module
 * Handles search, filtering, and sorting of projects
 */

import { filterProjects, sortProjects } from '../data/projects.js';
import { trackEvent } from './analytics.js';
import { qs, qsa } from './utils.js';

export class ProjectsFilter {
  constructor(projects, onFilterChange) {
    this.allProjects = projects;
    this.filteredProjects = [...projects];
    this.onFilterChange = onFilterChange;

    this.filters = {
      search: '',
      platform: null,
      type: null,
      tech: null,
      year: null
    };

    this.sortBy = 'year-desc';

    this.init();
  }

  init() {
    this.setupSearchInput();
    this.setupFilterChips();
    this.setupSortControl();
    this.setupResetButton();
  }

  /**
   * Setup search input with debouncing
   */
  setupSearchInput() {
    const searchInput = qs('[data-filter="search"]');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.filters.search = e.target.value.trim();
        this.applyFilters();
        trackEvent('projects_search', { query: this.filters.search });
      }, 300); // 300ms debounce
    });
  }

  /**
   * Setup filter chips
   */
  setupFilterChips() {
    const chips = qsa('.filter-chip');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.handleChipClick(chip);
      });

      // Keyboard support
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleChipClick(chip);
        }
      });
    });
  }

  /**
   * Handle filter chip click
   */
  handleChipClick(chip) {
    const filterType = chip.dataset.filterType;
    const filterValue = chip.dataset.filterValue;

    // Handle "All Projects" chip
    if (filterType === 'all') {
      this.resetFilters();
      this.updateChipStates();
      return;
    }

    // Toggle active state
    const isActive = chip.classList.contains('filter-chip--active');

    if (isActive) {
      // Remove filter
      chip.classList.remove('filter-chip--active');
      this.filters[filterType] = null;
    } else {
      // Remove other active chips of same type
      qsa(`.filter-chip[data-filter-type="${filterType}"]`).forEach(c => {
        c.classList.remove('filter-chip--active');
      });

      // Add filter
      chip.classList.add('filter-chip--active');
      this.filters[filterType] = filterValue;
    }

    // Update "All Projects" chip state
    this.updateChipStates();

    // Apply filters
    this.applyFilters();

    // Track event
    trackEvent('projects_filter', {
      type: filterType,
      value: filterValue,
      active: !isActive
    });
  }

  /**
   * Update chip states (especially "All Projects" chip)
   */
  updateChipStates() {
    const allChip = qs('.filter-chip[data-filter-type="all"]');
    if (!allChip) return;

    const hasActiveFilters = Object.values(this.filters).some(v => v !== null && v !== '');

    if (hasActiveFilters) {
      allChip.classList.remove('filter-chip--active');
    } else {
      allChip.classList.add('filter-chip--active');
    }
  }

  /**
   * Setup sort control
   */
  setupSortControl() {
    const sortSelect = qs('[data-sort-control]');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.applyFilters();
      trackEvent('projects_sort', { sort_by: this.sortBy });
    });
  }

  /**
   * Setup reset button
   */
  setupResetButton() {
    const resetBtn = qs('[data-action="reset-filters"]');
    if (!resetBtn) return;

    resetBtn.addEventListener('click', () => {
      this.resetFilters();
      this.updateChipStates();

      // Clear search input
      const searchInput = qs('[data-filter="search"]');
      if (searchInput) searchInput.value = '';

      // Reset sort select
      const sortSelect = qs('[data-sort-control]');
      if (sortSelect) sortSelect.value = 'year-desc';

      trackEvent('projects_reset_filters');
    });
  }

  /**
   * Apply all filters and sorting
   */
  applyFilters() {
    // Build filter criteria
    const criteria = {};
    if (this.filters.search) criteria.search = this.filters.search;
    if (this.filters.platform) criteria.platform = this.filters.platform;
    if (this.filters.type) criteria.type = this.filters.type;
    if (this.filters.tech) criteria.tech = this.filters.tech;
    if (this.filters.year) criteria.year = this.filters.year;

    // Filter projects
    let filtered = filterProjects(criteria);

    // Sort projects
    filtered = sortProjects(filtered, this.sortBy);

    this.filteredProjects = filtered;

    // Update results count
    this.updateResultsCount(filtered.length);

    // Notify parent component
    if (this.onFilterChange) {
      this.onFilterChange(filtered);
    }
  }

  /**
   * Update results count display
   */
  updateResultsCount(count) {
    const countEl = qs('[data-results-count]');
    const pluralEl = qs('[data-results-plural]');

    if (countEl) countEl.textContent = count;
    if (pluralEl) pluralEl.textContent = count === 1 ? '' : 's';
  }

  /**
   * Reset all filters
   */
  resetFilters() {
    this.filters = {
      search: '',
      platform: null,
      type: null,
      tech: null,
      year: null
    };

    this.sortBy = 'year-desc';

    // Remove all active states
    qsa('.filter-chip').forEach(chip => {
      chip.classList.remove('filter-chip--active');
    });

    // Activate "All Projects" chip
    const allChip = qs('.filter-chip[data-filter-type="all"]');
    if (allChip) {
      allChip.classList.add('filter-chip--active');
    }

    this.applyFilters();
  }

  /**
   * Get currently filtered projects
   */
  getFilteredProjects() {
    return this.filteredProjects;
  }

  /**
   * Get active filter summary
   */
  getActivFilters() {
    const active = {};
    Object.entries(this.filters).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        active[key] = value;
      }
    });
    return active;
  }

  /**
   * Programmatically set a filter
   */
  setFilter(filterType, value) {
    if (this.filters.hasOwnProperty(filterType)) {
      this.filters[filterType] = value;
      this.applyFilters();
      this.updateChipStates();
    }
  }

  /**
   * Programmatically set sort
   */
  setSort(sortBy) {
    this.sortBy = sortBy;
    const sortSelect = qs('[data-sort-control]');
    if (sortSelect) sortSelect.value = sortBy;
    this.applyFilters();
  }
}
