/**
 * Analytics Debug Panel
 * Real-time analytics event monitoring and debugging tool
 */

import { qs } from './utils.js';

let debugPanel = null;
let eventLog = [];
const MAX_EVENTS = 50;

/**
 * Initialize debug panel
 */
export function initAnalyticsDebug() {
  // Check if debug mode is enabled via URL parameter or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const debugEnabled = urlParams.has('debug') || localStorage.getItem('analytics_debug') === 'true';

  if (debugEnabled) {
    createDebugPanel();
    checkAnalyticsScripts();

    // Show welcome message
    logDebugEvent('DEBUG_PANEL', 'Analytics Debug Panel Activated', {
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });
  }

  // Keyboard shortcut: Ctrl+Shift+D or Cmd+Shift+D
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      toggleDebugPanel();
    }
  });
}

/**
 * Create debug panel UI
 */
function createDebugPanel() {
  if (debugPanel) return;

  debugPanel = document.createElement('div');
  debugPanel.className = 'analytics-debug-panel';
  debugPanel.innerHTML = `
    <div class="analytics-debug-panel__header">
      <div class="analytics-debug-panel__title">
        <span class="analytics-debug-panel__icon">📊</span>
        <span>Analytics Debug Panel</span>
      </div>
      <div class="analytics-debug-panel__status">
        <span class="analytics-debug-panel__status-item" data-status="gtag">
          <span class="analytics-debug-panel__status-label">GA:</span>
          <span class="analytics-debug-panel__status-value" data-status-target="gtag">...</span>
        </span>
        <span class="analytics-debug-panel__status-item" data-status="clarity">
          <span class="analytics-debug-panel__status-label">Clarity:</span>
          <span class="analytics-debug-panel__status-value" data-status-target="clarity">...</span>
        </span>
      </div>
      <div class="analytics-debug-panel__actions">
        <button class="analytics-debug-panel__btn" data-action="clear-log" title="Clear log">🗑️</button>
        <button class="analytics-debug-panel__btn" data-action="test-event" title="Send test event">🧪</button>
        <button class="analytics-debug-panel__btn" data-action="toggle-minimize" title="Minimize">−</button>
        <button class="analytics-debug-panel__btn" data-action="close-debug" title="Close">×</button>
      </div>
    </div>
    <div class="analytics-debug-panel__body">
      <div class="analytics-debug-panel__events" data-events-container>
        <div class="analytics-debug-panel__empty">
          <p>Waiting for events...</p>
          <p class="analytics-debug-panel__hint">Click around the page to generate events</p>
        </div>
      </div>
    </div>
    <div class="analytics-debug-panel__footer">
      <span class="analytics-debug-panel__info">Press <kbd>Ctrl+Shift+D</kbd> to toggle | Events: <span data-event-count>0</span></span>
    </div>
  `;

  document.body.appendChild(debugPanel);

  // Setup event listeners
  setupDebugPanelEvents();

  // Make draggable
  makeDebugPanelDraggable();
}

/**
 * Setup debug panel event listeners
 */
function setupDebugPanelEvents() {
  const panel = debugPanel;

  // Clear log
  panel.querySelector('[data-action="clear-log"]').addEventListener('click', () => {
    eventLog = [];
    updateEventLog();
  });

  // Test event
  panel.querySelector('[data-action="test-event"]').addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'debug_test_event', {
        test: true,
        timestamp: Date.now(),
        from: 'debug_panel',
      });
      logDebugEvent('TEST_EVENT', 'Manual test event sent', { success: true });
    } else {
      logDebugEvent('ERROR', 'gtag not available - cannot send test event', { error: true });
    }
  });

  // Toggle minimize
  panel.querySelector('[data-action="toggle-minimize"]').addEventListener('click', () => {
    panel.classList.toggle('analytics-debug-panel--minimized');
    const btn = panel.querySelector('[data-action="toggle-minimize"]');
    btn.textContent = panel.classList.contains('analytics-debug-panel--minimized') ? '+' : '−';
  });

  // Close debug panel
  panel.querySelector('[data-action="close-debug"]').addEventListener('click', () => {
    closeDebugPanel();
  });
}

/**
 * Make debug panel draggable
 */
function makeDebugPanelDraggable() {
  const header = debugPanel.querySelector('.analytics-debug-panel__header');
  let isDragging = false;
  let currentX, currentY, initialX, initialY;

  header.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return; // Don't drag when clicking buttons

    isDragging = true;
    initialX = e.clientX - debugPanel.offsetLeft;
    initialY = e.clientY - debugPanel.offsetTop;
    header.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    debugPanel.style.left = currentX + 'px';
    debugPanel.style.top = currentY + 'px';
    debugPanel.style.right = 'auto';
    debugPanel.style.bottom = 'auto';
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      header.style.cursor = 'grab';
    }
  });
}

/**
 * Check if analytics scripts are loaded
 */
function checkAnalyticsScripts() {
  const gtagStatus = typeof gtag !== 'undefined';
  const clarityStatus = typeof clarity !== 'undefined';

  updateScriptStatus('gtag', gtagStatus);
  updateScriptStatus('clarity', clarityStatus);

  // Log initial status
  logDebugEvent('SCRIPT_CHECK', 'Analytics scripts status', {
    gtag: gtagStatus ? 'Loaded ✓' : 'Not loaded ✗',
    clarity: clarityStatus ? 'Loaded ✓' : 'Not loaded ✗',
    userAgent: navigator.userAgent,
    hostname: window.location.hostname,
  });

  // Check again after 2 seconds (scripts might still be loading)
  setTimeout(() => {
    const gtagStatusDelayed = typeof gtag !== 'undefined';
    const clarityStatusDelayed = typeof clarity !== 'undefined';

    if (gtagStatusDelayed !== gtagStatus || clarityStatusDelayed !== clarityStatus) {
      updateScriptStatus('gtag', gtagStatusDelayed);
      updateScriptStatus('clarity', clarityStatusDelayed);
      logDebugEvent('SCRIPT_CHECK', 'Scripts loaded after delay', {
        gtag: gtagStatusDelayed ? 'Loaded ✓' : 'Not loaded ✗',
        clarity: clarityStatusDelayed ? 'Loaded ✓' : 'Not loaded ✗',
      });
    }
  }, 2000);
}

/**
 * Update script status indicator
 */
function updateScriptStatus(script, loaded) {
  if (!debugPanel) return;

  const statusElement = debugPanel.querySelector(`[data-status-target="${script}"]`);
  if (statusElement) {
    statusElement.textContent = loaded ? '✓' : '✗';
    statusElement.style.color = loaded ? '#10b981' : '#ef4444';
  }
}

/**
 * Log debug event
 */
export function logDebugEvent(eventType, eventName, parameters = {}) {
  if (!debugPanel) return;

  const event = {
    type: eventType,
    name: eventName,
    parameters,
    timestamp: new Date().toISOString(),
    time: new Date().toLocaleTimeString(),
  };

  eventLog.unshift(event); // Add to beginning

  // Limit log size
  if (eventLog.length > MAX_EVENTS) {
    eventLog = eventLog.slice(0, MAX_EVENTS);
  }

  updateEventLog();
}

/**
 * Update event log display
 */
function updateEventLog() {
  if (!debugPanel) return;

  const container = debugPanel.querySelector('[data-events-container]');
  const countElement = debugPanel.querySelector('[data-event-count]');

  if (eventLog.length === 0) {
    container.innerHTML = `
      <div class="analytics-debug-panel__empty">
        <p>No events logged yet</p>
        <p class="analytics-debug-panel__hint">Click around the page to generate events</p>
      </div>
    `;
    countElement.textContent = '0';
    return;
  }

  countElement.textContent = eventLog.length;

  container.innerHTML = eventLog.map((event, index) => {
    const typeClass = event.type.toLowerCase().replace('_', '-');
    const hasParams = Object.keys(event.parameters).length > 0;

    return `
      <div class="analytics-debug-event analytics-debug-event--${typeClass}" data-event-index="${index}">
        <div class="analytics-debug-event__header">
          <span class="analytics-debug-event__type">${event.type}</span>
          <span class="analytics-debug-event__name">${event.name}</span>
          <span class="analytics-debug-event__time">${event.time}</span>
        </div>
        ${hasParams ? `
          <div class="analytics-debug-event__params">
            <pre>${JSON.stringify(event.parameters, null, 2)}</pre>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

/**
 * Toggle debug panel visibility
 */
function toggleDebugPanel() {
  const isEnabled = localStorage.getItem('analytics_debug') === 'true';

  if (isEnabled) {
    closeDebugPanel();
  } else {
    localStorage.setItem('analytics_debug', 'true');
    window.location.reload(); // Reload to initialize properly
  }
}

/**
 * Close debug panel
 */
function closeDebugPanel() {
  localStorage.removeItem('analytics_debug');
  if (debugPanel) {
    debugPanel.remove();
    debugPanel = null;
  }

  // Show toast notification
  const toast = document.createElement('div');
  toast.className = 'toast toast--visible';
  toast.textContent = '📊 Analytics Debug Panel closed. Press Ctrl+Shift+D to reopen.';
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Export for use in analytics module
 */
export function isDebugEnabled() {
  return debugPanel !== null;
}
