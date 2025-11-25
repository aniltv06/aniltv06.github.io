/**
 * Footer Module
 * Renders consistent footer across all pages
 *
 * Note: Easter egg functionality is handled by easter-egg.js module
 * which is initialized in the main entry points (main.js, projects-main.js)
 */

import { trackEvent } from './analytics.js';
import { qs } from './utils.js';

/**
 * Initialize footer with consistent content and interactions
 */
export function initFooter() {
  const footer = qs('[data-component="footer"]');
  if (!footer) {
    console.warn('Footer component not found');
    return;
  }

  // Setup footer-specific analytics
  // Easter egg hint is handled by easter-egg.js module
  setupFooterAnalytics();
}

/**
 * Setup analytics tracking for footer links
 */
function setupFooterAnalytics() {
  document.querySelectorAll('.footer__link[data-analytics]').forEach(link => {
    link.addEventListener('click', (e) => {
      const analyticsId = e.currentTarget.dataset.analytics;
      trackEvent('footer_link_click', { link: analyticsId });
    });
  });
}

/**
 * Generate footer HTML (for programmatic insertion if needed)
 */
export function getFooterHTML() {
  return `
    <footer class="footer" role="contentinfo" data-component="footer">
      <div class="footer__content">
        <p class="footer__text">Thanks for taking the time to check out my resume!</p>
        <p class="footer__text">I'm always excited to connect with fellow engineers and explore new opportunities.</p>

        <div class="footer__easter-egg-hint" data-action="easter-egg-hint" data-testid="easter-egg-hint" tabindex="0" role="button">
          <span class="footer__hint-icon">🎮</span>
          <span>Gamers & curious minds: Try the classic code... or tap me 7 times!</span>
        </div>

        <div class="footer__links">
          <a href="mailto:aniltv06@gmail.com" class="footer__link" data-analytics="email-footer">Email</a>
          <a href="https://www.linkedin.com/in/anilthatha/" target="_blank" rel="noopener noreferrer" class="footer__link" data-analytics="linkedin">LinkedIn</a>
          <a href="https://github.com/aniltv06" target="_blank" rel="noopener noreferrer" class="footer__link" data-analytics="github">GitHub</a>
          <a href="/Anil_Thatha-Resume.pdf" download class="footer__link" data-analytics="download-footer">Download PDF</a>
        </div>

        <p class="footer__copyright">© Anil Kumar Thatha Venkatachalapathy · Engineered with the same precision I bring to every project</p>
      </div>
    </footer>
  `;
}
