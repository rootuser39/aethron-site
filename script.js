/* ============================================
   AETHRON - JARVIS Console Edition
   Single canvas background + all interactive features
   ============================================ */

// ============================================
// CONFIGURATION & GLOBALS
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mouse tracking with lerp for smooth parallax
let mouse = { x: 0, y: 0 };
let targetMouse = { x: 0, y: 0 };
const mouseLerpSpeed = 0.08;
let lastMouseUpdate = 0;

// Animation state
let animationId = null;
let isAnimating = false;

// ============================================
// CANVAS ENGINE - SINGLE MODE
// ============================================

class CanvasEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error('Canvas element not found');
      return;
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    
    // Particles for star-dust effect (capped at 90)
    this.particles = [];
    this.maxParticles = 90;
    
    // Grid configuration
    this.gridSize = 100;
    
    this.resize();
    this.initParticles();
  }
  
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  
  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }
  
  render(mouseX, mouseY) {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw faint grid
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    this.ctx.lineWidth = 1;
    
    for (let x = 0; x < this.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    
    for (let y = 0; y < this.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
    
    // Update and draw particles
    this.particles.forEach(p => {
      // Move particles
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;
      
      // Draw particle
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    // Draw connections near mouse (constellation effect)
    const mouseRadius = 150;
    const nearParticles = this.particles.filter(p => {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      return Math.sqrt(dx * dx + dy * dy) < mouseRadius;
    });
    
    // Draw lines between nearby particles (limit to avoid performance hit)
    for (let i = 0; i < nearParticles.length && i < 10; i++) {
      for (let j = i + 1; j < nearParticles.length && j < 10; j++) {
        const p1 = nearParticles[i];
        const p2 = nearParticles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          const opacity = (1 - dist / 100) * 0.15;
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  renderStaticFrame() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw static grid
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    this.ctx.lineWidth = 1;
    
    for (let x = 0; x < this.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    
    for (let y = 0; y < this.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
    
    // Draw particles in static positions
    this.particles.forEach(p => {
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.5})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}

// ============================================
// MOUSE TRACKING
// ============================================

function setupMouseTracking() {
  // Throttled mouse move handler
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMouseUpdate > 16) { // ~60fps
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      lastMouseUpdate = now;
    }
  });
  
  // Mobile: device orientation for subtle parallax
  if (window.DeviceOrientationEvent && /Mobi|Android/i.test(navigator.userAgent)) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        targetMouse.x = (e.gamma / 90) * width * 0.5 + width * 0.5;
        targetMouse.y = (e.beta / 90) * height * 0.5 + height * 0.5;
      }
    });
  }
}

// ============================================
// ANIMATION LOOP
// ============================================

let engine = null;

function animate() {
  if (!isAnimating) return;
  
  // Lerp mouse position for smooth motion
  mouse.x += (targetMouse.x - mouse.x) * mouseLerpSpeed;
  mouse.y += (targetMouse.y - mouse.y) * mouseLerpSpeed;
  
  // Render current mode
  if (engine) {
    engine.render(mouse.x, mouse.y);
  }
  
  animationId = requestAnimationFrame(animate);
}

// ============================================
// NAVBAR & SCROLL BEHAVIOR
// ============================================

function setupNavigation() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section, .hero');
  
  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });
  
  // Smooth scroll to sections
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    });
  });
  
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
        const linkId = href.substring(1);
        if (linkId === currentSection) {
          link.classList.add('active');
        }
      }
    });
  }
  
  // Set initial active link
  updateActiveNavLink();
}

// ============================================
// INTERSECTION OBSERVER - Section Reveal
// ============================================

function setupSectionReveal() {
  if (prefersReducedMotion) {
    // Make all sections visible immediately
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('visible');
    });
    return;
  }
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });
}

// ============================================
// AGENT PANEL - JARVIS Chat Interface
// ============================================

function setupAgentPanel() {
  const agentInput = document.getElementById('agent-input');
  const agentSend = document.getElementById('agent-send');
  const agentMessages = document.getElementById('agent-messages');
  const commandChips = document.querySelectorAll('.command-chip');
  
  if (!agentInput || !agentSend || !agentMessages) return;
  
  function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = isUser ? 'agent-message user-message' : 'agent-message system-message';
    msg.textContent = text;
    agentMessages.appendChild(msg);
    agentMessages.scrollTop = agentMessages.scrollHeight;
  }
  
  function handleCommand(command) {
    const cmd = command.trim().toLowerCase();
    
    addMessage(command, true);
    
    setTimeout(() => {
      switch(cmd) {
        case '/about':
          addMessage('About: AI Infrastructure & Network Systems Engineer specializing in GPU cluster networking, observability, and cost optimization. CCNP Enterprise + NVIDIA AI Infrastructure certified.');
          setTimeout(() => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 500);
          break;
        case '/projects':
          addMessage('Projects: 6 major deliverables including AI traffic optimization, GPU observability, edge inference, security detection, failure injection, and cost modeling.');
          setTimeout(() => {
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 500);
          break;
        case '/timeline':
          addMessage('Timeline: Detailed chronological view available. Redirecting...');
          setTimeout(() => {
            window.location.href = 'timeline.html';
          }, 800);
          break;
        case '/services':
          addMessage('Agentic Services: Network Automation, AI Infrastructure Observability, Security & Threat Simulation, Reliability Engineering. See Agent section for details.');
          setTimeout(() => {
            const agentSection = document.querySelector('#agent');
            if (agentSection) {
              agentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 500);
          break;
        case '/contact':
          addMessage('Contact: GitHub, LinkedIn, Email links available in Contact section.');
          setTimeout(() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 500);
          break;
        default:
          addMessage('Agent core offline (API not connected). Available commands: /about, /projects, /timeline, /services, /contact');
      }
    }, 300);
    
    agentInput.value = '';
  }
  
  agentSend.addEventListener('click', () => {
    const value = agentInput.value.trim();
    if (value) {
      handleCommand(value);
    }
  });
  
  agentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const value = agentInput.value.trim();
      if (value) {
        handleCommand(value);
      }
    }
  });
  
  commandChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const command = chip.dataset.command;
      if (command) {
        agentInput.value = command;
        handleCommand(command);
      }
    });
  });
  
  // Initial greeting
  setTimeout(() => {
    addMessage('System online. Agent interface ready. Use quick commands or type /help for available operations.');
  }, 500);
}

// ============================================
// TIMELINE PAGE FEATURES
// ============================================

function setupTimelineFeatures() {
  // Only run on timeline page
  if (!document.querySelector('.timeline-page')) return;
  
  const searchInput = document.getElementById('timeline-search');
  const expandAllBtn = document.getElementById('expand-all');
  const collapseAllBtn = document.getElementById('collapse-all');
  const focusModeBtn = document.getElementById('focus-mode');
  const systemLog = document.getElementById('system-log');
  const timelineItems = document.querySelectorAll('.month-item');
  const yearButtons = document.querySelectorAll('.year-jump-btn');
  
  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      timelineItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
      logSystem(`Search: "${e.target.value}"`);
    });
  }
  
  // Expand/Collapse all
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      timelineItems.forEach(item => item.classList.add('open'));
      logSystem('Expanded all timeline entries');
    });
  }
  
  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      timelineItems.forEach(item => item.classList.remove('open'));
      logSystem('Collapsed all timeline entries');
    });
  }
  
  // Focus mode toggle
  let focusModeActive = false;
  if (focusModeBtn) {
    focusModeBtn.addEventListener('click', () => {
      focusModeActive = !focusModeActive;
      document.body.classList.toggle('focus-mode', focusModeActive);
      focusModeBtn.textContent = focusModeActive ? 'Exit Focus Mode' : 'Focus Mode';
      focusModeBtn.classList.toggle('active', focusModeActive);
      logSystem(focusModeActive ? 'Focus mode enabled' : 'Focus mode disabled');
    });
  }
  
  // Year jump buttons
  yearButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const year = btn.dataset.year;
      const yearSection = document.querySelector(`[data-year="${year}"]`);
      if (yearSection) {
        yearSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        logSystem(`Jumped to year ${year}`);
      }
    });
  });
  
  // Timeline item toggle with logging
  timelineItems.forEach(item => {
    const header = item.querySelector('.month-header');
    if (header) {
      header.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        item.classList.toggle('open');
        const title = item.querySelector('.month-title')?.textContent || 'Entry';
        logSystem(wasOpen ? `Collapsed: ${title}` : `Expanded: ${title}`);
      });
    }
  });
  
  // Keyboard accessibility for timeline items
  timelineItems.forEach(item => {
    const header = item.querySelector('.month-header');
    if (header) {
      header.setAttribute('tabindex', '0');
      header.setAttribute('role', 'button');
      header.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    }
  });
  
  function logSystem(message) {
    if (!systemLog) return;
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    const timestamp = new Date().toLocaleTimeString();
    entry.textContent = `[${timestamp}] ${message}`;
    systemLog.appendChild(entry);
    systemLog.scrollTop = systemLog.scrollHeight;
    
    // Keep only last 20 logs
    while (systemLog.children.length > 20) {
      systemLog.removeChild(systemLog.firstChild);
    }
  }
  
  // Initial log
  logSystem('Timeline console initialized');
}

// ============================================
// RESIZE HANDLING
// ============================================

function setupResizeHandler() {
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (engine) {
        engine.resize();
        if (prefersReducedMotion) {
          engine.renderStaticFrame();
        }
      }
    }, 150);
  });
}

// ============================================
// VISIBILITY API - Performance Optimization
// ============================================

function setupVisibilityHandler() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    } else {
      if (!prefersReducedMotion) {
        isAnimating = true;
        animate();
      }
    }
  });
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
  console.log('🎮 AETHRON JARVIS Console - Initializing...');
  
  // Initialize canvas engine
  const canvasEl = document.getElementById('canvas-background');
  if (canvasEl) {
    engine = new CanvasEngine('canvas-background');
    
    if (engine && engine.canvas) {
      // Setup all event handlers
      setupMouseTracking();
      setupResizeHandler();
      setupVisibilityHandler();
      
      // Initialize mouse position to center
      mouse.x = targetMouse.x = window.innerWidth / 2;
      mouse.y = targetMouse.y = window.innerHeight / 2;
      
      // Start animation or render static frame
      if (prefersReducedMotion) {
        console.log('⚡ Reduced motion detected - rendering static frame');
        engine.renderStaticFrame();
      } else {
        console.log('🚀 Starting animation loop');
        isAnimating = true;
        animate();
      }
    }
  }
  
  // Setup navigation
  setupNavigation();
  setupSectionReveal();
  
  // Setup agent panel (index page only)
  setupAgentPanel();
  
  // Setup timeline features (timeline page only)
  setupTimelineFeatures();
  
  console.log(`Reduced Motion: ${prefersReducedMotion}`);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
