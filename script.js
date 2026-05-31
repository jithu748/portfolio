/* =============================================
   JITENDRA BABU - PORTFOLIO JAVASCRIPT
   Modern interactions: typed effect, scroll
   reveal, particle system, counter animation,
   sticky nav, mobile menu, contact form
   ============================================= */

"use strict";

// =============================================
// 1. TYPED / ROTATING TAGLINE
// =============================================

const typedPhrases = [
  "intelligent software",
  "AI-powered tools",
  "data-driven solutions",
  "clean web experiences",
  "ML applications",
];

let typedIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedTimeout;

function typeEffect() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const currentPhrase = typedPhrases[typedIndex];

  if (!isDeleting) {
    el.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      // Pause at full word
      typedTimeout = setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 2000);
      return;
    }
  } else {
    el.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      typedIndex = (typedIndex + 1) % typedPhrases.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  typedTimeout = setTimeout(typeEffect, speed);
}

// =============================================
// 2. PARTICLE SYSTEM (Hero Background)
// =============================================

function createParticles() {
  const container = document.getElementById("hero-particles");
  if (!container) return;

  const count = 25;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 15 + 10;
    const opacity = Math.random() * 0.5 + 0.1;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      opacity: ${opacity};
    `;

    container.appendChild(p);
  }
}

// =============================================
// 3. STICKY NAV WITH GLASSMORPHISM
// =============================================

function initStickyNav() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // Run once on load
}

// =============================================
// 4. MOBILE MENU TOGGLE
// =============================================

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const btn = document.getElementById("hamburger-btn");
  if (!menu || !btn) return;

  const isOpen = menu.classList.toggle("open");
  btn.classList.toggle("open", isOpen);
  btn.setAttribute("aria-expanded", isOpen.toString());
  menu.setAttribute("aria-hidden", (!isOpen).toString());
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const nav = document.getElementById("main-nav");
  const menu = document.getElementById("mobile-menu");
  const btn = document.getElementById("hamburger-btn");
  if (!nav || !menu || !btn) return;

  if (!nav.contains(e.target) && menu.classList.contains("open")) {
    menu.classList.remove("open");
    btn.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }
});

// =============================================
// 5. SCROLL REVEAL (IntersectionObserver)
// =============================================

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Once revealed, stop observing (performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((el, index) => {
    // Stagger delay for grouped items
    el.style.transitionDelay = `${(index % 4) * 80}ms`;
    observer.observe(el);
  });
}

// =============================================
// 6. COUNTER ANIMATION (Stats Section)
// =============================================

function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const startVal = 0;

  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * ease);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// =============================================
// 7. ACTIVE NAV LINK (Scroll Spy)
// =============================================

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.style.color = "";
            if (link.getAttribute("href") === `#${id}`) {
              link.style.color = "var(--accent-light)";
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}

// =============================================
// 8. CONTACT FORM HANDLER
// =============================================

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const btn = document.getElementById("contact-submit-btn");
  const successMsg = document.getElementById("form-success-msg");

  // Visual feedback
  btn.textContent = "Sending...";
  btn.disabled = true;

  // Simulate send (replace with actual EmailJS or Formspree integration)
  setTimeout(() => {
    form.reset();
    btn.innerHTML = `✅ Sent!`;
    btn.style.background = "linear-gradient(135deg, #4ade80, #22c55e)";

    if (successMsg) {
      successMsg.hidden = false;
      successMsg.textContent = "✅ Thanks! I'll get back to you within 24 hours.";
    }

    setTimeout(() => {
      btn.innerHTML = `Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      btn.style.background = "";
      btn.disabled = false;
      if (successMsg) successMsg.hidden = true;
    }, 4000);
  }, 1200);
}

// =============================================
// 9. SMOOTH SKILL PILL INTERACTION
// =============================================

function initSkillPills() {
  document.querySelectorAll(".skill-pill").forEach((pill) => {
    pill.addEventListener("mouseenter", () => {
      pill.style.transform = "scale(1.05) translateY(-2px)";
    });
    pill.addEventListener("mouseleave", () => {
      pill.style.transform = "";
    });
  });
}

// =============================================
// 10. KEYBOARD ACCESSIBILITY
// =============================================

function initKeyboardNav() {
  // Allow Enter key on hamburger button
  const hamburger = document.getElementById("hamburger-btn");
  if (hamburger) {
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMobileMenu();
      }
    });
  }
}

// =============================================
// INIT ALL ON DOM READY
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  typeEffect();
  initStickyNav();
  initScrollReveal();
  initCounters();
  initScrollSpy();
  initSkillPills();
  initKeyboardNav();
});