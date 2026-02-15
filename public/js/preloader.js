'use strict'

// Hide preloader when page is fully loaded
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader')
  if (preloader) {
    setTimeout(function() {
      preloader.classList.add('hidden')
      // Remove from DOM after animation
      setTimeout(function() {
        preloader.remove()
      }, 500)
    }, 300) // Small delay for better UX
  }
})

// Show preloader when navigating (optional)
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a:not([target="_blank"])')
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't show preloader for anchor links or external links
      const href = this.getAttribute('href')
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        showPreloader()
      }
    })
  })
})

// Function to show preloader
function showPreloader() {
  let preloader = document.getElementById('preloader')
  if (!preloader) {
    preloader = document.createElement('div')
    preloader.id = 'preloader'
    preloader.className = 'preloader'
    preloader.innerHTML = `
      <div class="preloader-content">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    `
    document.body.appendChild(preloader)
  }
  preloader.classList.remove('hidden')
}

// Make function globally available
window.showPreloader = showPreloader