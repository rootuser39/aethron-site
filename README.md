# Rishabh Durugkar - AI Infrastructure & Network Systems Engineer

A premium black/grey personal portfolio site with interactive console interface. Features command palette, system status monitoring, and immersive canvas background. Zero dependencies, pure HTML/CSS/JavaScript.

## ✨ Features

### Interactive Console Experience
- **Strict Black/Grey Palette**: `#050607` background, monochrome UI (no neon colors)
- **HUD Elements**: Corner marks, system activity bar, subtle scanline overlay
- **Console Aesthetics**: Corner brackets on panels, monospace fonts, terminal-style interfaces
- **Radar Sweep Effect**: Animated subtle radar behind command palette panel (disabled in reduced motion)

### Single Interactive Canvas Background
The site features ONE universal interactive background with:
- **Star-dust particles**: 90 particles maximum for performance
- **Faint grid overlay**: Subtle 100px grid
- **Constellation connections**: Lines between particles near mouse (within 150px radius)
- **Mouse parallax**: Smooth lerped tracking with throttling (~60fps)
- **Mobile support**: Device orientation for subtle parallax where available
- **Performance**: Single `requestAnimationFrame` loop, capped primitives, optimized rendering
- **Reduced Motion**: Renders one static frame when `prefers-reduced-motion: reduce` is detected

### Interface Section
Located between Projects and Education sections on index.html:

**Command Palette Panel:**
- System greeting on page load
- Command output area with scrollable history
- Quick command chips: `/about`, `/projects`, `/timeline`, `/certs`, `/contact`
- Input field with Enter-key support
- Scripted local responses (no backend required)
- Smooth scroll to relevant sections after command execution

**System Status Widgets:**
Three capability monitors showing infrastructure domains:
1. **Compute** - Observability, Throughput, Cost metrics
2. **Fabric** - Latency, Routing, QoS metrics
3. **Defense** - Detection, Segmentation, Response metrics

Each widget displays static status labels (not real-time monitoring).

### Timeline Console Features
The timeline.html page includes:

**Command Console Sidebar:**
- Search filter input (live filtering of timeline entries)
- Quick commands:
  - Expand All / Collapse All
  - Focus Mode (dims background + HUD)
- Year jump buttons (2026, 2025, 2024, 2023, 2022, 2021)
- System Log feed (auto-updates with user actions)

**Enhanced Timeline Cards:**
- Collapsible month entries with smooth animations
- Expanded view shows:
  - Context section
  - Deliverables list
  - Evidence links
- Keyboard accessible (Enter/Space to expand)
- Hover highlights
- Fast animations (height/opacity transition)

**Focus Mode:**
- Toggle via button in command console
- Reduces canvas background opacity to 20%
- Hides HUD elements and system bar
- Reduces console sidebar opacity
- Optimized for reading long timeline entries

### Performance & Accessibility
- **Canvas Performance**: ≤90 particles, mouse-reactive connections only, no heavy blur, low alpha
- **Reduced Motion Support**: Static frame rendering, all animations disabled
- **Responsive Design**: Mobile-first, breakpoints at 992px and 768px
- **Keyboard Navigation**: Full keyboard accessibility for interactive elements
- **Semantic HTML**: Proper heading hierarchy, ARIA attributes where needed
- **No External Dependencies**: Zero libraries, frameworks, or build tools

## 🚀 Quick Start

This is a pure static site — no build tools, no dependencies, no frameworks.

```bash
# Option 1: Open directly
open index.html

# Option 2: Local server (recommended)
python -m http.server 8000
# Visit http://localhost:8000

# Option 3: Deploy to GitHub Pages
# Enable Pages in repo settings → select branch
# Your site will be live at https://username.github.io/repo-name/
```

## 🎨 Customization

### Update Your Information
Update personal information in `index.html`:
- Name: Already set to "Rishabh Durugkar"
- GitHub: `https://github.com/rootuser39`
- LinkedIn: Update in contact section
- Email: Update in contact section
- Resume: Add PDF and update download link

### Configure Canvas Background
Edit canvas settings in `script.js`:

```javascript
class CanvasEngine {
  constructor(canvasId) {
    this.maxParticles = 90;  // Star-dust particles (keep ≤90)
    this.gridSize = 100;     // Grid cell size in pixels
  }
}

// Mouse radius for constellation connections
const mouseRadius = 150;  // Pixels
```

### Customize Commands
Edit command responses in `script.js`:

```javascript
function handleCommand(command) {
  const cmd = command.trim().toLowerCase();
  
  switch(cmd) {
    case '/about':
      addOutput('Your custom response here');
      // Navigate to section
      break;
    // Add more custom commands
  }
}
```

### Add Timeline Entries
Edit `timeline.html` to add new entries:

```html
<div class="month-item">
  <div class="month-header">
    <span class="month-title">Your Entry Title</span>
    <span class="month-toggle">▼</span>
  </div>
  <div class="month-content">
    <div class="month-details">
      <div class="detail-section">
        <h4>Context</h4>
        <p>Background information</p>
      </div>
      <div class="detail-section">
        <h4>Deliverables</h4>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
      <div class="detail-section">
        <h4>Evidence</h4>
        <div class="evidence-links">
          <a href="#" class="evidence-link">Link 1</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Adjust Color Palette
Edit CSS custom properties in `styles.css`:

```css
:root {
  --bg-primary: #050607;
  --surface: rgba(12, 13, 15, 0.72);
  --surface-2: rgba(18, 20, 23, 0.62);
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.14);
  --text-primary: #E7E9EE;
  --text-muted: #A8AFBC;
  --highlight: #D7DBE3;
}
```

**Important**: Keep the black/grey Emperor theme; avoid bright colors.

## 💻 How It Works

### Canvas Background Engine
Single mode with optimized rendering:
- **Particles**: Star-dust effect with random velocity, wrap-around boundaries
- **Grid**: Faint lines drawn every 100px (configurable)
- **Connections**: Lines drawn between particles near mouse cursor
- **Mouse Tracking**: Smooth lerp interpolation for fluid parallax
- **Static Mode**: Single frame rendered when reduced motion is preferred

### Command Palette (Frontend Only)
- Local scripted responses for common commands
- Smooth scroll navigation to page sections
- Command history in output area
- Help command shows available operations
- Fallback for unknown commands

### Timeline Console System
**Search Filter:**
- Live text search across all timeline entries
- Case-insensitive matching
- Hides non-matching entries dynamically

**System Log:**
- Auto-updates when user performs actions
- Shows timestamps with actions (expand, search, mode change)
- Keeps last 20 entries (auto-trim)
- Monospace font for console aesthetic

**Focus Mode:**
- JavaScript toggle adds `.focus-mode` class to body
- CSS handles visual changes (background dim, HUD hide)
- Button text changes between "Focus Mode" and "Exit Focus Mode"

### Reduced Motion Support
When `prefers-reduced-motion: reduce` is detected:
- Canvas renders ONE static frame (no animation loop)
- All CSS animations disabled (`animation-duration: 0.01ms`)
- Scroll reveals disabled (sections visible immediately)
- System bar and radar sweep animations stopped
- Mouse parallax disabled

### Performance Optimizations
- Mouse input throttled to ~60fps (16ms intervals)
- Resize debounced (150ms delay)
- Particle count capped at 90
- Connections only calculated near mouse (radius check)
- Animation pauses when tab hidden (Visibility API)
- No external images or libraries
- Low alpha values for subtle effects
- Single requestAnimationFrame loop

## 📂 File Structure

```
aethron-site/
├── index.html          # Main portfolio page + Interface section
├── timeline.html       # Enhanced timeline with command console
├── styles.css          # Complete console theme + responsive
├── script.js           # Canvas engine + command palette + timeline features
└── README.md           # This file
```

**That's it.** No `node_modules`, no build step, no config files.

## 🎮 Feature Breakdown

### HUD Elements
- **Corner Marks**: Fixed position, gradient borders, low opacity
- **System Bar**: Top edge, animated pulse gradient
- **Scanline**: Subtle horizontal lines overlay (via body::after)
- **All elements**: Disabled in reduced motion mode

### Visual Enhancements
- **Corner Brackets**: Pseudo-elements on logo, cards, panels
- **Radar Sweep**: CSS conic-gradient animation behind command palette
- **Monospace Fonts**: Courier New for labels, codes, console text
- **Panel Styling**: Glass morphism with backdrop-filter blur

### Interaction Patterns
- **Hover States**: All interactive elements have hover feedback
- **Focus States**: Keyboard navigation fully supported
- **Transitions**: Smooth 0.3s cubic-bezier easing
- **Click Feedback**: Visual state changes for buttons/chips

## 🌐 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires:
- CSS `backdrop-filter` (glassmorphism)
- Canvas API
- IntersectionObserver API
- CSS Grid & Flexbox
- CSS Custom Properties
- ES6 JavaScript (classes, arrow functions, template literals)

Graceful degradation:
- Reduced motion: Static experience
- No JavaScript: Static content still visible and readable
- No canvas: Background missing but site still functional

## 🚢 GitHub Pages Deployment

1. Push repository to GitHub
2. Go to **Settings → Pages**
3. Select source branch (usually `main`)
4. Site will be live at `https://username.github.io/repo-name/`

No build step required — all files are static and ready to deploy.

## 📝 Philosophy

This site is a **personal portfolio** showcasing AI Infrastructure & Network Systems Engineering capabilities. Every design choice serves a purpose:
- Black/grey theme = professional, not playful
- Console interface = technical proficiency metaphor
- No frameworks = demonstrates web fundamentals mastery
- Reduced motion support = accessibility-first approach
- Performance caps = respects user's device
- Single canvas background = clean, unified aesthetic

The console theme represents precision, control, and system mastery — qualities that map directly to AI infrastructure engineering.

## 🔒 Security

✅ No external dependencies = no supply chain vulnerabilities  
✅ Static site = minimal attack surface  
✅ Client-side only = no backend to compromise  
✅ Input validation = prepared for future enhancements  

Perfect for a security-focused portfolio.

## 📊 Performance Metrics

- **Canvas particles**: ≤90 (capped)
- **Frame rate**: ~60fps (throttled)
- **Mouse sampling**: 16ms intervals
- **Resize debounce**: 150ms
- **Animation pause**: When tab hidden
- **Static mode**: 1 frame render only
- **File sizes**: 
  - index.html: ~15KB
  - timeline.html: ~20KB
  - styles.css: ~50KB
  - script.js: ~20KB
  - **Total**: ~105KB (uncompressed)

---

**Built with HTML, CSS, and JavaScript. No frameworks. No build tools. Just clean code and premium design.**

© 2026 Rishabh Durugkar. All rights reserved.
