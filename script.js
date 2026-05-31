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
const PROJECTS_DATA = {
  resume: {
    category: "AI / NLP / Python",
    title: "AI Resume Screening System",
    image: "./assets/project-resume.png",
    problem: "Recruiters spend too much time manually reading resumes to find candidates with the right skills for a job description. A lot of qualified candidates get missed due to human fatigue or simple oversight.",
    solution: "Built an AI-powered resume screening system with a web interface. It allows users to upload resumes, extracts the text using NLP, and applies machine learning concepts to rank candidates against a specific job description.",
    learnings: "Working with NLP libraries taught me how messy real-world text data can be (different PDF formats, weird layouts). Creating a clean web interface with Flask made the machine learning model actually usable for non-technical people.",
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
  ipl: {
    category: "Data Analysis &middot; Python",
    title: "IPL Data Analysis",
    image: "./assets/project-ipl.png",
    problem: "Raw IPL CSV data (matches + deliveries) has hundreds of columns and seasons of records. It tells you <em>what happened</em> in each ball, but gives no picture of performance trends &mdash; who consistently scores, which teams win in pressure chases, how toss decisions affect results.",
    solution: "Loaded both datasets with Pandas, merged on match ID, cleaned null values and duplicate rows. Used <code>groupby</code> and aggregation to compute team win rates, top run-scorers across seasons, and bowling economy by phase. Visualized with Seaborn bar charts, horizontal rankings, and a correlation heatmap.",
    learnings: "The hardest part of data analysis isn't writing the code &mdash; it's deciding <em>which question to ask</em>. <code>groupby</code> with <code>.agg()</code> is where most insight lives. A clean chart title matters more than chart type.",
    features: [
      "Top 10 run scorers ranked by total runs (horizontal bar chart)",
      "Team win distribution across all IPL seasons",
      "Toss decision vs match result correlation heatmap",
      "Season-by-season performance comparison",
      "Bowling economy and wicket analysis by player"
    ],
    tools: ["Python 3", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    github: "https://github.com/jithu748",
    linkedin: "https://www.linkedin.com/in/mudde-jitendra-babu-0b3403358/"
  },
  retail: {
    category: "Analytics &middot; Power BI",
    title: "Retail Analytics Dashboard",
    image: "./assets/project-retail.png",
    problem: "A retail transaction dataset with rows of sales records across product categories, regions, and months. Raw, no clear story. No easy way to see what's selling, where growth is happening, or what seasonal patterns exist without processing it first.",
    solution: "Cleaned data with Pandas &mdash; handled missing values, fixed date parsing, removed duplicates. Aggregated by category, region, and month using <code>resample</code> and <code>groupby</code>. Built multi-panel Matplotlib dashboard first, then moved to Power BI for interactive slicer-based filtering.",
    learnings: "Data cleaning was 60% of the work &mdash; a real surprise. Also learned that chart titles and axis labels are not optional: a technically correct chart with no context is useless to a non-technical viewer. Power BI slicers make dashboards actually usable, not just visual.",
    features: [
      "Monthly revenue trend line chart with seasonal markers",
      "Top product category performance bar chart",
      "Regional sales distribution breakdown",
      "Power BI slicers for interactive date and category filtering",
      "Year-over-year comparison panel"
    ],
    tools: ["Python 3", "Pandas", "Matplotlib", "Power BI", "Excel / CSV", "Jupyter Notebook"],
    github: "https://github.com/jithu748",
    linkedin: "https://www.linkedin.com/in/mudde-jitendra-babu-0b3403358/"
  },
  airline: {
    category: "Data Analysis &middot; Python",
    title: "Airline Delay Analysis",
    image: "./assets/project-airline.png",
    problem: "The US DOT airline delay dataset has hundreds of thousands of rows across multiple carriers, airports, routes, and seasons. It has delay cause breakdowns (carrier, weather, NAS, security) but no summary &mdash; impossible to spot patterns just by scrolling.",
    solution: "Used Pandas with <code>chunksize</code> to read the large CSV without memory issues. Filtered by year, aggregated average delay by carrier and delay type. Built a heatmap of delays by day-of-week and hour-of-day, a stacked bar chart of delay causes, and a scatter plot of departure time vs. delay.",
    learnings: "Reading large CSVs in chunks is essential when RAM is limited &mdash; loading the full file at once crashed the kernel. Learned how much better heatmaps are for time-based patterns compared to line charts. Not all charts suit all questions.",
    features: [
      "Carrier-level average delay comparison (horizontal bar chart)",
      "Delay cause breakdown &mdash; carrier vs weather vs NAS",
      "Heatmap of delays by hour-of-day and day-of-week",
      "Departure time scatter plot showing delay concentration",
      "Airport-level filtering and aggregation"
    ],
    tools: ["Python 3", "Pandas", "NumPy", "Seaborn", "Matplotlib", "Jupyter Notebook"],
    github: "https://github.com/jithu748",
    linkedin: "https://www.linkedin.com/in/mudde-jitendra-babu-0b3403358/"
  },
  jarvis: {
    category: "Automation &middot; Voice AI",
    title: "Jarvis Virtual Assistant",
    image: "./assets/project-jarvis.png",
    problem: "I used Siri and Google Assistant without understanding what was actually happening &mdash; how audio becomes text, how text becomes action, how the response is spoken back. I wanted to build this myself to understand the full pipeline, not just use the API.",
    solution: "Built a Python program that captures microphone input using <code>SpeechRecognition</code>, transcribes it via Google Speech API, matches the text against a dictionary of command handlers, executes the action, and responds via <code>pyttsx3</code> text-to-speech. All running locally on desktop.",
    learnings: "Microphone sensitivity and ambient noise caused the most bugs &mdash; SpeechRecognition behaves very differently across environments. Learned to write long-running Python loops that stay responsive. Structuring the command dispatcher as a dictionary of functions (not a massive if-elif chain) made the code maintainable.",
    features: [
      "Voice command capture via microphone using SpeechRecognition",
      "Google Speech-to-Text for transcription",
      "Text-to-speech responses using pyttsx3 (offline)",
      "Wikipedia summary lookup by voice",
      "YouTube music playback using pywhatkit",
      "Time and date queries, greeting by time of day",
      "Web browser automation for quick searches"
    ],
    tools: ["Python 3", "SpeechRecognition", "pyttsx3", "pywhatkit", "Wikipedia API", "webbrowser", "datetime"],
    github: "https://github.com/jithu748",
    linkedin: "https://www.linkedin.com/in/mudde-jitendra-babu-0b3403358/"
  }
};

function openProjectModal(id) {
  const proj = PROJECTS_DATA[id];
  if (!proj) return;

  const content = document.getElementById("modal-project-content");
  if (!content) return;

  const featuresHTML = proj.features.map(f => `<li>${f}</li>`).join("");
  const toolsHTML = proj.tools.map(t => `<span class="tag">${t}</span>`).join("");

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-cat">${proj.category}</div>
      <h3 class="modal-title">${proj.title}</h3>
    </div>
    
    <div class="modal-image-wrap">
      <img src="${proj.image}" alt="${proj.title} project screenshot" class="modal-img" />
    </div>
    
    <div class="modal-body-grid">
      <div class="modal-main-col">
        <div class="modal-sec">
          <h4 class="modal-sec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Problem Statement
          </h4>
          <p class="modal-sec-text">${proj.problem}</p>
        </div>
        
        <div class="modal-sec">
          <h4 class="modal-sec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Solution
          </h4>
          <p class="modal-sec-text">${proj.solution}</p>
        </div>
        
        <div class="modal-sec">
          <h4 class="modal-sec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.59-5.59A2 2 0 1 1 19 12H2"></path></svg>
            Key Learnings
          </h4>
          <p class="modal-sec-text">${proj.learnings}</p>
        </div>
      </div>
      
      <div class="modal-side-col">
        <div class="modal-sec">
          <h4 class="modal-sec-title">Tools &amp; Tech</h4>
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
          <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-gh" id="modal-gh-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub Repository
          </a>
          ${proj.demo ? `
          <a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-gh" id="modal-demo-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            Live Demo
          </a>` : ''}
          ${proj.linkedin ? `
          <a href="${proj.linkedin}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-li" id="modal-li-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn Post
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
  typed();
  initNav();
  initScrollSpy();
  initReveal();
  initSkillBars();
  initA11y();
  initAmbient();
});