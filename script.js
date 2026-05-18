// GitHub Actions Handbook — minimal interactivity

(function () {
  "use strict";

  // Smooth scroll on nav clicks
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", targetId);
    });
  });

  // Highlight nav as you scroll
  const topics = document.querySelectorAll(".topic, .hero");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (!id) return;
          navLinks.forEach((l) => l.classList.remove("is-active"));
          const active = document.querySelector(`.nav__link[href="#${id}"]`);
          if (active) active.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  topics.forEach((t) => observer.observe(t));
})();
