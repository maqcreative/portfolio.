/**
 * Main Application Coordinator for MAQ.CR / Mohammed Velom Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Cursor
  if (window.CustomCursor) {
    window.customCursor = new window.CustomCursor();
  }

  // 2. Initialize Animations & Motion Engine
  if (window.PortfolioAnimations) {
    window.portfolioAnimations = new window.PortfolioAnimations();
  }

  // 3. Theme Toggle Setup (Light / Midnight Blue Dark)
  setupThemeToggle();

  // 4. Fullscreen Liquid Glass Drawer Setup
  setupFullscreenDrawer();

  // 5. Category Showcase Filter Tabs
  setupCategoryShowcaseFilters();

  // 6. Tools Matrix Filter Tabs
  setupToolsMatrix();

  // 7. Setup Header Navigation & Floating Pill Nav Scroll Sync
  setupHeaderAndPillNav();

  // 8. Setup Top Scroll Progress Bar
  setupScrollProgress();

  // 9. Setup Back to Top Button
  setupBackToTop();

  // 10. Setup FAQ Accordion
  setupFAQAccordion();

  // 11. Setup Contact Form
  setupContactForm();

  // 12. Setup Synthetic Web Audio "Tick Tack" Tapping Sound Engine
  setupTickTackSoundEngine();

  // 13. Setup DSLR Camera Viewfinder Modal
  setupViewfinderModal();

  // 14. Setup Docked MAQ AI Live Assistant Widget
  setupMAQAIWidget();

  // 15. Setup Hidden "velom" Easter Egg Listener
  setupEasterEggSecret();

  // 16. Setup Interactive Glass Resume Modal
  setupResumeModal();
});

function setupThemeToggle() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('maqcr_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('maqcr_theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });
}

function setupFullscreenDrawer() {
  const drawer = document.querySelector('.fullscreen-drawer');
  const triggerBtn = document.querySelector('.drawer-trigger-btn');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');
  const navItems = document.querySelectorAll('.drawer-nav-item');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Staggered entrance animation for nav items
    navItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.05 + 0.1}s`;
    });
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    document.body.style.overflow = '';

    navItems.forEach((item) => {
      item.style.transitionDelay = '0s';
    });
  };

  if (triggerBtn) triggerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function setupCategoryShowcaseFilters() {
  const filterBtns = document.querySelectorAll('.cat-tab-btn');
  const catCards = document.querySelectorAll('.category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-category-filter');

      let visibleCount = 0;
      catCards.forEach(card => {
        const category = card.getAttribute('data-cat');

        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.transform = 'translateY(25px) scale(0.95)';
          card.style.opacity = '0';
          card.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';
          
          setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
          }, visibleCount * 60 + 40);

          visibleCount++;
        } else {
          card.style.transform = 'translateY(15px) scale(0.95)';
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

function setupToolsMatrix() {
  const filterBtns = document.querySelectorAll('.tool-tab-btn[data-filter]');
  const toolCards = document.querySelectorAll('.tool-matrix-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      let visibleCount = 0;
      toolCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.transform = 'translateY(25px) scale(0.95)';
          card.style.opacity = '0';
          card.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';

          setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
          }, visibleCount * 50 + 30);

          visibleCount++;
        } else {
          card.style.transform = 'translateY(15px) scale(0.95)';
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

function setupHeaderAndPillNav() {
  const header = document.querySelector('.site-header');
  const floatingPill = document.querySelector('.floating-bottom-pill-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }

    if (window.scrollY > 350) {
      if (floatingPill) floatingPill.classList.remove('hidden');
    } else {
      if (floatingPill) floatingPill.classList.add('hidden');
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

function setupBackToTop() {
  const backTopBtn = document.getElementById('back-to-top-btn');
  if (!backTopBtn) return;

  backTopBtn.addEventListener('click', () => {
    if (window.portfolioAnimations && window.portfolioAnimations.lenis) {
      window.portfolioAnimations.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function setupScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalScroll) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

function setupFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    const name = form.querySelector('#name')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const project = form.querySelector('#project')?.value || '';
    const message = form.querySelector('#message')?.value || '';

    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitting...`;
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(() => {
      submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Sent to mohammedvelom.in@gmail.com!`;
      submitBtn.style.background = 'var(--accent-gradient)';
      submitBtn.style.color = '#FFFFFF';
      form.reset();
    })
    .catch(() => {
      // Fallback: Launch mailto directly to mohammedvelom.in@gmail.com
      const mailtoUrl = `mailto:mohammedvelom.in@gmail.com?subject=New%20Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AProject:%20${encodeURIComponent(project)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
      window.location.href = mailtoUrl;

      submitBtn.innerHTML = `<i class="fa-solid fa-envelope-circle-check"></i> Email Client Opened!`;
      submitBtn.style.background = 'var(--accent-gradient)';
      submitBtn.style.color = '#FFFFFF';
      form.reset();
    })
    .finally(() => {
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
      }, 4000);
    });
  });
}

function setupTickTackSoundEngine() {
  let audioCtx = null;

  const initAudioCtx = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  const playTickTackSound = (isInteractive) => {
    try {
      initAudioCtx();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';

      if (isInteractive) {
        // High-pitched crisp "TICK" sound for buttons, links, & tabs
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      } else {
        // Subtle warm "TACK" sound for general screen tapping
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.03);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      }

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      // Ignore audio context autoplay restriction exceptions
    }
  };

  // Listen for user pointer/mouse events to play tick-tack sound
  window.addEventListener('pointerdown', (e) => {
    const target = e.target.closest('a, button, input, textarea, select, .magnetic, .category-card, .horizontal-card, .tool-matrix-card, .process-card, .work-showcase-card, .tool-tab-btn, .theme-toggle-btn, .drawer-trigger-btn, .drawer-close-btn, .ask-mohammed-trigger, .ai-preset-question-btn');
    playTickTackSound(!!target);
  }, { passive: true });
}

function setupViewfinderModal() {
  const modal = document.getElementById('viewfinder-modal');
  const previewImg = document.getElementById('vf-preview-img');
  const closeBtn = modal ? modal.querySelector('.viewfinder-close-btn') : null;

  const vfIso = document.getElementById('vf-iso');
  const vfAperture = document.getElementById('vf-aperture');
  const vfShutter = document.getElementById('vf-shutter');
  const vfLens = document.getElementById('vf-lens');
  const vfCam = document.getElementById('vf-cam');

  if (!modal || !previewImg) return;

  const workSelectors = '.viewfinder-trigger, .work-showcase-card, .horizontal-card, .category-card, .polaroid-card';

  document.querySelectorAll(workSelectors).forEach(trigger => {
    trigger.style.cursor = 'pointer';

    trigger.addEventListener('click', (e) => {
      // If clicking an inline link or button inside the card, allow normal action unless it's an image preview trigger
      if (e.target.closest('a:not(.viewfinder-trigger)') && !e.target.closest('.work-img-box')) {
        return;
      }

      e.stopPropagation();
      const img = trigger.getAttribute('data-img') || trigger.querySelector('img')?.src;
      const iso = trigger.getAttribute('data-iso') || '100';
      const aperture = trigger.getAttribute('data-aperture') || 'f/1.8';
      const shutter = trigger.getAttribute('data-shutter') || '1/1000s';
      const lens = trigger.getAttribute('data-lens') || '50mm GM';
      const cam = trigger.getAttribute('data-cam') || 'SONY α7 IV';

      if (img) previewImg.src = img;
      if (vfIso) vfIso.textContent = iso;
      if (vfAperture) vfAperture.textContent = aperture;
      if (vfShutter) vfShutter.textContent = shutter;
      if (vfLens) vfLens.textContent = lens;
      if (vfCam) vfCam.textContent = cam;

      modal.classList.add('active');
    });
  });

  const closeModal = () => modal.classList.remove('active');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC key listener to close pop-up modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function setupMAQAIWidget() {
  const widget = document.getElementById('maq-ai-chat-widget');
  const triggerBtn = widget ? widget.querySelector('.maq-ai-trigger-btn') : null;
  const closeBtn = widget ? widget.querySelector('.maq-ai-close-btn') : null;
  const form = document.getElementById('maq-ai-form');
  const input = document.getElementById('maq-ai-input');
  const chatLog = document.getElementById('maq-ai-log');
  const chips = document.querySelectorAll('.maq-ai-chip');

  if (!widget || !triggerBtn || !form || !input || !chatLog) return;

  const expandBtn = widget ? widget.querySelector('.maq-ai-expand-btn') : null;
  const chatWindow = widget ? widget.querySelector('.maq-ai-chat-window') : null;

  const toggleWidget = () => widget.classList.toggle('active');
  triggerBtn.addEventListener('click', toggleWidget);
  if (closeBtn) closeBtn.addEventListener('click', toggleWidget);

  if (expandBtn && chatWindow) {
    expandBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('expanded');
      const isExpanded = chatWindow.classList.contains('expanded');
      expandBtn.innerHTML = isExpanded ? '<i class="fa-solid fa-compress"></i>' : '<i class="fa-solid fa-expand"></i>';
    });
  }

  // Prevent main page smooth scroll (Lenis) from trapping chat box scrolling
  chatLog.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
  chatLog.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });

  const generateBotReply = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    // 0. Arithmetic & Designer Math Calculator Engine (+, -, *, /)
    const cleanedMathQuery = q.replace(/x/g, '*').replace(/\s+/g, '');
    const isMathPattern = /^[\d\.\+\-\*\/\(\)]+$/.test(cleanedMathQuery) && /[\+\-\*\/]/.test(cleanedMathQuery);

    if (isMathPattern) {
      try {
        const evalResult = Function(`"use strict"; return (${cleanedMathQuery})`)();
        const numResult = typeof evalResult === 'number' ? Number(evalResult.toFixed(4)) : evalResult;

        let designInsight = '';
        if (q.includes('1920') && q.includes('1080')) {
          designInsight = '<br>• <strong>Design Insight:</strong> Equals <strong>16:9 Aspect Ratio</strong> (Full HD 1080p Standard) 🎥';
        } else if (q.includes('3840') && q.includes('2160')) {
          designInsight = '<br>• <strong>Design Insight:</strong> Equals <strong>16:9 Aspect Ratio</strong> (4K UHD Standard) 🎬';
        } else if (q.includes('1080') && q.includes('1080')) {
          designInsight = '<br>• <strong>Design Insight:</strong> Equals <strong>1:1 Aspect Ratio</strong> (Instagram Square Post) 📸';
        } else if (q.includes('1080') && q.includes('1920')) {
          designInsight = '<br>• <strong>Design Insight:</strong> Equals <strong>9:16 Aspect Ratio</strong> (Instagram Reel & TikTok Vertical Video) 📱';
        } else if (q.includes('300')) {
          designInsight = '<br>• <strong>Design Insight:</strong> 300 DPI is the industry gold standard resolution for crisp print publishing 🖨️';
        }

        return `🧮 <strong>MAQ AI Math Calculation</strong> ✨<br><br>• <strong>Expression:</strong> <code>${userQuery}</code><br>• <strong>Result:</strong> <strong style="color: var(--accent-cyan); font-size: 1.1rem;">${numResult}</strong>${designInsight} 🚀`;
      } catch (e) {
        // Fallback for invalid math syntax
      }
    }

    // 1. Creator & Developer Attribution
    if (q.includes('who made') || q.includes('who created') || q.includes('who built') || q.includes('who designed') || q.includes('made by') || q.includes('created by') || q.includes('developer') || q.includes('author')) {
      return "🎨 **Made by Mohammed Velom** 🚀<br><br>I was created and developed by **Mohammed Velom** (`maq.cr`), a Graphic Designer, Photographer, Videographer, & BCA Student based in Kerala, India! ✨<br><br>• 📧 **Email:** <code>mohammedvelom.in@gmail.com</code><br>• 📱 **Phone:** <code>+91 9747008103</code>🔥";
    }

    // 1b. Greetings & System Persona Introduction
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings') || q === 'yo') {
      return "👋 **Welcome! I am MAQ AI**, crafted by **Mohammed Velom** ✨.<br><br>I provide accurate, detailed guidance across **Graphic Design 🎨, Brand Systems 💡, 4K Photography 📸, Video Editing & Motion 🎥, Web Development 💻, & Mathematics 🧮**.<br><br>How can I assist your creative process, technical learning, or portfolio inquiry today? 🚀";
    }

    // 2. Persona & Expertise Details
    if (q.includes('who are you') || q.includes('what are you') || q.includes('expert') || q.includes('persona')) {
      return "🤖 **MAQ AI — Created by Mohammed Velom** ✨<br><br>• 🎨 <strong>Visual & Motion Arts:</strong> Graphic Design, Brand Architecture, Logo Vectoring, UI/UX Systems, Photography (RAW Exposure), Videography (S-Log3), & Motion Graphics.<br>• 💻 <strong>Software & Engineering:</strong> Adobe Photoshop, Illustrator, Lightroom, Premiere Pro, After Effects, DaVinci Resolve, Figma, HTML5, CSS3, JavaScript, GSAP, & Lenis.<br>• 🧮 <strong>Mathematical Intelligence:</strong> Real-time arithmetic (`+`, `-`, `*`, `/`), aspect ratio calculations (16:9, 9:16, 1:1), and 300 DPI print resolution math.<br>• 👤 <strong>Mohammed Velom Portfolio:</strong> Verified, accurate answers about Mohammed's background, projects, & freelance availability! 💡";
    }

    // 3. Questions about Mohammed Velom
    if (q.includes('mohammed') || q.includes('velom') || q.includes('who is mohammed') || q.includes('portfolio')) {
      return "👤 **About Mohammed Velom** 🚀<br><br>• 🎨 <strong>Professional Role:</strong> Creative Graphic Designer, 4K Photographer, Videographer, & BCA Student.<br>• 📍 <strong>Location:</strong> Velom, Kozhikode, Kerala, India.<br>• 💼 <strong>Experience:</strong> 2+ years producing commercial brand identities, event poster art, 4K video editing, & web apps.<br>• 🎓 <strong>Academics:</strong> Pursuing a Bachelor of Computer Applications (BCA), fusing computer science with art direction.<br>• 📧 <strong>Contact Info:</strong> <code>mohammedvelom.in@gmail.com</code> | 📱 <code>+91 9747008103</code> 🔥";
    }

    // 4. Photography, Exposure & Sony Gear
    if (q.includes('camera') || q.includes('gear') || q.includes('lens') || q.includes('sony') || q.includes('photo') || q.includes('iso') || q.includes('aperture') || q.includes('exposure')) {
      return "📸 **Photography & Exposure Masterclass** ✨<br><br>1. 🎯 <strong>Camera Setup:</strong> Sony α7 series 4K Full-Frame camera paired with 35mm f/1.4 GM & 50mm f/1.8 GM prime lenses.<br>2. 💡 <strong>Step-by-Step Exposure Rules:</strong><br>• <strong>ISO:</strong> Keep low (100–400) for maximum dynamic range and noise-free shadows.<br>• <strong>Aperture:</strong> Use wide apertures (f/1.4–f/2.0) for shallow depth of field & creamy background bokeh.<br>• <strong>Shutter Speed:</strong> Set to 1/250s+ for crisp portraits, or 2x framerate (1/50s at 24fps) for cinematic motion.<br>3. 🎨 <strong>Lightroom Workflow:</strong> Import RAW files, correct white balance, apply S-curve contrast, and enhance split-toning highlights!";
    }

    // 5. Graphic Design, Branding & Adobe Illustrator / Photoshop
    if (q.includes('design') || q.includes('logo') || q.includes('photoshop') || q.includes('illustrator') || q.includes('brand') || q.includes('color') || q.includes('typography') || q.includes('figma') || q.includes('canva')) {
      return "🎨 **Graphic Design & Brand Architecture** 💡<br><br>1. ✏️ <strong>Vector Logo Creation:</strong> Build all logos in Adobe Illustrator using precise grid geometry & vector paths for infinite scaling.<br>2. 🌟 <strong>Color Theory (60-30-10 Rule):</strong> Allocate 60% to dominant background, 30% to secondary structural theme, and 10% to vibrant accent glow.<br>3. 🔥 <strong>Typography Hierarchy:</strong> Pair clean geometric sans-serifs (Space Grotesk / Inter) with elegant scripts or serifs.<br>4. 👑 <strong>Featured Project:</strong> Explore <em>Tahta Qadamika</em> — a luxury green & gold Arabic visual identity system!";
    }

    // 6. Video Production & Motion Design
    if (q.includes('video') || q.includes('edit') || q.includes('premiere') || q.includes('davinci') || q.includes('after effect') || q.includes('motion') || q.includes('render')) {
      return "🎥 **Cinematic Video Production Pipeline** 🚀<br><br>1. 🎬 <strong>Filming:</strong> Shoot 4K 60FPS in S-Log3 / flat profiles for maximum dynamic range.<br>2. 🎨 <strong>Color Grading (DaVinci Resolve):</strong> Rec.709 color transform, skin tone isolation, & custom LUT mapping.<br>3. 🎵 <strong>Editing & VFX (Premiere Pro & After Effects):</strong> Cut tightly to music audio beats, add lower thirds, and render in H.264 / ProRes 422!";
    }

    // 7. Science, Technology & Programming
    if (q.includes('code') || q.includes('html') || q.includes('css') || q.includes('js') || q.includes('javascript') || q.includes('web') || q.includes('bca') || q.includes('ui/ux') || q.includes('science') || q.includes('tech') || q.includes('program')) {
      return "💻 **Web Application & UI/UX Engineering** ⚡<br><br>1. 🚀 <strong>Frontend Architecture:</strong> HTML5 Semantic Markup, Vanilla CSS3, JavaScript (ES6+), GSAP Animations, & Lenis Smooth Scroll.<br>2. 🎓 <strong>UI/UX Best Practices:</strong> Mobile-first fluid responsive grids, accessible contrast ratios (WCAG 2.1), & micro-interaction spring physics.<br>3. 🤖 <strong>BCA Technical Integration:</strong> Fusing computer science algorithms with high-end visual art direction!";
    }

    // 8. Booking, Rates & Contact Details
    if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('rate') || q.includes('price') || q.includes('freelance')) {
      return "💼 **Hire Mohammed Velom** 🎯<br><br>• 💬 <strong>WhatsApp:</strong> <a href=\"https://wa.me/919747008103?text=Hello!%20Mohammed%20Velom%20I'd%20like%20to%20discuss%20a%20project.\" target=\"_blank\" style=\"color: #25D366; font-weight: 700;\">Chat on WhatsApp</a><br>• 📧 <strong>Email:</strong> <code>mohammedvelom.in@gmail.com</code><br>• 📱 <strong>Phone:</strong> <code>+91 9747008103</code><br>• 📍 <strong>Location:</strong> Velom, Kozhikode, Kerala, India<br>Available for worldwide freelance brand systems, commercial photo shoots, 4K video editing, & web apps! 🔥";
    }

    // 9. Comprehensive AI Answer Engine with Detailed Reasoning
    return `🤖 **MAQ AI Detailed Response** ✨<br><br>Regarding your query: <em>"${userQuery}"</em>:<br><br>1. 💡 <strong>Step-by-Step Breakdown:</strong> I systematically evaluate technical, creative, and mathematical requirements.<br>2. 🎯 <strong>Best Practice Recommendation:</strong> Use industry-standard workflows (Adobe Creative Cloud, Figma, GSAP) and maintain strict visual hierarchy.<br><br>Feel free to ask me any specific question about:<br>• 📸 <strong>Camera Exposure & Lightroom Editing</strong><br>• 🎨 <strong>Logo Geometry & Brand Systems</strong><br>• 🧮 <strong>Aspect Ratios & Math Calculations</strong><br>• 👤 <strong>Mohammed Velom Portfolio & Bookings</strong> 🚀`;
  };

  const addMessage = (text, isUser = false) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `maq-ai-msg ${isUser ? 'user' : 'bot'}`;
    msgDiv.innerHTML = `<div class="msg-content">${text}</div>`;
    chatLog.appendChild(msgDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  };

  const handleUserMessage = (queryText) => {
    if (!queryText.trim()) return;
    addMessage(queryText, true);

    // Show typing indicator
    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'maq-ai-msg bot';
    typingDiv.id = typingId;
    typingDiv.innerHTML = `<div class="msg-content" style="color: var(--text-muted);"><i class="fa-solid fa-circle-notch fa-spin"></i> MAQ AI is thinking...</div>`;
    chatLog.appendChild(typingDiv);
    chatLog.scrollTop = chatLog.scrollHeight;

    setTimeout(() => {
      document.getElementById(typingId)?.remove();
      const botReply = generateBotReply(queryText);
      addMessage(botReply, false);
    }, 550);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value;
    input.value = '';
    handleUserMessage(query);
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      handleUserMessage(query);
    });
  });
}

function setupEasterEggSecret() {
  const modal = document.getElementById('easter-egg-modal');
  const closeBtns = modal ? modal.querySelectorAll('.ee-close-btn') : [];
  const logo = document.querySelector('.brand-logo');

  let keySequence = '';
  let logoClickCount = 0;

  const unlockEE = () => {
    if (modal) modal.classList.add('active');
  };

  const closeModal = () => {
    if (modal) modal.classList.remove('active');
  };

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  window.addEventListener('keydown', (e) => {
    keySequence += e.key.toLowerCase();
    if (keySequence.length > 10) {
      keySequence = keySequence.slice(-10);
    }
    if (keySequence.includes('velom')) {
      unlockEE();
      keySequence = '';
    }
  });

  if (logo) {
    logo.addEventListener('click', () => {
      logoClickCount++;
      if (logoClickCount >= 5) {
        unlockEE();
        logoClickCount = 0;
      }
    });
  }
}

function setupResumeModal() {
  const modal = document.getElementById('resume-modal');
  const triggers = document.querySelectorAll('.resume-modal-trigger');
  const closeBtn = modal ? modal.querySelector('.resume-close-btn') : null;

  if (!modal || !triggers.length) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  const closeModal = () => modal.classList.remove('active');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
