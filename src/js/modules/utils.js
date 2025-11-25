/**
 * Utility Functions
 */

/**
 * Safely query selector
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Safely query selector all
 */
export function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * Add event listener to elements
 */
export function on(selector, event, handler, options = {}) {
  const elements = typeof selector === 'string' ? qsa(selector) : [selector];
  elements.forEach(el => el && el.addEventListener(event, handler, options));
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Load external script
 */
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn(`Failed to load: ${src}`);
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Get current theme
 */
export function getTheme() {
  return localStorage.getItem('theme') || 'light';
}

/**
 * Set theme
 */
export function setTheme(theme) {
  localStorage.setItem('theme', theme);

  // Remove all theme classes
  document.body.classList.remove('theme--dark', 'theme--terminal');

  // Add new theme class if not light
  if (theme !== 'light') {
    document.body.classList.add(`theme--${theme}`);
  }

  // Set data attribute for reference
  document.body.dataset.theme = theme;
}

/**
 * Announce to screen readers
 */
export function announce(message) {
  const announcer = qs('[role="status"]') || createAnnouncer();
  announcer.textContent = message;
}

function createAnnouncer() {
  const div = document.createElement('div');
  div.setAttribute('role', 'status');
  div.setAttribute('aria-live', 'polite');
  div.setAttribute('aria-atomic', 'true');
  div.className = 'visually-hidden';
  document.body.appendChild(div);
  return div;
}

/**
 * Trap focus within element
 */
export function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  const handleTab = e => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  };

  element.addEventListener('keydown', handleTab);
  return () => element.removeEventListener('keydown', handleTab);
}
