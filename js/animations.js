/**
 * GSAP Power4, Pinned Horizontal Scroll & 3D Parallax Motion Engine
 */

class PortfolioAnimations {
  constructor() {
    this.lenis = null;
    this.initLenis();
    this.initGSAP();
    this.setup3DTiltCards();
  }

  initLenis() {
    if (typeof Lenis === 'undefined') return;

    this.lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      smoothTouch: false
    });

    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      this.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    this.setupPreloaderSequence();
    this.setupHorizontalScroll();
    this.setupSectionReveals();
    this.setupStatsCountUp();
    this.setupToolProgressBars();
  }

  setupPreloaderSequence() {
    const preloader = document.querySelector('.preloader');
    const titleBox = document.querySelector('.preloader-title-box');
    const letters = document.querySelectorAll('.preloader-letter');
    const subtext = document.querySelector('.preloader-subtext');
    const counterRow = document.querySelector('.preloader-counter-row');
    const counterNum = document.querySelector('.preloader-counter-number');
    const barBg = document.querySelector('.preloader-bar-bg');
    const barFill = document.querySelector('.preloader-bar-fill');
    const statusText = document.querySelector('.preloader-status');

    if (!preloader || !counterNum || !barFill) return;

    // Timeline for MAQFOLIO pop-up motion & scroll-up countdown reveal
    const mainTl = gsap.timeline();

    // 1. MAQFOLIO letters pop UP slowly & majestically with 3D spring bounce
    mainTl.to(letters, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.95,
      stagger: 0.12,
      ease: "back.out(2.0)"
    })
    .to(subtext, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")

    // 2. Majestic pause on title before scroll UP transition
    .to(titleBox, {
      y: -110,
      opacity: 0,
      duration: 0.95,
      delay: 0.9,
      ease: "power3.inOut"
    })
    .to([counterRow, barBg], {
      opacity: 1,
      y: -20,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")

    // 3. Smooth, majestic Countdown 1, 2, 3 ... 100% after scroll-up
    .add(() => {
      const counterObj = { val: 1 };

      gsap.to(counterObj, {
        val: 100,
        duration: 3.8,
        ease: "power1.inOut",
        onUpdate: () => {
          const currentVal = Math.floor(counterObj.val);
          counterNum.textContent = currentVal;
          barFill.style.width = currentVal + '%';

          if (statusText) {
            if (currentVal >= 90) statusText.textContent = "04 LAUNCHING MAQFOLIO";
            else if (currentVal >= 60) statusText.textContent = "03 LIGHTING SHADERS";
            else if (currentVal >= 25) statusText.textContent = "02 CREATIVE ASSETS";
            else statusText.textContent = "01 INITIALIZING SYSTEM";
          }
        },
        onComplete: () => {
          // 4. Final smooth curtain reveal: Preloader slides up into portfolio
          gsap.to(preloader, {
            yPercent: -100,
            duration: 1.05,
            ease: "power4.inOut",
            onComplete: () => {
              preloader.style.display = 'none';
              this.animateHeroEntrance();
            }
          });
        }
      });
    });
  }

  animateHeroEntrance() {
    const portraitWrapper = document.querySelector('.hero-portrait-wrapper');
    const title = document.querySelector('.hero-huge-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const details = document.querySelector('.hero-details-row');
    const ctas = document.querySelector('.hero-cta-row');

    if (portraitWrapper) {
      portraitWrapper.classList.add('loaded');
    }

    const tl = gsap.timeline();

    tl.from(title, {
      opacity: 0,
      y: 100,
      duration: 1.4,
      ease: "power4.out"
    })
    .from(subtitle, {
      opacity: 0,
      y: 40,
      duration: 1.0,
      ease: "power3.out"
    }, "-=0.9")
    .from([details, ctas], {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.6");
  }

  setupHorizontalScroll() {
    const section = document.querySelector('.horizontal-scroll-section');
    const track = document.querySelector('.horizontal-track');

    if (!section || !track) return;

    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + 120);
    };

    gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        end: () => "+=" + track.scrollWidth,
        invalidateOnRefresh: true
      }
    });
  }

  setup3DTiltCards() {
    const tiltElems = document.querySelectorAll('.category-card, .horizontal-card, .work-showcase-card, .portfolio-card, .hero-portrait-wrapper, .centered-glass-contact-card, .tool-matrix-card');

    tiltElems.forEach(elem => {
      elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = ((e.clientY - centerY) / rect.height) * -8;
        const rotateY = ((e.clientX - centerX) / rect.width) * 8;

        elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      elem.addEventListener('mouseleave', () => {
        elem.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      });
    });
  }

  setupStatsCountUp() {
    document.querySelectorAll('[data-count]').forEach(elem => {
      const targetVal = parseInt(elem.getAttribute('data-count'), 10);
      const suffix = elem.getAttribute('data-suffix') || '';

      gsap.to({ val: 0 }, {
        scrollTrigger: {
          trigger: elem,
          start: "top 90%",
          once: true
        },
        val: targetVal,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          elem.textContent = Math.floor(this.targets()[0].val) + suffix;
        }
      });
    });
  }

  setupToolProgressBars() {
    document.querySelectorAll('.tool-matrix-card').forEach(card => {
      const barFill = card.querySelector('.tool-level-bar-fill');
      const targetLevel = card.getAttribute('data-level') || '85%';

      if (barFill) {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            barFill.style.width = targetLevel;
          }
        });
      }
    });
  }

  setupSectionReveals() {
    document.querySelectorAll('.section:not(#hero):not(.horizontal-scroll-section)').forEach(sec => {
      gsap.from(sec, {
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 70,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.9,
        ease: "power4.out"
      });
    });
  }
}

window.PortfolioAnimations = PortfolioAnimations;
