/**
 * Animations Module
 * Handles scroll animations, typing effect, and count-up animations
 */

import { qs, qsa } from './utils.js';
import { TYPING_TEXTS, TYPING_SPEED, TYPING_DELETE_SPEED, TYPING_PAUSE, ANIMATION_THRESHOLD } from '../config/constants.js';

let typingTextIndex = 0;
let typingCharIndex = 0;
let isDeleting = false;

export function initAnimations() {
  setupScrollAnimations();
  setupTypingAnimation();
  setupCountUpAnimations();
  setupSkillsToggle();
}

/**
 * Scroll animations using Intersection Observer
 */
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible');
          entry.target.classList.add('timeline-item--visible');
        }
      });
    },
    {
      threshold: ANIMATION_THRESHOLD,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  qsa('.fade-in, .timeline-item').forEach(el => observer.observe(el));
}

/**
 * Typing animation effect
 */
function setupTypingAnimation() {
  const typingElement = qs('[data-component="typing-animation"]');
  if (!typingElement) return;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show static text immediately for users who prefer reduced motion
    typingElement.textContent = TYPING_TEXTS[0];
    return;
  }

  // Normal typing animation for other users
  function type() {
    const currentText = TYPING_TEXTS[typingTextIndex];
    const displayText = isDeleting
      ? currentText.substring(0, typingCharIndex - 1)
      : currentText.substring(0, typingCharIndex + 1);

    typingElement.innerHTML = displayText + '<span class="hero__typing-cursor" aria-hidden="true"></span>';

    let typeSpeed = isDeleting ? TYPING_DELETE_SPEED : TYPING_SPEED;

    if (!isDeleting && typingCharIndex === currentText.length) {
      typeSpeed = TYPING_PAUSE;
      isDeleting = true;
    } else if (isDeleting && typingCharIndex === 0) {
      isDeleting = false;
      typingTextIndex = (typingTextIndex + 1) % TYPING_TEXTS.length;
      typeSpeed = 500;
    }

    typingCharIndex += isDeleting ? -1 : 1;

    setTimeout(type, typeSpeed);
  }

  type();
}

/**
 * Count-up animations for stat cards
 */
function setupCountUpAnimations() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.dataset.countUp) || 0;
          animateCount(element, target);
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );

  qsa('[data-count-up]').forEach(el => observer.observe(el));
}

function animateCount(element, target) {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    const suffix = element.textContent.includes('+') ? '+' : '';
    const prefix = element.textContent.includes('K') ? 'K' : '';
    element.textContent = Math.floor(current) + prefix + suffix;
  }, 16);
}

/**
 * Setup skills toggle for additional skills
 */
function setupSkillsToggle() {
  const toggleBtn = qs('[data-action="toggle-additional-skills"]');
  const additionalSkills = qs('#additional-skills');

  if (!toggleBtn || !additionalSkills) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;

    // Update ARIA state
    toggleBtn.setAttribute('aria-expanded', newState);
    additionalSkills.dataset.expanded = newState;

    if (newState) {
      // Expand
      additionalSkills.style.display = 'grid';
      toggleBtn.querySelector('.skills-toggle-btn__text').textContent = 'Show Fewer Skills';

      // Scroll into view smoothly
      setTimeout(() => {
        additionalSkills.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } else {
      // Collapse
      additionalSkills.style.display = 'none';
      toggleBtn.querySelector('.skills-toggle-btn__text').textContent = 'View 3 More Skill Areas';

      // Scroll back to toggle button
      toggleBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}
