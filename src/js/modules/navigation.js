/**
 * Navigation Module
 * Handles smooth scrolling, mobile menu, scroll progress, and back-to-top
 */

import { qs, qsa, on, throttle } from './utils.js';
import { trackEvent } from './analytics.js';
import { SCROLL_OFFSET } from '../config/constants.js';

export function initNavigation() {
  setupSmoothScroll();
  setupMobileMenu();
  setupScrollProgress();
  setupBackToTop();
  setupActiveSection();
}

/**
 * Smooth scrolling for anchor links
 */
function setupSmoothScroll() {
  on('[data-scroll-target]', 'click', handleSmoothScroll);
}

function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.dataset.scrollTarget;
  const target = qs(`#${targetId}`);

  if (target) {
    const offsetTop = target.offsetTop - SCROLL_OFFSET;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });

    // Close mobile menu if open
    closeMobileMenu();

    // Track navigation
    trackEvent('navigation_click', {
      section: targetId,
      from: 'navigation',
    });
  }
}

/**
 * Mobile menu toggle
 */
function setupMobileMenu() {
  const hamburger = qs('[data-action="toggle-mobile-menu"]');
  const menu = qs('[data-component="mobile-nav"]');
  const overlay = qs('[data-component="mobile-overlay"]');

  if (!hamburger || !menu || !overlay) return;

  hamburger.addEventListener('click', toggleMobileMenu);
  overlay.addEventListener('click', closeMobileMenu);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.dataset.state === 'open') {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const hamburger = qs('[data-action="toggle-mobile-menu"]');
  const menu = qs('[data-component="mobile-nav"]');
  const overlay = qs('[data-component="mobile-overlay"]');

  const isOpen = menu.dataset.state === 'open';

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }

  trackEvent('mobile_menu_toggle', { action: isOpen ? 'close' : 'open' });
}

function openMobileMenu() {
  const hamburger = qs('[data-action="toggle-mobile-menu"]');
  const menu = qs('[data-component="mobile-nav"]');
  const overlay = qs('[data-component="mobile-overlay"]');

  menu.dataset.state = 'open';
  overlay.dataset.state = 'open';
  hamburger.classList.add('hamburger--active');
  hamburger.setAttribute('aria-expanded', 'true');
  overlay.classList.add('mobile-nav__overlay--active');
  menu.classList.add('mobile-nav__menu--active');

  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const hamburger = qs('[data-action="toggle-mobile-menu"]');
  const menu = qs('[data-component="mobile-nav"]');
  const overlay = qs('[data-component="mobile-overlay"]');

  if (!menu) return;

  menu.dataset.state = 'closed';
  overlay.dataset.state = 'closed';
  hamburger.classList.remove('hamburger--active');
  hamburger.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('mobile-nav__overlay--active');
  menu.classList.remove('mobile-nav__menu--active');

  document.body.style.overflow = '';
}

/**
 * Scroll progress indicator
 */
function setupScrollProgress() {
  const progressBar = qs('[data-component="scroll-progress"]');
  if (!progressBar) return;

  const updateProgress = throttle(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const progress = (scrollTop / (documentHeight - windowHeight)) * 100;

    progressBar.style.width = `${Math.min(progress, 100)}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(progress));
  }, 50);

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * Back to top button with progressive fade-in
 */
function setupBackToTop() {
  const backToTop = qs('[data-action="back-to-top"]');
  if (!backToTop) return;

  const toggleVisibility = throttle(() => {
    const scrolled = window.pageYOffset;

    // Progressive opacity based on scroll distance
    if (scrolled < 100) {
      // Hidden below 100px
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
      backToTop.classList.remove('fab--visible');
      backToTop.classList.add('fab--hidden');
    } else if (scrolled < 300) {
      // Fade in progressively between 100-300px
      const opacity = (scrolled - 100) / 200; // 0 to 1
      backToTop.style.opacity = opacity;
      backToTop.style.pointerEvents = 'auto';
      backToTop.classList.add('fab--visible');
      backToTop.classList.remove('fab--hidden');
    } else {
      // Fully visible after 300px
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
      backToTop.classList.add('fab--visible');
      backToTop.classList.remove('fab--hidden');
    }
  }, 50);

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    trackEvent('back_to_top_click');
  });

  toggleVisibility();
}

/**
 * Highlight active section in navigation
 */
function setupActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = qsa('.nav__link[data-scroll-target]');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          // Remove active class from all nav links
          navLinks.forEach(link => link.classList.remove('nav__link--active'));

          // Add active class to current section's nav link
          const activeLink = qs(`.nav__link[data-scroll-target="${id}"]`);
          if (activeLink) {
            activeLink.classList.add('nav__link--active');
          }
        }
      });
    },
    {
      threshold: [0, 0.15, 0.5],
      rootMargin: '-10% 0px -60% 0px',
    }
  );

  sections.forEach(section => observer.observe(section));
}
