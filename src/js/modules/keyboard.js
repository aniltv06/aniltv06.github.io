/**
 * Keyboard Shortcuts Module
 * Handles global keyboard shortcuts for navigation and actions
 */

import { qs } from './utils.js';
import { trackEvent } from './analytics.js';

const SECTIONS = {
  '1': 'hero',
  '2': 'skills',
  '3': 'experience',
  '4': 'projects',
  '5': 'education',
};

export function initKeyboardShortcuts() {
  document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
  // Ignore if user is typing in an input field
  if (e.target.matches('input, textarea, [contenteditable]')) {
    return;
  }

  const key = e.key.toLowerCase();

  switch (key) {
  case 't':
    // Toggle theme with 'T' key
    e.preventDefault();
    const themeBtn = qs('[data-action="toggle-theme"]');
    if (themeBtn) {
      themeBtn.click();
      trackEvent('keyboard_shortcut', { key: 'T', action: 'toggle_theme' });
    }
    break;

  case '?':
    // Show keyboard shortcuts help with '?' key
    e.preventDefault();
    showKeyboardHelp();
    trackEvent('keyboard_shortcut', { key: '?', action: 'show_help' });
    break;

  case '1':
  case '2':
  case '3':
  case '4':
  case '5':
    // Jump to section with number keys
    e.preventDefault();
    const sectionId = SECTIONS[key];
    if (sectionId) {
      scrollToSection(sectionId);
      trackEvent('keyboard_shortcut', { key, action: 'jump_to_section', section: sectionId });
    }
    break;
  }
}

function scrollToSection(sectionId) {
  const section = qs(`#${sectionId}`);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

function showKeyboardHelp() {
  // Create help modal content
  const modal = qs('[data-component="modal"]');
  const modalBody = qs('[data-modal-body]', modal);

  if (!modal || !modalBody) return;

  const helpContent = `
    <h2 id="modal-title" class="modal__title">⌨️ Keyboard Shortcuts</h2>
    <p class="modal__subtitle">Navigate faster with these keyboard shortcuts</p>
    <div class="modal__text">
      <h3>Navigation</h3>
      <ul>
        <li><kbd>1</kbd> - Jump to Home section</li>
        <li><kbd>2</kbd> - Jump to Skills section</li>
        <li><kbd>3</kbd> - Jump to Experience section</li>
        <li><kbd>4</kbd> - Jump to Projects section</li>
        <li><kbd>5</kbd> - Jump to Education section</li>
      </ul>

      <h3>Actions</h3>
      <ul>
        <li><kbd>T</kbd> - Toggle theme (Light/Dark/Terminal)</li>
        <li><kbd>Esc</kbd> - Close modals or mobile menu</li>
      </ul>

      <h3>Help</h3>
      <ul>
        <li><kbd>?</kbd> - Show this keyboard shortcuts guide</li>
      </ul>

      <p style="margin-top: 20px; font-style: italic; color: var(--color-text-muted);">
        💡 Tip: Keyboard shortcuts work anywhere except when typing in text fields.
      </p>
    </div>
  `;

  modalBody.innerHTML = helpContent;
  modal.dataset.state = 'open';
  modal.classList.add('modal--active');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Focus close button
  setTimeout(() => {
    const closeBtn = qs('[data-action="close-modal"]', modal);
    if (closeBtn) closeBtn.focus();
  }, 100);
}
