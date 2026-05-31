"use strict";

/* ─────────────────────────────────────────────
   TYPED — Real, honest phrases only
───────────────────────────────────────────── */
const PHRASES = [
  "Python developer",
  "data analysis & ML",
  "B.Tech CSE · 2023–2027",
  "Labmentix intern",
  "building with data",
];

let pIdx = 0, cIdx = 0, del = false;

function typed() {
  const el = document.getElementById("typed");
  if (!el) return;
  const phrase = PHRASES[pIdx];

  if (!del) {
    el.textContent = phrase.slice(0, cIdx + 1);
    cIdx++;
    if (cIdx === phrase.length) {
      setTimeout(() => { del = true; typed(); }, 2400);
      return;
    }
  } else {
    el.textContent = phrase.slice(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      del = false;
      pIdx = (pIdx + 1) % PHRASES.length;
    }
  }
  setTimeout(typed, del ? 52 : 90);
}

/* ─────────────────────────────────────────────
   NAV — sticky + active link
───────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const tick = () => nav.classList.toggle("stuck", window.scrollY > 24);
  window.addEventListener("scroll", tick, { passive: true });
  tick();
}

function toggleNav() {
  const drawer  = document.getElementById("nav-drawer");
  const btn     = document.getElementById("nav-toggle");
  if (!drawer || !btn) return;

  const open = drawer.classList.toggle("open");
  btn.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", String(open));
  drawer.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

// Close drawer on outside click
document.addEventListener("click", (e) => {
  const nav    = document.getElementById("nav");
  const drawer = document.getElementById("nav-drawer");
  const btn    = document.getElementById("nav-toggle");
  if (!nav || !drawer || !btn) return;
  if (!nav.contains(e.target) && drawer.classList.contains("open")) {
    drawer.classList.remove("open");
    btn.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
});

/* ─────────────────────────────────────────────
   SCROLL SPY
───────────────────────────────────────────── */
function initScrollSpy() {
  const links = document.querySelectorAll(".nav-link");
  const ids   = ["about", "skills", "experience", "projects", "contact"];

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach((a) => {
          a.classList.toggle("on", a.getAttribute("href") === `#${id}`);
        });
      }
    }),
    { threshold: 0.35 }
  );

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ─────────────────────────────────────────────
   REVEAL on scroll
───────────────────────────────────────────── */
function initReveal() {
  // Stagger cards in a grid naturally
  document.querySelectorAll(
    ".skill-block, .proj-card, .ccard, .proj-row .proj-card"
  ).forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    el.classList.add("reveal");
  });

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ─────────────────────────────────────────────
   SKILL BARS — animate width on reveal
───────────────────────────────────────────── */
function initSkillBars() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".skill-bar").forEach((bar, i) => {
          setTimeout(() => bar.classList.add("go"), i * 80);
        });
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.3 }
  );

  document.querySelectorAll(".skill-block").forEach((b) => io.observe(b));
}

/* ─────────────────────────────────────────────
   CONTACT FORM
   Replace formspree URL with your own from formspree.io (free)
───────────────────────────────────────────── */
function submitForm(e) {
  e.preventDefault();

  const btn = document.getElementById("f-submit");
  const msg = document.getElementById("form-msg");
  const form = e.target;

  btn.disabled   = true;
  btn.textContent = "Sending…";

  // ── Uncomment & swap YOUR_ID when you sign up at formspree.io ──
  // fetch("https://formspree.io/f/YOUR_ID", {
  //   method: "POST",
  //   body: new FormData(form),
  //   headers: { Accept: "application/json" },
  // })
  // .then(r => r.ok ? ok() : fail())
  // .catch(fail);

  // Demo — remove this block once Formspree is connected:
  setTimeout(ok, 900);

  function ok() {
    form.reset();
    btn.textContent    = "Sent ✓";
    btn.style.background = "linear-gradient(135deg,#22c55e,#16a34a)";
    btn.style.boxShadow  = "0 4px 18px rgba(34,197,94,.25)";
    if (msg) { msg.hidden = false; msg.textContent = "Got it — I'll reply soon."; }
    setTimeout(() => {
      btn.textContent    = "Send message";
      btn.style.background = "";
      btn.style.boxShadow  = "";
      btn.disabled       = false;
      if (msg) msg.hidden = true;
    }, 5000);
  }

  function fail() {
    btn.textContent = "Try again";
    btn.disabled    = false;
    if (msg) {
      msg.hidden      = false;
      msg.style.color = "#f87171";
      msg.textContent = "Something went wrong. Email me directly instead.";
    }
  }
}

/* ─────────────────────────────────────────────
   KEYBOARD
───────────────────────────────────────────── */
function initA11y() {
  const btn = document.getElementById("nav-toggle");
  if (btn) {
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleNav();
      }
    });
  }
}

/* ─────────────────────────────────────────────
   SUBTLE AMBIENT GLOW follows cursor (desktop only)
───────────────────────────────────────────── */
function initAmbient() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const el = Object.assign(document.createElement("div"), {
    id: "ambient",
    setAttribute: () => {},
  });
  el.setAttribute("aria-hidden", "true");
  el.style.cssText = `
    position:fixed;pointer-events:none;z-index:9999;
    width:380px;height:380px;border-radius:50%;
    background:radial-gradient(circle,rgba(124,112,232,.06) 0%,transparent 70%);
    transform:translate(-50%,-50%);
    transition:opacity .4s ease;
    opacity:0;top:0;left:0;
  `;
  document.body.appendChild(el);

  let raf;
  document.addEventListener("mousemove", (e) => {
    el.style.opacity = "1";
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      el.style.left = `${e.clientX}px`;
      el.style.top  = `${e.clientY}px`;
    });
  });

  document.addEventListener("mouseleave", () => { el.style.opacity = "0"; });
}

/* ─────────────────────────────────────────────
   PROJECT MODAL POPUP SYSTEM
───────────────────────────────────────────── */
const PROJECTS_LIST = [
  {
    id: "resume",
    title: "AI Resume Screening System",
    blurb: "An AI-powered resume screening system that analyzes resumes and helps automate candidate evaluation using Python and machine learning.",
    image: "./assets/project-resume.png",
    whyBuilt: "I noticed recruiters spend hours manually reading resumes, and a lot of qualified candidates get missed due to human fatigue. I wanted to build an automated way to screen resumes objectively using ML.",
    problemSolved: "The system takes unstructured PDF resumes, extracts the raw text using NLP, and applies machine learning to score and rank candidates against a specific job description.",
    biggestChallenge: "Handling wildly different PDF formats and extracting clean text without losing structure was surprisingly difficult. Real-world data is extremely messy.",
    learnings: "Working with NLP libraries taught me how crucial data cleaning is before feeding it to a model. I also learned Flask to create a web interface so non-technical users could actually use the tool.",
    features: [
      "Web interface for resume upload and processing",
      "Automated text extraction from PDF resumes",
      "NLP-based skill extraction and matching",
      "Candidate ranking against job descriptions",
      "Result generation and visualization"
    ],
    tools: ["Python", "Machine Learning", "NLP", "Flask", "Pandas"],
    github: "https://github.com/jithu748",
    demo: "https://resume-screening-14.onrender.com"
  },
  {
    id: "ipl",
    title: "IPL Data Analysis Project",
    blurb: "Explored multi-season IPL match & delivery data to find which teams and players perform consistently.",
    image: "./assets/project-ipl.png",
    whyBuilt: "I'm a huge cricket fan and wanted to see if the data matched my intuition about which players are actually clutch under pressure, rather than just looking at total runs.",
    problemSolved: "Raw IPL CSV data is massive. It tells you what happened every ball, but gives no picture of performance trends. I cleaned and merged these datasets to compute win rates, strike rates, and bowling economies.",
    biggestChallenge: "Writing efficient pandas groupby aggregations. Doing this inefficiently crashed my Jupyter notebook early on.",
    learnings: "The hardest part of data analysis isn't writing the code — it's deciding which question to ask. A clean chart title matters more than a complex chart type.",
    features: [
      "Top 10 run scorers ranked by total runs (horizontal bar chart)",
      "Team win distribution across all IPL seasons",
      "Toss decision vs match result correlation heatmap",
      "Season-by-season performance comparison",
      "Bowling economy and wicket analysis by player"
    ],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    github: "https://github.com/jithu748"
  },
  {
    id: "retail",
    title: "Retail Analytics Dashboard",
    blurb: "Cleaned and visualized a retail sales dataset to show monthly trends, top categories, and regional breakdowns in a multi-panel dashboard.",
    image: "./assets/project-retail.png",
    whyBuilt: "I wanted to experience what a real business analyst does day-to-day, taking raw transaction logs and turning them into actionable business intelligence.",
    problemSolved: "A raw retail transaction dataset has no clear story. I used Pandas to clean dates and handle missing values, then built interactive Power BI slicers to filter revenue by region and product category.",
    biggestChallenge: "Data cleaning was 60% of the work. Dealing with inconsistent date formats and null values across thousands of rows took a lot of patience.",
    learnings: "Chart titles and axis labels are not optional. A technically correct chart with no context is useless to a non-technical stakeholder.",
    features: [
      "Monthly revenue trend line chart with seasonal markers",
      "Top product category performance bar chart",
      "Regional sales distribution breakdown",
      "Power BI slicers for interactive date and category filtering",
      "Year-over-year comparison panel"
    ],
    tools: ["Python", "Pandas", "Power BI", "Excel", "Matplotlib"],
    github: "https://github.com/jithu748"
  },
  {
    id: "airline",
    title: "Airline Delay Analysis",
    blurb: "Analyzed US airline delay data across carriers, airports, and time periods to identify which routes delay most and why.",
    image: "./assets/project-airline.png",
    whyBuilt: "I was curious why my flights kept getting delayed and wanted to analyze the US DOT dataset to see if certain carriers or times of day were statistically worse.",
    problemSolved: "The dataset had hundreds of thousands of rows. I processed it in chunks to avoid memory issues, and built heatmaps to visualize delay patterns by day-of-week and hour-of-day.",
    biggestChallenge: "Memory management. Loading the full file at once crashed my environment, so I learned to use chunksize in Pandas.",
    learnings: "Heatmaps are significantly better for time-based patterns compared to line charts. Choosing the right visualization is just as important as the analysis itself.",
    features: [
      "Carrier-level average delay comparison",
      "Delay cause breakdown (carrier vs weather vs NAS)",
      "Heatmap of delays by hour-of-day and day-of-week",
      "Departure time scatter plot showing delay concentration",
      "Airport-level filtering and aggregation"
    ],
    tools: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
    github: "https://github.com/jithu748"
  },
  {
    id: "jarvis",
    title: "Jarvis Virtual Assistant",
    blurb: "A voice-controlled Python desktop assistant built to understand how speech recognition and TTS pipelines work from the ground up.",
    image: "./assets/project-jarvis.png",
    whyBuilt: "I used Siri and Google Assistant every day but wanted to build my own to understand how audio becomes text, and how text triggers actions.",
    problemSolved: "Built a Python program that captures microphone input, transcribes it via Google Speech API, matches commands against a dictionary of handlers, and responds via text-to-speech.",
    biggestChallenge: "Microphone sensitivity and ambient noise caused the most bugs. Speech recognition behaves very differently depending on background noise.",
    learnings: "Structuring the command dispatcher as a dictionary of functions made the code maintainable, compared to writing a massive if-elif chain. I also learned how to handle long-running background loops in Python.",
    features: [
      "Voice command capture via microphone",
      "Google Speech-to-Text for transcription",
      "Text-to-speech responses using pyttsx3",
      "Wikipedia summary lookup by voice",
      "YouTube music playback using pywhatkit",
      "Web browser automation for quick searches"
    ],
    tools: ["Python", "SpeechRecognition", "pyttsx3", "Wikipedia API", "datetime"],
    github: "https://github.com/jithu748"
  }
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  const isArchivePage = window.location.pathname.includes("projects.html");
  const projectsToShow = isArchivePage ? PROJECTS_LIST : PROJECTS_LIST.slice(0, 4);
  
  let html = "";
  projectsToShow.forEach((proj, index) => {
    // Add staggered animation delay
    const delay = index * 0.1;
    const pId = proj.id || `unknown-${index}`;
    const pTitle = proj.title || 'Untitled Project';
    const pBlurb = proj.blurb || 'No description available.';
    const pImage = proj.image || './assets/profile-pic.png';
    const pGithub = proj.github || '#';

    html += `
      <div class="proj-showcase-card reveal active" id="card-${pId}" role="listitem" style="transition-delay: ${delay}s;">
        <div class="proj-card-img-wrap">
          <img src="${pImage}" alt="${pTitle}" class="proj-card-img" loading="lazy" />
          <div class="proj-card-overlay"></div>
        </div>
        <div class="proj-card-body">
          <h3 class="proj-card-title">${pTitle}</h3>
          <p class="proj-card-blurb">${pBlurb}</p>
          <div class="proj-card-actions">
            <button class="btn-proj-details" onclick="openProjectModal('${pId}')" aria-label="View details of ${pTitle}">
              View Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <a href="${pGithub}" target="_blank" rel="noopener noreferrer" class="btn-proj-gh" aria-label="GitHub repository">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            ${proj.demo ? `
            <a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="btn-proj-gh" aria-label="Live Demo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>` : ''}
          </div>
        </div>
      </div>
    `;
  });
  
  grid.innerHTML = html;
}

function openProjectModal(id) {
  const proj = PROJECTS_LIST.find(p => p.id === id);
  if (!proj) return;

  const content = document.getElementById("modal-project-content");
  if (!content) return;

  const safeFeatures = proj.features || [];
  const safeTools = proj.tools || [];
  const featuresHTML = safeFeatures.map(f => `<li>${f}</li>`).join("");
  const toolsHTML = safeTools.map(t => `<span class="tag">${t}</span>`).join("");

  const pTitle = proj.title || 'Untitled Project';
  const pImage = proj.image || './assets/profile-pic.png';
  const pWhyBuilt = proj.whyBuilt || 'Details coming soon.';
  const pProblemSolved = proj.problemSolved || 'Details coming soon.';
  const pBiggestChallenge = proj.biggestChallenge || 'Details coming soon.';
  const pLearnings = proj.learnings || 'Details coming soon.';
  const pGithub = proj.github || '#';

  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">${pTitle}</h3>
    </div>
    
    <div class="modal-image-wrap">
      <img src="${pImage}" alt="${pTitle} project screenshot" class="modal-img" />
    </div>
    
    <div class="modal-body-grid">
      <div class="modal-main-col">
        <div class="modal-sec">
          <h4 class="modal-sec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Why I Built This
          </h4>
          <p class="modal-sec-text">${pWhyBuilt}</p>
        </div>
        
        <div class="modal-sec">
          <h4 class="modal-sec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            What Problem I Solved
          </h4>
          <p class="modal-sec-text">${pProblemSolved}</p>
        </div>
        
        <div class="modal-sec">
          <h4 class="modal-sec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            Biggest Challenge
          </h4>
          <p class="modal-sec-text">${pBiggestChallenge}</p>
        </div>
        
        <div class="modal-sec">
          <h4 class="modal-sec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.59-5.59A2 2 0 1 1 19 12H2"></path></svg>
            What I Learned
          </h4>
          <p class="modal-sec-text">${pLearnings}</p>
        </div>
      </div>
      
      <div class="modal-side-col">
        <div class="modal-sec">
          <h4 class="modal-sec-title">Technologies Used</h4>
          <div class="modal-tag-group">
            ${toolsHTML}
          </div>
        </div>
        
        <div class="modal-sec">
          <h4 class="modal-sec-title">Key Features</h4>
          <ul class="modal-features-list">
            ${featuresHTML}
          </ul>
        </div>
        
        <div class="modal-actions">
          <a href="${pGithub}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-gh" id="modal-gh-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub Repository
          </a>
          ${proj.demo ? `
          <a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-gh" id="modal-demo-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            Live Demo
          </a>` : ''}
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById("project-modal");
  modal.classList.add("active");
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", handleEscapeKey);
}

function closeProjectModalOnOverlay(e) {
  if (e.target.id === "project-modal") {
    closeProjectModal();
  }
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeProjectModal();
  }
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  typed();
  initNav();
  initScrollSpy();
  initReveal();
  initSkillBars();
  initA11y();
  initAmbient();
});