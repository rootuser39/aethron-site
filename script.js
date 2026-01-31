/* ============================================
   AETHRON - Interactive Features
   Site-wide canvas, mouse parallax, smooth scrolling
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
    const targetId = link.getAttribute('href');
    
    // Only handle internal links (starting with #)
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
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
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const linkId = href.substring(1); // Remove #
      if (linkId === currentSection) {
        link.classList.add('active');
      }
    }
  });
}

// ============================================
// SITE-WIDE CANVAS BACKGROUND - Particles with mouse parallax
// ============================================

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// Mouse position for parallax (with lerping for smooth motion)
let mouse = { x: 0, y: 0 };
let targetMouse = { x: 0, y: 0 };
let lastMouseUpdate = 0;
const mouseLerpSpeed = 0.05;

// Particle system configuration
const particleConfig = {
  count: prefersReducedMotion ? 0 : 60, // 50-80 particles as spec'd
  maxSpeed: 0.3,
  connectionDistance: 120,
  particleSize: 1.5,
  parallaxStrength: 0.015 // Subtle parallax effect
};

let particles = [];
let animationId;
let isAnimating = false;

// Resize canvas to match window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Debounced resize handler for performance
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resizeCanvas();
    if (!prefersReducedMotion && particleConfig.count > 0) {
      initParticles();
    }
  }, 150);
});

// Throttled mouse move handler for performance
window.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastMouseUpdate > 16) { // ~60fps throttle
    targetMouse.x = e.clientX;
    targetMouse.y = e.clientY;
    lastMouseUpdate = now;
  }
});

// Mobile: device orientation for subtle parallax
if (window.DeviceOrientationEvent && /Mobi|Android/i.test(navigator.userAgent)) {
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma !== null && e.beta !== null) {
      // Map device tilt to mouse position (subtle effect)
      targetMouse.x = (e.gamma / 90) * canvas.width * 0.5 + canvas.width * 0.5;
      targetMouse.y = (e.beta / 90) * canvas.height * 0.5 + canvas.height * 0.5;
    }
  });
}

// Particle class with parallax influence
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = (Math.random() - 0.5) * particleConfig.maxSpeed;
    this.vy = (Math.random() - 0.5) * particleConfig.maxSpeed;
    this.size = particleConfig.particleSize;
  }

  update() {
    // Update base position with drift
    this.baseX += this.vx;
    this.baseY += this.vy;

    // Wrap around edges
    if (this.baseX < 0) this.baseX = canvas.width;
    if (this.baseX > canvas.width) this.baseX = 0;
    if (this.baseY < 0) this.baseY = canvas.height;
    if (this.baseY > canvas.height) this.baseY = 0;

    // Apply parallax based on mouse position
    const dx = mouse.x - canvas.width / 2;
    const dy = mouse.y - canvas.height / 2;
    
    this.x = this.baseX + dx * particleConfig.parallaxStrength;
    this.y = this.baseY + dy * particleConfig.parallaxStrength;
  }

  draw() {
    ctx.fillStyle = 'rgba(52, 211, 153, 0.15)'; // Subtle green
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
        const opacity = (1 - distance / particleConfig.connectionDistance) * 0.1; // Very subtle
        ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`;
        ctx.lineWidth = 0.5;
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
  // Lerp mouse position for smooth motion
  mouse.x += (targetMouse.x - mouse.x) * mouseLerpSpeed;
  mouse.y += (targetMouse.y - mouse.y) * mouseLerpSpeed;

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
  if (isAnimating) {
    animationId = requestAnimationFrame(animateParticles);
  }
}

// Render single static frame for reduced motion
function renderStaticFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.draw();
  });
  drawConnections();
}

// Initialize particle system
if (particleConfig.count > 0) {
  resizeCanvas();
  initParticles();
  
  if (prefersReducedMotion) {
    // Render one static frame
    renderStaticFrame();
  } else {
    // Start animation
    isAnimating = true;
    // Initialize mouse to center
    mouse.x = targetMouse.x = canvas.width / 2;
    mouse.y = targetMouse.y = canvas.height / 2;
    animateParticles();
  }
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
    isAnimating = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  } else {
    if (!prefersReducedMotion && particleConfig.count > 0) {
      isAnimating = true;
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
console.log(`Particles: ${prefersReducedMotion ? 'Static frame (reduced motion)' : particleConfig.count}`);
console.log(`Mouse parallax: ${prefersReducedMotion ? 'Disabled' : 'Enabled'}`);
