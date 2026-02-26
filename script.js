const root = document.documentElement;
root.classList.remove("no-js");
root.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const allInPageLinks = Array.from(document.querySelectorAll('a[href^="#"]:not(.skip-link)'));

function smoothScrollToSection(event) {
  const targetLink = event.currentTarget;
  const targetId = targetLink.getAttribute("href");
  if (!targetId || targetId === "#") return;

  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;

  event.preventDefault();
  const behavior = reduceMotion ? "auto" : "smooth";
  targetElement.scrollIntoView({ behavior, block: "start" });
  history.replaceState(null, "", targetId);
}

allInPageLinks.forEach((link) => {
  link.addEventListener("click", smoothScrollToSection);
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === id) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0.01
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function updateHeaderOnScroll() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

updateHeaderOnScroll();
window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

const copyButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");

async function copyEmail() {
  if (!copyButton || !copyStatus) return;
  const email = copyButton.getAttribute("data-email");
  if (!email) return;

  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email copied.";
  } catch (error) {
    copyStatus.textContent = "Could not copy automatically. Please copy it manually.";
  }
}

if (copyButton && "clipboard" in navigator) {
  copyButton.addEventListener("click", copyEmail);
} else if (copyButton) {
  copyButton.hidden = true;
}
