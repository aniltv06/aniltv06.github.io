/**
 * Analytics Module
 * Wrapper for Google Analytics and Microsoft Clarity
 */

import { logDebugEvent, isDebugEnabled } from './analytics-debug.js';

/**
 * Track custom event
 */
export function trackEvent(eventName, parameters = {}) {
  // Log to debug panel if active
  if (isDebugEnabled()) {
    logDebugEvent('EVENT', eventName, parameters);
  }

  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
    if (isDebugEnabled()) {
      logDebugEvent('GA_SENT', `gtag('event', '${eventName}')`, { sent: true });
    }
  } else if (isDebugEnabled()) {
    logDebugEvent('GA_ERROR', `gtag not available for event: ${eventName}`, { error: true });
  }

  // Microsoft Clarity custom tags
  if (typeof clarity !== 'undefined') {
    clarity('set', eventName, JSON.stringify(parameters));
    if (isDebugEnabled()) {
      logDebugEvent('CLARITY_SENT', `clarity('set', '${eventName}')`, { sent: true });
    }
  } else if (isDebugEnabled()) {
    logDebugEvent('CLARITY_ERROR', `clarity not available for event: ${eventName}`, { error: true });
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
  if (isDebugEnabled()) {
    logDebugEvent('PAGE_VIEW', `Page view: ${pagePath}`, { page_path: pagePath });
  }

  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-9SZZWKV48B', {
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
  if (isDebugEnabled()) {
    logDebugEvent('INIT', 'Analytics module initialized', {
      hostname: window.location.hostname,
      pathname: window.location.pathname,
    });
  }

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

        if (isDebugEnabled()) {
          logDebugEvent('PERFORMANCE', 'Page load metrics', {
            pageLoadTime: `${pageLoadTime}ms`,
            connectTime: `${connectTime}ms`,
            renderTime: `${renderTime}ms`,
          });
        }
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
  console.log('%c📊 Debug Analytics? Add ?debug to URL or press Ctrl+Shift+D', 'color: #8b5cf6; font-size: 12px; font-weight: bold;');
}
