/**
 * Experience Timeline Module
 * Handles expand/collapse functionality and scroll-triggered animations
 */

import { qsa, announce } from './utils.js';
import { trackEvent } from './analytics.js';

/**
 * Calculate duration between two dates
 */
function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate === 'present' ? new Date() : new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}

/**
 * Format duration for display
 */
function formatDuration(years, months, format = 'long') {
  if (format === 'short') {
    // Short format for timeline dot: "3y 6m" or "2y"
    if (months === 0) {
      return `${years}y`;
    }
    return `${years}y ${months}m`;
  } else {
    // Compact format for duration badge: "4y 6mo" or "7y"
    if (years === 0 && months > 0) {
      return `${months}mo`;
    }

    if (months === 0) {
      return `${years}y`;
    }

    return `${years}y ${months}mo`;
  }
}

/**
 * Update durations for all experience items
 */
function updateDurations() {
  const experienceItems = qsa('.experience-timeline__item[data-start-date]');

  experienceItems.forEach(item => {
    const startDate = item.dataset.startDate;
    const endDate = item.dataset.endDate;

    if (!startDate || !endDate) return;

    const { years, months } = calculateDuration(startDate, endDate);

    // Update short duration (timeline dot)
    const shortDuration = item.querySelector('[data-duration-short]');
    if (shortDuration) {
      shortDuration.textContent = formatDuration(years, months, 'short');
    }

    // Update long duration (duration badge)
    const longDuration = item.querySelector('[data-duration-long]');
    if (longDuration) {
      longDuration.textContent = formatDuration(years, months, 'long');
    }
  });

  console.log('Experience durations calculated and updated');
}

/**
 * Initialize experience timeline
 */
export function initExperienceTimeline() {
  updateDurations();
  setupExpandCollapse();
  setupScrollAnimations();
  console.log('Experience Timeline initialized');
}

/**
 * Setup expand/collapse functionality
 */
function setupExpandCollapse() {
  const expandButtons = qsa('[data-action="toggle-section"]');

  expandButtons.forEach(button => {
    button.addEventListener('click', handleToggle);

    // Keyboard support
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle.call(button, e);
      }
    });
  });
}

/**
 * Handle toggle button click
 */
function handleToggle(e) {
  const button = e.currentTarget;
  const targetId = button.dataset.target;
  const section = document.getElementById(targetId);

  if (!section) return;

  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  const newState = !isExpanded;

  // Update button state
  button.setAttribute('aria-expanded', newState);
  section.dataset.expanded = newState;

  // Update icon rotation
  const icon = button.querySelector('.expand-btn__icon');
  if (icon) {
    icon.textContent = newState ? '▼' : '▶';
  }

  // Animate section
  if (newState) {
    // Expand
    section.style.display = 'block';

    // Calculate height
    const height = section.scrollHeight;
    section.style.height = '0px';
    section.style.opacity = '0';

    // Force reflow
    section.offsetHeight;

    // Animate
    section.style.height = height + 'px';
    section.style.opacity = '1';

    // Clean up after animation
    setTimeout(() => {
      section.style.height = 'auto';
    }, 400);

    // Announce to screen readers
    const count = section.querySelectorAll('.achievement-item, .project-card').length;
    const type = targetId.includes('achievements') ? 'achievements' : 'projects';
    announce(`Showing ${count} ${type}`);
  } else {
    // Collapse
    const height = section.scrollHeight;
    section.style.height = height + 'px';

    // Force reflow
    section.offsetHeight;

    // Animate
    section.style.height = '0px';
    section.style.opacity = '0';

    // Hide after animation
    setTimeout(() => {
      section.style.display = 'none';
      section.style.height = '';
      section.style.opacity = '';
    }, 400);

    // Announce to screen readers
    const type = targetId.includes('achievements') ? 'achievements' : 'projects';
    announce(`${type} section collapsed`);
  }

  // Track analytics
  trackEvent('experience_toggle', {
    section: targetId,
    expanded: newState
  });
}

/**
 * Setup scroll-triggered animations for timeline items
 */
function setupScrollAnimations() {
  const timelineItems = qsa('.experience-timeline__item');

  if (!timelineItems.length) return;

  // Intersection Observer options
  const options = {
    root: null,
    rootMargin: '-100px 0px',
    threshold: 0.1
  };

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class with slight delay for stagger effect
        const index = Array.from(timelineItems).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('fade-in--visible');

          // Announce to screen readers
          const company = entry.target.querySelector('.experience-timeline__company');
          if (company) {
            announce(`${company.textContent} experience visible`);
          }
        }, index * 100);

        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe all timeline items
  timelineItems.forEach(item => {
    observer.observe(item);
  });

  // Animate timeline progress line
  animateTimelineProgress();
}

/**
 * Animate timeline progress line based on scroll
 */
function animateTimelineProgress() {
  const timeline = document.querySelector('.experience-timeline');
  const progressLine = document.querySelector('[data-component="timeline-progress"]');

  if (!timeline || !progressLine) return;

  // Add scroll listener
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressLine();
        ticking = false;
      });
      ticking = true;
    }
  });

  function updateProgressLine() {
    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how much of the timeline is visible
    const timelineTop = timelineRect.top;
    const timelineHeight = timelineRect.height;

    // If timeline is below viewport
    if (timelineTop > windowHeight) {
      progressLine.style.transform = 'scaleY(0)';
      progressLine.style.transformOrigin = 'top';
      return;
    }

    // If timeline is above viewport
    if (timelineTop + timelineHeight < 0) {
      progressLine.style.transform = 'scaleY(1)';
      progressLine.style.transformOrigin = 'top';
      return;
    }

    // Calculate progress (0 to 1)
    const scrolled = Math.max(0, windowHeight - timelineTop);
    const totalScrollable = windowHeight + timelineHeight;
    const progress = Math.min(1, scrolled / totalScrollable);

    progressLine.style.transform = `scaleY(${progress})`;
    progressLine.style.transformOrigin = 'top';
    progressLine.style.transition = 'transform 0.1s ease-out';
  }

  // Initial update
  updateProgressLine();
}

/**
 * Expand all sections (utility function)
 */
export function expandAllSections() {
  const buttons = qsa('[data-action="toggle-section"][aria-expanded="false"]');
  buttons.forEach(button => {
    button.click();
  });
}

/**
 * Collapse all sections (utility function)
 */
export function collapseAllSections() {
  const buttons = qsa('[data-action="toggle-section"][aria-expanded="true"]');
  buttons.forEach(button => {
    button.click();
  });
}
