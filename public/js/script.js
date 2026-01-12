// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');

  // Toggle menu open/close
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    nav.classList.toggle('menu-open');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  // Close menu when clicking hamburger
  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking outside (on overlay)
  nav.addEventListener('click', function(e) {
    if (e.target === nav && nav.classList.contains('menu-open')) {
      toggleMenu();
    }
  });

  // Close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Handle window resize - close menu if resizing to desktop
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMenu();
      }
    }, 250);
  });
});