# AETHRON - JARVIS Console Edition

A premium black/grey portfolio site with JARVIS-style console interface. Features interactive canvas background, AI agent panel, and command console timeline. Zero dependencies, pure HTML/CSS/JavaScript.

## ✨ Features

### JARVIS Console Experience
- **Strict Black/Grey Palette**: `#050607` background, monochrome UI (no neon colors)
- **HUD Elements**: Corner marks, system activity bar, subtle scanline overlay
- **Console Aesthetics**: Corner brackets on panels, monospace fonts, terminal-style interfaces
- **Radar Sweep Effect**: Animated subtle radar behind agent panel (disabled in reduced motion)

### Single Interactive Canvas Background
The site features ONE universal interactive background with:
- **Star-dust particles**: 90 particles maximum for performance
- **Faint grid overlay**: Subtle 100px grid
- **Constellation connections**: Lines between particles near mouse (within 150px radius)
- **Mouse parallax**: Smooth lerped tracking with throttling (~60fps)
- **Mobile support**: Device orientation for subtle parallax where available
- **Performance**: Single `requestAnimationFrame` loop, capped primitives, optimized rendering
- **Reduced Motion**: Renders one static frame when `prefers-reduced-motion: reduce` is detected

### AI Agent Interface (New)
Located between Projects and Contact sections on index.html:

**JARVIS Chat Panel:**
- System greeting on page load
- Message area with scrollable chat history
- Quick command chips: `/about`, `/projects`, `/timeline`, `/services`, `/contact`
- Input field with Enter-key support
- Scripted local responses (no backend required)
- Smooth scroll to relevant sections after command execution
- API hook placeholder: `POST /api/agent` with JSON format documentation

**Agentic Services Cards:**
Four professional service offerings:
1. **Network Automation Agents** - Intent-to-config, validation, drift detection
2. **AI Infrastructure Observability** - GPU/network/workload correlation  
3. **Security & Threat Simulation** - Traffic-aware detection, failure injection
4. **Reliability Engineering** - Incident RCA acceleration, chaos testing

Each card includes: What it does, Output format, Typical deliverable

### Timeline Console Features (Enhanced)
The timeline.html page now includes:

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

### Update Your Name
Replace `[YOUR FULL NAME]` in `index.html` (hero section).

### Update Links
In both `index.html` and `timeline.html`:
- GitHub: `https://github.com/rootuser39`
- LinkedIn: `https://linkedin.com/in/yourprofile`
- Email: `your.email@example.com`
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

### Customize Agent Commands
Edit command responses in `script.js`:

```javascript
function handleCommand(command) {
  const cmd = command.trim().toLowerCase();
  
  switch(cmd) {
    case '/about':
      addMessage('Your custom response here');
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

### Agent Panel (Frontend Only)
- Local scripted responses for common commands
- Smooth scroll navigation to page sections
- Backend hook ready: `POST /api/agent` endpoint
- Expected API format:
  ```json
  {
    "message": "user input",
    "context": "optional session data"
  }
  ```
- Response handling for streaming or complete responses
- Fallback message when API not connected

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
├── index.html          # Main portfolio page + Agent section
├── timeline.html       # Enhanced timeline with command console
├── styles.css          # Complete JARVIS console theme + responsive
├── script.js           # Canvas engine + agent + timeline features
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
- **Radar Sweep**: CSS conic-gradient animation behind agent panel
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

## 🔌 Backend Integration (Agent Panel)

The agent panel is frontend-ready for backend integration.

### API Endpoint: `POST /api/agent`

**Request Format:**
```json
{
  "message": "user query text",
  "context": {
    "sessionId": "optional-session-id",
    "history": []
  }
}
```

**Response Format:**
```json
{
  "response": "agent reply text",
  "action": "optional action type (navigate, execute, etc.)",
  "data": {}
}
```

**Integration Steps:**
1. Uncomment the backend API call in `script.js` (search for "Backend hook")
2. Replace placeholder URL with your API endpoint
3. Handle streaming responses if using streaming API
4. Add error handling for network failures
5. Implement session management if needed

**Example Integration:**
```javascript
async function sendToBackend(message) {
  try {
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    addMessage(data.response, false);
    if (data.action === 'navigate') {
      // Handle navigation
    }
  } catch (error) {
    addMessage('Connection error. Agent offline.', false);
  }
}
```

## 📝 Credits & Philosophy

This site is a **proof-of-work portfolio**. Every design choice serves a purpose:
- Black/grey theme = professional, not playful
- JARVIS console = interactive metaphor for AI/infrastructure work
- No frameworks = shows raw web fundamentals mastery
- Reduced motion support = accessibility-first approach
- Performance caps = respects user's device
- Single canvas background = clean, unified aesthetic

The JARVIS Console theme represents precision, control, and system mastery — qualities that map directly to AI infrastructure engineering.

## 🔒 Security

✅ No external dependencies = no supply chain vulnerabilities  
✅ Static site = minimal attack surface  
✅ Client-side only = no backend to compromise  
✅ CodeQL scanned = 0 vulnerabilities detected  
✅ Input validation = prepared for backend integration  

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

## 🎯 Key Differences from Previous Version

### Removed
- ❌ Background mode selector (1/2/3 buttons)
- ❌ Three different canvas modes (Compute/Fabric/Defense)
- ❌ Mode-specific color changes
- ❌ Status chips showing mode focuses

### Added
- ✅ Single unified canvas background
- ✅ HUD corner marks + system activity bar
- ✅ AI Agent chat interface with commands
- ✅ Agentic Services section (4 cards)
- ✅ Timeline command console sidebar
- ✅ Search filter for timeline
- ✅ System log feed
- ✅ Focus mode toggle
- ✅ Year jump navigation
- ✅ Enhanced timeline card details
- ✅ Keyboard accessibility
- ✅ Corner brackets on panels
- ✅ Radar sweep animation

### Improved
- ⚡ Performance optimization (single mode vs three)
- ⚡ Cleaner navigation (removed confusing mode toggle)
- ⚡ Better UX (command console, search, focus mode)
- ⚡ More professional (JARVIS aesthetic throughout)
- ⚡ Enhanced accessibility (keyboard, reduced motion)

---

**Built with HTML, CSS, and JavaScript. No frameworks. No build tools. Just clean code and premium design.**

© 2026. All rights reserved.
