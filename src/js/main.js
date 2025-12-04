/**
 * Main Entry Point
 * Initializes all modules and handles page lifecycle
 */

import { initNavigation } from './modules/navigation.js';
import { initTheme } from './modules/theme.js';
import { initModal } from './modules/modal.js';
import { initAnimations } from './modules/animations.js';
import { initAnalytics } from './modules/analytics.js';
import { initAnalyticsDebug } from './modules/analytics-debug.js';
import { initEasterEgg } from './modules/easter-egg.js';
import { initCharts } from './modules/charts.js';
import { initWebGL } from './modules/webgl.js';
import { initKeyboardShortcuts } from './modules/keyboard.js';
import { initFooter } from './modules/footer.js';
import { initExperienceTimeline } from './modules/experience-timeline.js';

/**
 * Initialize application
 */
function init() {
  // Initialize debug panel first (if enabled)
  initAnalyticsDebug();

  // Initialize core features immediately
  initTheme();
  initNavigation();
  initModal();
  initAnimations();
  initAnalytics();
  initEasterEgg();
  initKeyboardShortcuts();
  initRippleEffect();
  initFooter();
  initExperienceTimeline();

  // Lazy load heavy libraries
  lazyLoadLibraries();

  // Setup share functionality
  setupShare();

  // Register service worker (PWA)
  registerServiceWorker();
}

/**
 * Lazy load Three.js and Chart.js after page interactive
 */
function lazyLoadLibraries() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      initCharts().catch(err => {
        console.warn('Charts failed to load, hiding chart components:', err);
        hideChartComponents();
      });
      initWebGL().catch(err => {
        console.warn('WebGL failed to load, hiding background:', err);
        hideWebGLBackground();
      });
    });
  } else {
    setTimeout(() => {
      initCharts().catch(err => {
        console.warn('Charts failed to load, hiding chart components:', err);
        hideChartComponents();
      });
      initWebGL().catch(err => {
        console.warn('WebGL failed to load, hiding background:', err);
        hideWebGLBackground();
      });
    }, 1000);
  }
}

/**
 * Hide chart containers if Chart.js fails to load
 */
function hideChartComponents() {
  const chartContainers = document.querySelectorAll('.dashboard-card');
  chartContainers.forEach(card => {
    if (card.querySelector('canvas')) {
      card.style.display = 'none';
    }
  });

  // Also hide the radar chart container
  const radarContainer = document.querySelector('.skills-radar-container');
  if (radarContainer) {
    radarContainer.style.display = 'none';
  }
}

/**
 * Hide WebGL background if Three.js fails to load
 */
function hideWebGLBackground() {
  const webglBg = document.querySelector('[data-component="webgl-background"]');
  if (webglBg) {
    webglBg.style.display = 'none';
  }
}

/**
 * Setup share functionality
 */
function setupShare() {
  const shareBtn = document.querySelector('[data-action="share"]');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'Anil Thatha - Senior iOS/macOS Engineer',
      text: 'Check out this amazing resume!',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Share failed:', err);
    }
  });

  // Setup resume download toast
  setupResumeDownload();
}

/**
 * Setup resume download feedback
 */
function setupResumeDownload() {
  const resumeButtons = document.querySelectorAll('[data-action="download-resume"]');
  resumeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        showToast('✅ Resume downloaded! Thanks for your interest.');
      }, 500);
    });
  });
}

/**
 * Show toast notification
 */
function showToast(message, duration = 3000) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('toast--visible'), 100);

  // Remove after duration
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Initialize ripple effect on buttons
 */
function initRippleEffect() {
  document.querySelectorAll('.button, .fab, .social-btn, .project-card, .education-card').forEach(element => {
    element.addEventListener('click', createRipple);
  });
}

/**
 * Create ripple effect on click
 */
function createRipple(e) {
  const button = e.currentTarget;

  // Don't add ripple if disabled or link
  if (button.disabled) return;

  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');

  // Remove existing ripples
  const existingRipple = button.querySelector('.ripple');
  if (existingRipple) {
    existingRipple.remove();
  }

  button.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => ripple.remove(), 600);
}

/**
 * Register service worker for PWA support
 */
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      // Vite PWA plugin will handle this automatically
      const { registerSW } = await import('virtual:pwa-register');
      registerSW({
        onNeedRefresh() {
          if (confirm('New content available. Reload?')) {
            window.location.reload();
          }
        },
        onOfflineReady() {
          console.log('App ready to work offline');
        },
      });
    } catch (err) {
      console.log('PWA not configured or failed to register');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    console.log('Page visible again');
  }
});

// Global error handler
window.addEventListener('error', event => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled rejection:', event.reason);
});

// Export for debugging in development
if (process.env.NODE_ENV === 'development') {
  window.app = {
    version: '2.0.0',
    modules: {
      initNavigation,
      initTheme,
      initModal,
      initAnimations,
      initCharts,
      initWebGL,
    },
  };
}

// Enable Vite HMR
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    console.log('HMR: Main module updated');
    // Reinitialize core modules on HMR update
    initTheme();
    initNavigation();
  });

  // Accept updates to CSS
  import.meta.hot.accept(['../main.css'], () => {
    console.log('HMR: CSS updated');
  });

  // Accept updates to individual modules
  import.meta.hot.accept(['./modules/theme.js'], () => {
    console.log('HMR: Theme module updated');
    initTheme();
  });

  import.meta.hot.accept(['./modules/charts.js'], () => {
    console.log('HMR: Charts module updated, reloading charts');
    if (window.Chart) {
      initCharts().catch(err => console.warn('HMR: Chart reload failed', err));
    }
  });
}
