/**
 * Arjuna Dwi Damara Putra — Machine Learning Engineer Portfolio
 * Interactive Scripts: Neural Canvas, Mobile Navigation, Scrollspy, and Clipboard Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initMobileNav();
  initScrollspy();
  initCopyButtons();
  initBackToTop();
});

/* ==========================================================================
   1. Interactive Neural Network Canvas Animation
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];
  
  // Configuration
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 38 : 75;
  const maxDistance = isMobile ? 100 : 140;
  const mouseRadius = 150;

  const mouse = {
    x: null,
    y: null,
    radius: mouseRadius
  };

  // Node particle class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
      // Vary between cyan, violet, and subtle slate
      const colors = [
        'rgba(0, 240, 255, 0.8)',
        'rgba(129, 140, 248, 0.8)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(255, 255, 255, 0.6)'
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce at boundary
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    initParticles();
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = 1 - (dist / maxDistance);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          // Dual-color gradient connection line
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect to mouse pointer
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const alpha = 1 - (dist / mouse.radius);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${alpha * 0.35})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    drawConnections();
    animationFrameId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Handle visibility changes to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  resizeCanvas();
  animate();
}

/* ==========================================================================
   2. Mobile Navigation Toggle Drawer
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!menuToggle || !navLinks) return;

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !navLinks.classList.contains('is-open');
    menuToggle.classList.toggle('is-open', shouldOpen);
    navLinks.classList.toggle('is-open', shouldOpen);
    menuToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking nav link
  const links = navLinks.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close when clicking outside navbar
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('is-open') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   3. Smooth Scrollspy & Active Navigation Link Highlighting
   ========================================================================== */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !navLinks.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 120; // Offset for navbar height

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   4. One-Click Copy to Clipboard with Tooltip Visual Feedback
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      const tooltip = btn.querySelector('.copy-tooltip');
      const originalText = tooltip ? tooltip.textContent : 'Copy';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for older or unsecure environments
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        // Show visual feedback
        btn.classList.add('copied');
        if (tooltip) tooltip.textContent = '✓ Copied!';

        setTimeout(() => {
          btn.classList.remove('copied');
          if (tooltip) tooltip.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        if (tooltip) tooltip.textContent = 'Error';
        setTimeout(() => {
          if (tooltip) tooltip.textContent = originalText;
        }, 2000);
      }
    });
  });
}

/* ==========================================================================
   5. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
