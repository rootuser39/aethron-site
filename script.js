/* ============================================
   AETHRON - Interactive Features
   Particles, smooth scrolling, and animations
   ============================================ */

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// NAVBAR - Scroll behavior and active section highlighting
// ============================================

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section, .hero');

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Smooth scroll to sections when clicking nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 60; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Update active nav link based on current scroll position
function updateActiveNavLink() {
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id') || 'hero';
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1); // Remove #
    if (href === currentSection) {
      link.classList.add('active');
    }
  });
}

// ============================================
// PARTICLE FIELD - Canvas-based background animation
// ============================================

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// Particle system configuration
const particleConfig = {
  count: prefersReducedMotion ? 0 : 40, // Low density for performance
  maxSpeed: 0.3, // Slow drift
  connectionDistance: 150,
  particleSize: 2
};

let particles = [];
let animationId;

// Resize canvas to match window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * particleConfig.maxSpeed;
    this.vy = (Math.random() - 0.5) * particleConfig.maxSpeed;
    this.size = particleConfig.particleSize;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize particles
function initParticles() {
  particles = [];
  for (let i = 0; i < particleConfig.count; i++) {
    particles.push(new Particle());
  }
}

// Draw connections between nearby particles
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < particleConfig.connectionDistance) {
        const opacity = (1 - distance / particleConfig.connectionDistance) * 0.3;
        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

// Animation loop - optimized with requestAnimationFrame
function animateParticles() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw each particle
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  // Draw connections between particles
  drawConnections();

  // Continue animation loop
  animationId = requestAnimationFrame(animateParticles);
}

// Initialize particle system (only if motion is not reduced)
if (!prefersReducedMotion && particleConfig.count > 0) {
  resizeCanvas();
  initParticles();
  animateParticles();

  // Re-initialize on window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}

// ============================================
// INTERSECTION OBSERVER - Section reveal animations
// ============================================

// Only add animations if user hasn't requested reduced motion
if (!prefersReducedMotion) {
  const observerOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing after animation
        // sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections for reveal animation
  const sectionsToAnimate = document.querySelectorAll('section');
  sectionsToAnimate.forEach(section => {
    sectionObserver.observe(section);
  });
} else {
  // If reduced motion is preferred, make all sections visible immediately
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('visible');
  });
}

// ============================================
// CLEANUP - Stop animations when page is hidden
// ============================================

// Pause particle animation when tab is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  } else {
    if (!prefersReducedMotion && particleConfig.count > 0) {
      animateParticles();
    }
  }
});

// ============================================
// INITIALIZATION
// ============================================

// Set initial active nav link on page load
window.addEventListener('load', () => {
  updateActiveNavLink();
});

console.log('🚀 AETHRON site initialized');
console.log(`Particles: ${prefersReducedMotion ? 'Disabled (reduced motion)' : particleConfig.count}`);
