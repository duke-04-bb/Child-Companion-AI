const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navigationLinks = document.querySelectorAll('.nav-links a');
const revealElements = document.querySelectorAll('.reveal');

function toggleMenu() {
  if (!menuToggle || !navLinks) return;
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('is-open', !isOpen);
}

function closeMenu() {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('is-open');
}

function revealOnScroll(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}

if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(revealOnScroll, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
