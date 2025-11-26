/**
 * Easter Egg Module
 * Konami Code and tap easter egg
 */

import { qs } from './utils.js';
import { trackEvent } from './analytics.js';
import { KONAMI_CODE, EASTER_EGG_TAPS } from '../config/constants.js';

let konamiCodePosition = 0;
let tapCount = 0;
let tapTimer = null;

export function initEasterEgg() {
  setupKonamiCode();
  setupTapEasterEgg();
}

function setupKonamiCode() {
  document.addEventListener('keydown', e => {
    const key = e.key;

    if (key === KONAMI_CODE[konamiCodePosition]) {
      konamiCodePosition++;

      if (konamiCodePosition === KONAMI_CODE.length) {
        activateEasterEgg('konami_code');
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  });
}

function setupTapEasterEgg() {
  const hint = qs('[data-action="easter-egg-hint"]');
  if (!hint) return;

  hint.addEventListener('click', () => {
    tapCount++;

    clearTimeout(tapTimer);

    if (tapCount >= EASTER_EGG_TAPS) {
      activateEasterEgg('tap_hint');
      tapCount = 0;
    } else {
      tapTimer = setTimeout(() => {
        tapCount = 0;
      }, 2000);
    }
  });
}

function activateEasterEgg(method) {
  trackEvent('easter_egg_activated', { method });

  // Show custom modal with celebration
  showEasterEggModal(method);

  // Add rainbow effect to body
  document.body.style.animation = 'rainbow 5s ease-in-out';

  // Create confetti effect
  createConfetti();

  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
}

function showEasterEggModal(method) {
  const modal = qs('[data-component="modal"]');
  const modalBody = qs('[data-modal-body]', modal);

  if (!modal || !modalBody) return;

  const methodText = method === 'konami_code'
    ? 'the legendary Konami Code'
    : '7 secret taps';

  const content = `
    <div class="easter-egg-content" style="text-align: center; padding: 20px;">
      <div class="easter-egg-celebration" style="font-size: 80px; animation: bounce 0.5s ease-in-out 3;">
        🎉🎮🏆
      </div>

      <h2 class="modal__title" style="font-size: 36px; margin: 20px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        🎊 CONGRATULATIONS! 🎊
      </h2>

      <p class="modal__subtitle" style="font-size: 20px; color: var(--color-success); font-weight: 600; margin-bottom: 30px;">
        You discovered the secret with ${methodText}!
      </p>

      <div class="easter-egg-message" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); border: 2px solid var(--color-primary); border-radius: 15px; padding: 30px; margin: 20px 0; box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);">
        <p style="font-size: 18px; line-height: 1.8; margin-bottom: 15px;">
          🔍 <strong>You're clearly someone who pays attention to details.</strong>
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin-bottom: 15px;">
          That's exactly the kind of <span style="color: var(--color-primary); font-weight: 600;">curiosity and thoroughness</span>
          I bring to my engineering work.
        </p>
        <p style="font-size: 16px; line-height: 1.8;">
          Finding this easter egg shows you have the mindset I value:
          <span style="color: var(--color-success); font-weight: 600;">exploration, persistence, and attention to detail.</span>
        </p>
      </div>

      <div style="margin: 30px 0; padding: 20px; background: rgba(37, 99, 235, 0.05); border-radius: 10px;">
        <p style="font-size: 18px; font-weight: 600; margin-bottom: 10px; color: var(--color-primary);">
          💬 Let's Connect!
        </p>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
          Want to chat about iOS/macOS development, AI/ML integration,<br>
          or just share your favorite easter eggs?
        </p>
        <a href="mailto:aniltv06@gmail.com" style="display: inline-block; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 600; font-size: 16px; margin-top: 10px; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4); transition: transform 0.3s ease;">
          📧 aniltv06@gmail.com
        </a>
      </div>

      <div class="easter-egg-achievement" style="margin-top: 30px; font-size: 14px; color: var(--color-text-muted); font-style: italic;">
        <p>🎮 Achievement Unlocked: Code Breaker</p>
        <p style="margin-top: 5px;">Welcome to the secret developer club! 💻</p>
      </div>
    </div>
  `;

  modalBody.innerHTML = content;
  modal.dataset.state = 'open';
  modal.classList.add('modal--active', 'modal--easter-egg');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Add special easter egg styling
  const modalContent = modal.querySelector('.modal__content');
  if (modalContent) {
    modalContent.style.animation = 'modalBounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    modalContent.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(102, 126, 234, 0.1))';
    modalContent.style.border = '3px solid var(--color-primary)';
    modalContent.style.boxShadow = '0 20px 80px rgba(102, 126, 234, 0.4)';
  }

  // Focus close button after animation
  setTimeout(() => {
    const closeBtn = qs('[data-action="close-modal"]', modal);
    if (closeBtn) closeBtn.focus();
  }, 100);
}

function createConfetti() {
  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }, i * 30);
  }
}

// Add rainbow animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes modalBounceIn {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    top: -10px;
    z-index: 10000;
    animation: confetti-fall linear forwards;
    pointer-events: none;
  }

  @keyframes confetti-fall {
    0% {
      transform: translateY(0) rotateZ(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotateZ(720deg);
      opacity: 0;
    }
  }

  .modal--easter-egg .modal__content {
    max-width: 700px;
  }

  .easter-egg-celebration {
    display: inline-block;
    animation: bounce 0.5s ease-in-out 3;
  }

  .theme--dark .modal--easter-egg .modal__content {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(102, 126, 234, 0.15)) !important;
  }

  .theme--terminal .modal--easter-egg .modal__content {
    background: linear-gradient(135deg, rgba(10, 14, 20, 0.98), rgba(0, 255, 65, 0.1)) !important;
    border-color: #00ff41 !important;
    box-shadow: 0 0 40px rgba(0, 255, 65, 0.4) !important;
  }
`;
document.head.appendChild(style);
