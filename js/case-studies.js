/**
 * Case Studies Data & Interactive Modal Drawer Controller
 * Detailed case studies for Mohammed Velom featuring Challenge, Process, Solution, and Results.
 */

const CASE_STUDIES_DATA = {
  aetheria: {
    id: "aetheria",
    title: "Aetheria - Luxury 3D Brand Identity",
    client: "Aetheria Studios",
    category: "Branding & Graphic Design",
    year: "2026",
    summary: "Rebranding a high-end European spatial computing company with minimalist luxury 3D art direction, dark aesthetic, and emerald metallic brand guidelines.",
    challenge: "The client needed a digital identity that reflected cutting-edge 3D spatial computing while retaining an exclusive, high-fashion luxury feel for high-net-worth enterprise investors.",
    process: "Conducted 4 weeks of design sprints exploring glassmorphism, procedural dark shaders, kinetic typography, and custom editorial grid systems. Crafted a bespoke vector monogram and 3D visual assets.",
    solution: "Delivered a complete brand design system including responsive UI components, 3D promotional assets, typography rules using Space Grotesk, and interactive guidelines.",
    results: {
      metric1: "+340%",
      label1: "Investor Engagement Rate",
      metric2: "2.4M+",
      label2: "Impressions Across Social Launch",
      metric3: "Awwwards",
      label3: "Site of the Day Winner"
    }
  },
  kinetix: {
    id: "kinetix",
    title: "Kinetix Motion - Commercial Showreel & Motion Graphics",
    client: "Kinetix Media",
    category: "Video Editing & VFX",
    year: "2025",
    summary: "High-octane sound design, color grading, visual effects, and rhythm editing for a global tech launch video watched by over 1.8M viewers.",
    challenge: "Transform 40+ hours of raw multi-cam footage into a 90-second cinematic showreel that keeps viewer drop-off below 5% on social platforms.",
    process: "Storyboarded kinetic cuts synchronized to bespoke sound effects. Implemented DaVinci Resolve color grading with emerald shadow tones and Premiere Pro dynamic graphic overlays.",
    solution: "Created a seamless rhythm-driven edit with subtle 3D camera tracking, custom kinetic text callouts, and audio mixing that heightened emotional impact.",
    results: {
      metric1: "1.8M+",
      label1: "Total Views",
      metric2: "94.2%",
      label2: "Audience Retention Rate",
      metric3: "15K+",
      label3: "Direct Shares"
    }
  },
  veritas: {
    id: "veritas",
    title: "Veritas Tech - Strategic Content & Technical Copywriting",
    client: "Veritas AI Platform",
    category: "Content Writing & Brand Strategy",
    year: "2025",
    summary: "Crafting technical documentation, developer landing page copy, and strategic whitepapers for a NextGen BCA AI research platform.",
    challenge: "Bridging the gap between complex machine learning architecture algorithms and accessible investor/developer marketing copy.",
    process: "Analyzed technical specs alongside computer science principles. Interviewed chief engineers and translated deep learning models into crisp, high-converting storytelling.",
    solution: "Wrote high-impact landing page copy, product release articles, and interactive documentation with clear call-to-actions and SEO optimization.",
    results: {
      metric1: "+210%",
      label1: "Organic Search Traffic Growth",
      metric2: "18.5%",
      label2: "Landing Page Conversion Rate",
      metric3: "Top 3",
      label3: "Google Search Ranking for Target Keywords"
    }
  },
  neuraui: {
    id: "neuraui",
    title: "NeuraUI - Next-Gen BCA Capstone Web Application",
    client: "Academic & Open Source",
    category: "UI/UX & Web Development",
    year: "2026",
    summary: "Designing and developing an interactive dark-mode developer console combining BCA computer science backend logic with ultra-fluid web animation.",
    challenge: "Existing developer portals are overly cluttered with high visual noise and slow rendering times on heavy data loads.",
    process: "Utilized modern web architecture, lightweight Three.js shaders, CSS Grid, and custom state management to ensure 60FPS fluid interactions across all viewports.",
    solution: "Built a sleek, high-contrast dark theme interface featuring glassmorphism cards, real-time code previewers, and keyboard-first navigation shortcuts.",
    results: {
      metric1: "100/100",
      label1: "Lighthouse Performance Score",
      metric2: "60 FPS",
      label2: "Consistent Animation Rendering",
      metric3: "Gold Grade",
      label3: "BCA Capstone Excellence Award"
    }
  }
};

class CaseStudyModal {
  constructor() {
    this.modal = document.getElementById('case-study-modal');
    this.modalContainer = this.modal ? this.modal.querySelector('.modal-content-container') : null;
    this.closeBtn = this.modal ? this.modal.querySelector('.modal-close-btn') : null;
    
    if (!this.modal) return;

    this.init();
  }

  init() {
    // Bind triggers across the site
    document.querySelectorAll('[data-open-case]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const caseId = btn.getAttribute('data-open-case');
        this.open(caseId);
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Escape key listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open(caseId) {
    const data = CASE_STUDIES_DATA[caseId];
    if (!data) return;

    // Render Dynamic Content
    const bodyContainer = document.getElementById('modal-body-content');
    if (bodyContainer) {
      bodyContainer.innerHTML = `
        <div class="tag-label">${data.category} • ${data.year}</div>
        <h2 class="section-title text-gradient" style="font-size: clamp(2rem, 4vw, 3.2rem);">${data.title}</h2>
        <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem;">${data.summary}</p>
        
        <div class="case-study-grid">
          <div class="case-box">
            <h4><i class="fa-solid fa-bullseye"></i> The Challenge</h4>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7;">${data.challenge}</p>
          </div>

          <div class="case-box">
            <h4><i class="fa-solid fa-compass-drafting"></i> The Process</h4>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7;">${data.process}</p>
          </div>
        </div>

        <div class="case-box" style="margin-top: 2rem;">
          <h4><i class="fa-solid fa-lightbulb"></i> The Solution & Craft</h4>
          <p style="color: var(--text-secondary); font-size: 0.98rem; line-height: 1.8;">${data.solution}</p>
        </div>

        <div class="case-metrics-grid">
          <div>
            <div class="metric-num">${data.results.metric1}</div>
            <div class="metric-label">${data.results.label1}</div>
          </div>
          <div>
            <div class="metric-num">${data.results.metric2}</div>
            <div class="metric-label">${data.results.label2}</div>
          </div>
          <div>
            <div class="metric-num">${data.results.metric3}</div>
            <div class="metric-label">${data.results.label3}</div>
          </div>
        </div>
      `;
    }

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (window.soundEngine) window.soundEngine.playClickTone();
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    if (window.soundEngine) window.soundEngine.playClickTone();
  }
}

window.CaseStudyModal = CaseStudyModal;
