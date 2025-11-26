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
    this.updateFilterCounts(); // Initial count update

    // Load state from URL
    this.loadStateFromURL();

    // Setup popstate for back/forward navigation
    window.addEventListener('popstate', () => {
      this.loadStateFromURL();
    });
  }

  /**
   * Setup search input with debouncing
   */
  setupSearchInput() {
    const searchInput = qs('[data-filter="search"]');
    const clearButton = qs('[data-action="clear-search"]');

    if (!searchInput) return;

    // Toggle clear button visibility
    const toggleClearButton = () => {
      if (clearButton) {
        if (searchInput.value.trim()) {
          clearButton.style.display = 'flex';
          clearButton.classList.add('projects-search__clear--visible');
        } else {
          clearButton.style.display = 'none';
          clearButton.classList.remove('projects-search__clear--visible');
        }
      }
    };

    // Handle input
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      toggleClearButton();

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.filters.search = e.target.value.trim();
        this.applyFilters();
        trackEvent('projects_search', { query: this.filters.search });
      }, 300); // 300ms debounce
    });

    // Handle clear button click
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        searchInput.value = '';
        this.filters.search = '';
        toggleClearButton();
        this.applyFilters();
        searchInput.focus();
        trackEvent('projects_clear_search');
      });
    }

    // Initial state
    toggleClearButton();
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
    const resetContainer = qs('[data-component="reset-filters-container"]');

    if (!allChip) return;

    const hasActiveFilters = Object.values(this.filters).some(v => v !== null && v !== '');

    if (hasActiveFilters) {
      allChip.classList.remove('filter-chip--active');
      // Show reset button
      if (resetContainer) resetContainer.style.display = 'flex';
    } else {
      allChip.classList.add('filter-chip--active');
      // Hide reset button
      if (resetContainer) resetContainer.style.display = 'none';
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

    // Save state to URL
    this.saveStateToURL();

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

  /**
   * Update filter count badges
   */
  updateFilterCounts() {
    const chips = qsa('.filter-chip[data-filter-value]');

    chips.forEach(chip => {
      const filterType = chip.dataset.filterType;
      const filterValue = chip.dataset.filterValue;

      // Count projects matching this filter
      const matchingProjects = this.allProjects.filter(project => {
        if (filterType === 'platform') {
          return project.categories.platform.includes(filterValue);
        } else if (filterType === 'type') {
          return project.categories.type.includes(filterValue);
        } else if (filterType === 'tech') {
          return project.categories.tech.includes(filterValue);
        } else if (filterType === 'year') {
          return project.year === parseInt(filterValue);
        }
        return false;
      });

      const count = matchingProjects.length;

      // Remove existing count badge if any
      const existingBadge = chip.querySelector('.filter-chip__count');
      if (existingBadge) {
        existingBadge.remove();
      }

      // Add new count badge
      if (count > 0) {
        const badge = document.createElement('span');
        badge.className = 'filter-chip__count';
        badge.textContent = count;
        chip.appendChild(badge);
      }
    });

    // Update "All Projects" chip count
    const allChip = qs('.filter-chip[data-filter-type="all"]');
    if (allChip) {
      const existingBadge = allChip.querySelector('.filter-chip__count');
      if (existingBadge) {
        existingBadge.remove();
      }

      const badge = document.createElement('span');
      badge.className = 'filter-chip__count';
      badge.textContent = this.allProjects.length;
      allChip.appendChild(badge);
    }
  }

  /**
   * Save current filter state to URL
   */
  saveStateToURL() {
    const params = new URLSearchParams();

    // Add filters to URL
    if (this.filters.search) params.set('search', this.filters.search);
    if (this.filters.platform) params.set('platform', this.filters.platform);
    if (this.filters.type) params.set('type', this.filters.type);
    if (this.filters.tech) params.set('tech', this.filters.tech);
    if (this.filters.year) params.set('year', this.filters.year);

    // Add sort
    if (this.sortBy !== 'year-desc') params.set('sort', this.sortBy);

    // Update URL without reloading page
    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.pushState({}, '', newURL);
  }

  /**
   * Load filter state from URL
   */
  loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);

    // Load filters from URL
    const search = params.get('search') || '';
    const platform = params.get('platform');
    const type = params.get('type');
    const tech = params.get('tech');
    const year = params.get('year');
    const sort = params.get('sort') || 'year-desc';

    // Update search input
    const searchInput = qs('[data-filter="search"]');
    if (searchInput && search) {
      searchInput.value = search;
    }

    // Update sort dropdown
    const sortSelect = qs('[data-sort-control]');
    if (sortSelect) {
      sortSelect.value = sort;
    }

    // Update filter chips
    qsa('.filter-chip').forEach(chip => {
      chip.classList.remove('filter-chip--active');
    });

    // Activate chips based on URL params
    if (platform) {
      const chip = qs(`.filter-chip[data-filter-type="platform"][data-filter-value="${platform}"]`);
      if (chip) chip.classList.add('filter-chip--active');
    }

    if (type) {
      const chip = qs(`.filter-chip[data-filter-type="type"][data-filter-value="${type}"]`);
      if (chip) chip.classList.add('filter-chip--active');
    }

    if (tech) {
      const chip = qs(`.filter-chip[data-filter-type="tech"][data-filter-value="${tech}"]`);
      if (chip) chip.classList.add('filter-chip--active');
    }

    // Update internal state
    this.filters.search = search;
    this.filters.platform = platform;
    this.filters.type = type;
    this.filters.tech = tech;
    this.filters.year = year ? parseInt(year) : null;
    this.sortBy = sort;

    // Apply filters without saving to URL (to avoid loop)
    this.applyFiltersWithoutURL();

    // Update chip states
    this.updateChipStates();
  }

  /**
   * Apply filters without saving to URL (used by loadStateFromURL)
   */
  applyFiltersWithoutURL() {
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
}
