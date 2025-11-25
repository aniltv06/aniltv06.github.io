/**
 * Projects Page - Main Entry Point
 * Initializes all modules for the projects page
 */

import { initProjectsPage } from './modules/projects.js';
import { initModal } from './modules/modal.js';
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initWebGL } from './modules/webgl.js';
import { initAnalytics } from './modules/analytics.js';
import { initFooter } from './modules/footer.js';
import { initEasterEgg } from './modules/easter-egg.js';
import { trackEvent } from './modules/analytics.js';

// Initialize analytics first
initAnalytics();

// Track page view
trackEvent('page_view', { page: 'projects' });

// Initialize all modules when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  try {
    // Core modules
    initTheme();
    initNavigation();
    initAnimations(); // This handles scroll progress
    initModal();
    initFooter();
    initEasterEgg();

    // Projects-specific module
    initProjectsPage();

    // Initialize WebGL background (lazy)
    setTimeout(() => {
      initWebGL();
    }, 100);

    // Track successful page load
    trackEvent('projects_page_loaded');
  } catch (error) {
    console.error('Error initializing projects page:', error);
    trackEvent('error', {
      type: 'initialization_error',
      message: error.message,
      page: 'projects'
    });
  }
}

// Enable Vite HMR
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    console.log('HMR: Projects module updated');
    // Reinitialize core modules on HMR update
    initTheme();
    initProjectsPage();
  });

  // Accept updates to CSS
  import.meta.hot.accept(['../projects.css'], () => {
    console.log('HMR: Projects CSS updated');
  });

  // Accept updates to individual modules
  import.meta.hot.accept(['./modules/projects.js'], () => {
    console.log('HMR: Projects module updated, reloading projects');
    initProjectsPage();
  });

  import.meta.hot.accept(['./modules/theme.js'], () => {
    console.log('HMR: Theme module updated');
    initTheme();
  });
}
