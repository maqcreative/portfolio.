/**
 * Minimalist Dot & Expanding Spring Pulse Cursor with Dynamic Context Icons & Sparkle Physics
 */

class CustomCursor {
  constructor() {
    this.dot = document.querySelector('.custom-cursor-dot');
    this.ring = document.querySelector('.custom-cursor-ring');
    this.cursorText = document.querySelector('.cursor-text');

    if (!this.dot || !this.ring) return;

    this.mousePos = { x: -100, y: -100 };
    this.dotPos = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };

    this.isHovered = false;
    this.isViewMode = false;
    this.currentContext = null;

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
    });

    window.addEventListener('mousedown', (e) => {
      document.body.classList.add('cursor-clicking');
      this.createClickRipple(e.clientX, e.clientY);
      this.createSparkleParticles(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-clicking');
    });

    this.setupHoverListeners();
    this.render();
  }

  setupHoverListeners() {
    const hoverElements = 'a, button, input, textarea, select, .magnetic, .theme-toggle-btn, .drawer-trigger-btn, .drawer-close-btn, .tool-tab-btn, .contact-chip-pill, .device-toggle-btn';
    
    document.addEventListener('mouseover', (e) => {
      const hoverTarget = e.target.closest(hoverElements);
      const viewTarget = e.target.closest('[data-cursor-view]');
      const photoTarget = e.target.closest('.category-card[data-cat="event"], .horizontal-card, .hero-portrait-wrapper');
      const videoTarget = e.target.closest('.category-card[data-cat="youtube"], .thumbnail-ratio');
      const designTarget = e.target.closest('.category-card[data-cat="admission"], .work-showcase-card');

      if (viewTarget) {
        document.body.classList.add('cursor-view-mode');
        const customText = viewTarget.getAttribute('data-cursor-text') || 'VIEW';
        if (this.cursorText) this.cursorText.textContent = customText;
      } else if (photoTarget) {
        document.body.classList.add('cursor-photo-mode');
        if (this.cursorText) this.cursorText.innerHTML = '<i class="fa-solid fa-camera"></i> PHOTO';
      } else if (videoTarget) {
        document.body.classList.add('cursor-video-mode');
        if (this.cursorText) this.cursorText.innerHTML = '<i class="fa-solid fa-play"></i> PLAY';
      } else if (designTarget) {
        document.body.classList.add('cursor-design-mode');
        if (this.cursorText) this.cursorText.innerHTML = '<i class="fa-solid fa-pen-nib"></i> DESIGN';
      } else if (hoverTarget) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const hoverTarget = e.target.closest(hoverElements);
      const viewTarget = e.target.closest('[data-cursor-view]');
      const photoTarget = e.target.closest('.category-card[data-cat="event"], .horizontal-card, .hero-portrait-wrapper');
      const videoTarget = e.target.closest('.category-card[data-cat="youtube"], .thumbnail-ratio');
      const designTarget = e.target.closest('.category-card[data-cat="admission"], .work-showcase-card');

      if (viewTarget || photoTarget || videoTarget || designTarget || hoverTarget) {
        document.body.classList.remove('cursor-hover', 'cursor-view-mode', 'cursor-photo-mode', 'cursor-video-mode', 'cursor-design-mode');
        if (this.cursorText) this.cursorText.innerHTML = '';
      }
    });
  }

  createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-click-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  createSparkleParticles(x, y) {
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-sparkle-particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      const angle = Math.random() * Math.PI * 2;
      const distance = 25 + Math.random() * 35;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 500);
    }
  }

  render() {
    this.dotPos.x += (this.mousePos.x - this.dotPos.x) * 0.85;
    this.dotPos.y += (this.mousePos.y - this.dotPos.y) * 0.85;

    this.ringPos.x += (this.mousePos.x - this.ringPos.x) * 0.28;
    this.ringPos.y += (this.mousePos.y - this.ringPos.y) * 0.28;

    if (this.dot) {
      this.dot.style.transform = `translate3d(${this.dotPos.x}px, ${this.dotPos.y}px, 0) translate(-50%, -50%)`;
    }

    if (this.ring) {
      this.ring.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(() => this.render());
  }
}

window.CustomCursor = CustomCursor;
