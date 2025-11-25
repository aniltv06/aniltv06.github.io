/**
 * Theme Module
 * Handles theme switching (light/dark/terminal)
 */

import { qs, qsa, getTheme, setTheme, announce } from './utils.js';
import { trackEvent } from './analytics.js';
import { THEMES, THEME_ICONS, THEME_LABELS } from '../config/constants.js';

const THEME_ORDER = [THEMES.LIGHT, THEMES.DARK, THEMES.TERMINAL];

export function initTheme() {
  const savedTheme = getTheme();
  applyTheme(savedTheme);

  qsa('[data-action="toggle-theme"]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Sync theme across tabs
  initThemeSync();
}

/**
 * Sync theme changes across browser tabs
 */
function initThemeSync() {
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme' && e.newValue && e.newValue !== document.body.dataset.theme) {
      applyTheme(e.newValue);
      announce(`Theme synced to ${e.newValue} mode from another tab`);
    }
  });
}

export function toggleTheme() {
  const currentTheme = document.body.dataset.theme || THEMES.LIGHT;
  const currentIndex = THEME_ORDER.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
  const nextTheme = THEME_ORDER[nextIndex];

  applyTheme(nextTheme);
  setTheme(nextTheme);
  updateThemeButtons(nextTheme);

  trackEvent('theme_change', {
    from_theme: currentTheme,
    to_theme: nextTheme,
  });

  announce(`Theme changed to ${nextTheme} mode`);
}

function applyTheme(theme) {
  // Remove all theme classes
  document.body.classList.remove('theme--dark', 'theme--terminal');

  // Add new theme class if not light
  if (theme !== THEMES.LIGHT) {
    document.body.classList.add(`theme--${theme}`);
  }

  // Set data attribute for reference
  document.body.dataset.theme = theme;

  // Save to localStorage
  setTheme(theme);

  // Update button labels
  updateThemeButtons(theme);
}

function updateThemeButtons(currentTheme) {
  const currentIndex = THEME_ORDER.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
  const nextTheme = THEME_ORDER[nextIndex];

  qsa('[data-action="toggle-theme"]').forEach(btn => {
    const icon = btn.querySelector('[data-theme-icon]');
    const text = btn.querySelector('[data-theme-text]');

    // Update icon to show next theme
    if (icon) icon.textContent = THEME_ICONS[nextTheme];

    // Hide text, use tooltip only (icon-only button)
    if (text) text.style.display = 'none';

    // Clear aria-label with current theme + next action
    const themeNames = {
      light: 'Light',
      dark: 'Dark',
      terminal: 'Terminal'
    };
    btn.setAttribute('aria-label', `Current theme: ${themeNames[currentTheme]}. Click to switch to ${themeNames[nextTheme]} mode`);
    btn.setAttribute('title', `Switch to ${themeNames[nextTheme]} mode`);
  });
}
