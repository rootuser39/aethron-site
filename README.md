# AETHRON - Emperor Conquest Console

A premium black/grey portfolio site showcasing AI infrastructure and network engineering expertise. Features an interactive tri-mode console background system with zero dependencies.

## ✨ Features

### Emperor Conquest Console Theme
- **Strict Black/Grey Palette**: `#050607` background, monochrome UI (no green, no cyan, no neon)
- **Premium Minimal Design**: Brutal clarity, glass panels, subtle borders
- **Steel-Grey Accents**: `#D7DBE3` highlight used sparingly
- **Very Subtle Shadows**: No big blur glows or flashy effects

### Tri-Mode Console System
The site features three interactive background modes controlled by the navbar toggle (1/2/3):

**Mode 1: COMPUTE**
- Faint block grid (like compute tiles)
- Slow heat drift effect (procedural noise illusion)
- Sparse dust particles drifting across screen
- Focus: Observability · Cost · Throughput

**Mode 2: FABRIC**
- Network node graph with low-opacity links
- Packet pulses traveling along edges
- Mouse proximity increases local activity (very subtle)
- Focus: Latency · Routing · QoS

**Mode 3: DEFENSE**
- Soft radar rings (low opacity, subtle pulse)
- Occasional "threat ping" dots that expand and fade
- Mouse movement nudges ring center slightly (parallax)
- Focus: Detection · Segmentation · Response

**Important**: Modes DO NOT change the color theme — only background behavior.

### Interaction & Performance
- **Mouse Parallax**: Smooth lerped tracking with throttling (~60fps)
- **Mobile Support**: Device orientation for subtle parallax where available
- **Performance Caps**: ~120 primitives max on screen, avoiding expensive composites
- **Debounced Resize**: Efficient window handling
- **Reduced Motion**: Full support — static frame rendered, animations disabled

### Site Structure
- **Hero**: Name placeholder, status chips showing all 3 mode focuses
- **About**: First-person voice, recruiter-friendly
- **Experience**: Wipro (2021-2022) + Independent NDA work (2022-present)
- **Projects**: 6 cards with mode badges (Compute/Fabric/Defense)
- **Education**: MSc IoT (Dublin) + BSc
- **Certifications**: CCNP + ENAUTO (in progress), NVIDIA AI Infrastructure
- **Skills**: Grouped by AI Infrastructure / Networking / Automation / Cloud
- **Timeline Page**: Detailed chronological accordion with compact/detailed toggle

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
Replace `[YOUR FULL NAME]` in `index.html` (line 34).

### Update Links
In both `index.html` and `timeline.html`:
- GitHub: `https://github.com/rootuser39`
- LinkedIn: `https://linkedin.com/in/yourprofile`
- Email: `your.email@example.com`
- Resume: Add PDF and update download link

### Customize Projects
Edit the 6 project cards in `index.html`:
1. AI-Aware Network Traffic Optimization (Fabric)
2. GPU & Infrastructure Observability Correlator (Compute)
3. Edge Inference Under Constrained Networks (Fabric/Compute)
4. Traffic-Aware Security Detection for AI Workloads (Defense)
5. Failure Injection Lab for Faster RCA (Defense)
6. Cost Driver Modeling for AI Infrastructure (Compute)

Each project should include: mode badge, problem, solution, outcome, tech stack, links.

### Update Timeline
Edit `timeline.html` to add your actual:
- Work experience milestones
- Project deliverables
- Education modules
- Certification progress
- Evidence links (repos, demos, write-ups)

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

### Configure Canvas Modes
Edit mode behaviors in `script.js`:

**Compute Mode**:
```javascript
this.gridSize = 80;          // Block grid size
this.heatTime = 0;           // Heat drift speed
// Particle count set at 30
```

**Fabric Mode**:
```javascript
const nodeCount = 25;        // Network nodes
const maxDistance = 200;     // Connection distance
// Packet spawn rate: 0.02 per frame
```

**Defense Mode**:
```javascript
this.rings = [];             // 4 radar rings
// Threat ping spawn rate: 0.015 per frame
```

To disable canvas entirely:
```javascript
// In script.js, comment out the init() call or set:
const prefersReducedMotion = true;
```

## 💻 How It Works

### Tri-Mode System
- Mode toggle in navbar (buttons labeled 1/2/3)
- Each mode has a dedicated renderer class
- Single `requestAnimationFrame` loop handles all rendering
- Mode switching is instant (no page reload)

### Canvas Engine
- **ComputeMode**: Block grid + value noise for heat + dust particles
- **FabricMode**: Dynamic node graph + packet pulses + mouse proximity
- **DefenseMode**: Pulsing radar rings + expanding threat pings + parallax

### Reduced Motion Support
When `prefers-reduced-motion: reduce` is detected:
- Canvas renders ONE static frame (no animation loop)
- All CSS animations disabled
- Scroll reveals disabled (sections visible immediately)
- Mouse parallax disabled

### Performance
- Mouse input throttled to ~60fps
- Resize debounced (150ms)
- Primitive count capped (~30-120 depending on mode)
- Animation pauses when tab hidden (Visibility API)
- No external images or libraries

### Accessibility
- Keyboard navigable
- Proper heading hierarchy
- High contrast text
- `scroll-margin-top` for anchor links
- Respects system motion preferences
- Semantic HTML structure

## 📂 File Structure

```
aethron-site/
├── index.html          # Main portfolio page
├── timeline.html       # Detailed timeline/accordion
├── styles.css          # Complete Emperor theme + responsive
├── script.js           # Tri-mode canvas engine + interactions
└── README.md           # This file
```

**That's it.** No `node_modules`, no build step, no config files.

## 🎮 Mode Descriptions

### Mode 1: Compute
Represents GPU/compute infrastructure. Visual metaphor: heat maps showing utilization patterns across a cluster.

**Use case**: When talking about observability, cost optimization, throughput analysis.

### Mode 2: Fabric
Represents network topology and data flow. Visual metaphor: packets flowing through interconnected nodes.

**Use case**: When discussing network architecture, latency optimization, routing, QoS.

### Mode 3: Defense
Represents security monitoring and threat detection. Visual metaphor: radar surveillance with anomaly alerts.

**Use case**: When highlighting security work, threat detection, segmentation, incident response.

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

## 🚢 GitHub Pages Deployment

1. Push repository to GitHub
2. Go to **Settings → Pages**
3. Select source branch (usually `main`)
4. Site will be live at `https://username.github.io/repo-name/`

No build step required — all files are static and ready to deploy.

## 📝 Credits & Philosophy

This site is a **proof-of-work portfolio**. Every design choice serves a purpose:
- Black/grey theme = professional, not playful
- Tri-mode console = interactive metaphor for infrastructure domains
- No frameworks = shows raw web fundamentals mastery
- Reduced motion support = accessibility-first approach
- Performance caps = respects user's device

The Emperor Conquest Console theme represents precision, control, and brutal efficiency — qualities that map to infrastructure engineering.

## 🔒 Security

No external dependencies = no supply chain vulnerabilities.

Static site = minimal attack surface.

All interactions happen client-side = no backend to compromise.

Perfect for a security-focused portfolio.

---

**Built with HTML, CSS, and JavaScript. No frameworks. No build tools. Just clean code and premium design.**

© 2026. All rights reserved.
