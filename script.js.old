/* ============================================
   AETHRON - Emperor Conquest Console
   Complete rewrite from scratch
   Tri-Mode Canvas Background System
   ============================================ */

// ============================================
// CONFIGURATION & GLOBALS
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Current mode: 'compute', 'fabric', or 'defense'
let currentMode = 'compute';

// Mouse tracking with lerp for smooth parallax
let mouse = { x: 0, y: 0 };
let targetMouse = { x: 0, y: 0 };
const mouseLerpSpeed = 0.08;
let lastMouseUpdate = 0;

// Animation state
let animationId = null;
let isAnimating = false;

// ============================================
// CANVAS ENGINE CLASS
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
    
    // Mode-specific renderers
    this.modes = {
      compute: new ComputeMode(this.ctx),
      fabric: new FabricMode(this.ctx),
      defense: new DefenseMode(this.ctx)
    };
    
    this.resize();
  }
  
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    // Notify all modes of resize
    Object.values(this.modes).forEach(mode => {
      if (mode.onResize) mode.onResize(this.width, this.height);
    });
  }
  
  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Render current mode
    const mode = this.modes[currentMode];
    if (mode && mode.render) {
      mode.render(this.width, this.height, mouse);
    }
  }
  
  renderStaticFrame() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const mode = this.modes[currentMode];
    if (mode && mode.renderStatic) {
      mode.renderStatic(this.width, this.height);
    }
  }
}

// ============================================
// COMPUTE MODE - Block grid + heat drift + dust particles
// ============================================

class ComputeMode {
  constructor(ctx) {
    this.ctx = ctx;
    this.gridSize = 80;
    this.blocks = [];
    this.particles = [];
    this.heatTime = 0;
    this.init();
  }
  
  init() {
    // Initialize dust particles (sparse)
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }
  
  onResize(width, height) {
    // Reinit blocks on resize
    this.blocks = [];
    const cols = Math.ceil(width / this.gridSize);
    const rows = Math.ceil(height / this.gridSize);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.blocks.push({
          x: i * this.gridSize,
          y: j * this.gridSize,
          heat: Math.random()
        });
      }
    }
  }
  
  // Simple value noise approximation for heat drift
  noise(x, y, t) {
    return Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t * 0.7) * 0.5 + 0.5;
  }
  
  render(width, height, mouse) {
    this.heatTime += 0.003;
    
    // Draw block grid with heat effect
    this.blocks.forEach(block => {
      const heat = this.noise(block.x, block.y, this.heatTime);
      const opacity = 0.02 + heat * 0.03;
      
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(block.x, block.y, this.gridSize, this.gridSize);
      
      // Subtle heat glow in center
      if (heat > 0.7) {
        this.ctx.fillStyle = `rgba(255, 255, 255, ${(heat - 0.7) * 0.02})`;
        this.ctx.fillRect(block.x + 2, block.y + 2, this.gridSize - 4, this.gridSize - 4);
      }
    });
    
    // Update and draw dust particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
  
  renderStatic(width, height) {
    // Static frame: just grid, no animation
    const cols = Math.ceil(width / this.gridSize);
    const rows = Math.ceil(height / this.gridSize);
    
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    this.ctx.lineWidth = 1;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.ctx.strokeRect(i * this.gridSize, j * this.gridSize, this.gridSize, this.gridSize);
      }
    }
  }
}

// ============================================
// FABRIC MODE - Node graph + packet pulses
// ============================================

class FabricMode {
  constructor(ctx) {
    this.ctx = ctx;
    this.nodes = [];
    this.edges = [];
    this.packets = [];
    this.init();
  }
  
  init() {
    // Create network nodes (limit to ~20-30 for performance)
    const nodeCount = 25;
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        baseX: 0,
        baseY: 0,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 2 + 1
      });
    }
    
    // Store base positions
    this.nodes.forEach(node => {
      node.baseX = node.x;
      node.baseY = node.y;
    });
    
    // Create edges between nearby nodes
    this.updateEdges();
  }
  
  onResize(width, height) {
    // Reposition nodes proportionally
    this.nodes.forEach(node => {
      node.x = (node.baseX / window.innerWidth) * width;
      node.y = (node.baseY / window.innerHeight) * height;
      node.baseX = node.x;
      node.baseY = node.y;
    });
    this.updateEdges();
  }
  
  updateEdges() {
    this.edges = [];
    const maxDistance = 200;
    
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < maxDistance) {
          this.edges.push({
            from: i,
            to: j,
            opacity: (1 - dist / maxDistance) * 0.15
          });
        }
      }
    }
  }
  
  render(width, height, mouse) {
    // Update node positions
    this.nodes.forEach(node => {
      node.baseX += node.vx;
      node.baseY += node.vy;
      
      // Bounce off edges
      if (node.baseX < 0 || node.baseX > width) node.vx *= -1;
      if (node.baseY < 0 || node.baseY > height) node.vy *= -1;
      
      // Apply subtle mouse influence
      const dx = mouse.x - node.baseX;
      const dy = mouse.y - node.baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 150) {
        const influence = (150 - dist) / 150 * 0.3;
        node.x = node.baseX + (dx / dist) * influence * 20;
        node.y = node.baseY + (dy / dist) * influence * 20;
      } else {
        node.x = node.baseX;
        node.y = node.baseY;
      }
    });
    
    // Occasionally spawn packets
    if (Math.random() < 0.02 && this.packets.length < 10) {
      const edge = this.edges[Math.floor(Math.random() * this.edges.length)];
      if (edge) {
        this.packets.push({
          edge: edge,
          progress: 0,
          speed: 0.01 + Math.random() * 0.02
        });
      }
    }
    
    // Draw edges
    this.edges.forEach(edge => {
      const from = this.nodes[edge.from];
      const to = this.nodes[edge.to];
      
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${edge.opacity})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.stroke();
    });
    
    // Draw nodes
    this.nodes.forEach(node => {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    // Update and draw packets
    this.packets = this.packets.filter(packet => {
      packet.progress += packet.speed;
      
      if (packet.progress >= 1) return false;
      
      const from = this.nodes[packet.edge.from];
      const to = this.nodes[packet.edge.to];
      const x = from.x + (to.x - from.x) * packet.progress;
      const y = from.y + (to.y - from.y) * packet.progress;
      
      // Draw packet
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.beginPath();
      this.ctx.arc(x, y, 2, 0, Math.PI * 2);
      this.ctx.fill();
      
      return true;
    });
  }
  
  renderStatic(width, height) {
    // Static frame: nodes and edges only, no movement
    this.updateEdges();
    
    this.edges.forEach(edge => {
      const from = this.nodes[edge.from];
      const to = this.nodes[edge.to];
      
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${edge.opacity * 0.5})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.stroke();
    });
    
    this.nodes.forEach(node => {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}

// ============================================
// DEFENSE MODE - Radar rings + threat pings
// ============================================

class DefenseMode {
  constructor(ctx) {
    this.ctx = ctx;
    this.rings = [];
    this.threats = [];
    this.ringTime = 0;
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;
    this.init();
  }
  
  init() {
    // Initialize radar rings
    for (let i = 0; i < 4; i++) {
      this.rings.push({
        radius: 100 + i * 150,
        opacity: 0.1 - i * 0.02,
        speed: 0.3 + i * 0.1
      });
    }
  }
  
  onResize(width, height) {
    this.centerX = width / 2;
    this.centerY = height / 2;
  }
  
  render(width, height, mouse) {
    this.ringTime += 0.01;
    
    // Apply mouse parallax to center (subtle)
    const dx = (mouse.x - width / 2) * 0.05;
    const dy = (mouse.y - height / 2) * 0.05;
    const cx = this.centerX + dx;
    const cy = this.centerY + dy;
    
    // Draw radar rings (pulsing)
    this.rings.forEach((ring, i) => {
      const pulse = Math.sin(this.ringTime * ring.speed + i * 0.5) * 0.03;
      const opacity = ring.opacity + pulse;
      
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });
    
    // Occasionally spawn threat pings
    if (Math.random() < 0.015 && this.threats.length < 8) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 300 + 100;
      this.threats.push({
        x: cx + Math.cos(angle) * distance,
        y: cy + Math.sin(angle) * distance,
        radius: 5,
        maxRadius: 40 + Math.random() * 30,
        opacity: 0.4,
        growSpeed: 1.5
      });
    }
    
    // Update and draw threat pings
    this.threats = this.threats.filter(threat => {
      threat.radius += threat.growSpeed;
      threat.opacity -= 0.008;
      
      if (threat.opacity <= 0 || threat.radius > threat.maxRadius) return false;
      
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${threat.opacity})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.arc(threat.x, threat.y, threat.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      
      return true;
    });
    
    // Draw center point
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  renderStatic(width, height) {
    // Static frame: just rings, no pings
    const cx = width / 2;
    const cy = height / 2;
    
    this.rings.forEach(ring => {
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${ring.opacity})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });
    
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// ============================================
// MOUSE & DEVICE ORIENTATION TRACKING
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
    engine.render();
  }
  
  animationId = requestAnimationFrame(animate);
}

// ============================================
// MODE SWITCHING
// ============================================

function setMode(mode) {
  if (['compute', 'fabric', 'defense'].includes(mode)) {
    currentMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    console.log(`Mode switched to: ${mode}`);
  }
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
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
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
  console.log('🎮 Emperor Conquest Console - Initializing...');
  
  // Initialize canvas engine
  engine = new CanvasEngine('canvas-background');
  
  if (!engine || !engine.canvas) {
    console.error('Canvas initialization failed');
    return;
  }
  
  // Setup mode toggle buttons
  document.querySelectorAll('.mode-button').forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.mode);
    });
  });
  
  // Set initial mode
  setMode('compute');
  
  // Setup all event handlers
  setupMouseTracking();
  setupNavigation();
  setupSectionReveal();
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
  
  console.log(`Mode: ${currentMode}`);
  console.log(`Reduced Motion: ${prefersReducedMotion}`);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
