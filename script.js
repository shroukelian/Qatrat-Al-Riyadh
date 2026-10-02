/* =========================================================
   QATRA AL RIYADH - INTERACTIONS
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");

  // Hide loading screen after page load
  const hidePreloader = () => window.setTimeout(() => preloader?.classList.add("hidden"), 450);
  if (document.readyState === "complete") hidePreloader();
  else window.addEventListener("load", hidePreloader, { once: true });
  window.setTimeout(hidePreloader, 1800);

  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const closeMenu = () => {
    navLinks?.classList.remove("open");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("open");
    menuToggle.classList.toggle("active", Boolean(isOpen));
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    document.body.classList.toggle("menu-open", Boolean(isOpen));
  });

  navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", event => {
    if (navLinks?.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle?.contains(event.target)) closeMenu();
  });

  // Scroll effects
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("scrolled", y > 20);
    backToTop?.classList.toggle("visible", y > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Reveal animations when sections enter viewport
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Keep only one FAQ open at a time
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        document.querySelectorAll(".faq-item").forEach(other => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
});
