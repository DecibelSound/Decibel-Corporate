const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 10);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  document.body.classList.toggle('nav-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menu openen');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));


const processLine = document.querySelector('.process-line');
function updateProcessProgress() {
  if (!processLine) return;
  const rect = processLine.getBoundingClientRect();
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  const start = viewport * 0.78;
  const end = viewport * 0.18;
  const raw = (start - rect.top) / (rect.height + start - end);
  const progress = Math.max(0, Math.min(1, raw));
  processLine.style.setProperty('--process-progress', `${progress * 100}%`);
}
updateProcessProgress();
window.addEventListener('scroll', updateProcessProgress, { passive: true });
window.addEventListener('resize', updateProcessProgress);


