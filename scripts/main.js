const siteNav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#nav-menu');

if (siteNav) {
  const toggleScrolledClass = () => {
    siteNav.classList.toggle('scrolled', window.scrollY > 8);
  };

  toggleScrolledClass();
  window.addEventListener('scroll', toggleScrolledClass, { passive: true });
}

if (menuToggle && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

const sections = document.querySelectorAll('main section');

if (sections.length > 0) {
  sections.forEach((section) => {
    section.classList.add('reveal-section');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  } else {
    sections.forEach((section) => {
      section.classList.add('fade-in-up');
    });
  }
}
