/**
 * Analytics Module
 * Wrapper for Google Analytics and Microsoft Clarity
 */

/**
 * Track custom event
 */
export function trackEvent(eventName, parameters = {}) {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }

  // Microsoft Clarity custom tags
  if (typeof clarity !== 'undefined') {
    clarity('set', eventName, JSON.stringify(parameters));
  }

  // Console log in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`📊 Analytics Event: ${eventName}`, parameters);
  }
}

/**
 * Track page view
 */
export function trackPageView(pagePath) {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-7KHN3J4KPP', {
      page_path: pagePath,
    });
  }
}

/**
 * Track timing
 */
export function trackTiming(category, variable, value) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'timing_complete', {
      name: variable,
      value: value,
      event_category: category,
    });
  }
}

/**
 * Initialize analytics
 */
export function initAnalytics() {
  // Track page load time
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        trackTiming('Page Load', 'load_time', pageLoadTime);
        trackTiming('Page Load', 'connect_time', connectTime);
        trackTiming('Page Load', 'render_time', renderTime);
      }, 0);
    });
  }

  // Track console viewing (for easter egg hints)
  setTimeout(() => {
    trackEvent('page_loaded', {
      user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
    });
  }, 1000);

  console.log('%c👋 Hey there, curious developer!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
  console.log('%c🎮 Looking for something fun?', 'color: #60a5fa; font-size: 16px; font-weight: bold;');
  console.log('%cTry: ↑↑↓↓←→←→BA', 'color: #10b981; font-size: 14px;');
  console.log('%c📱 On mobile? Tap the 🎮 hint 7 times!', 'color: #f59e0b; font-size: 12px;');
}
