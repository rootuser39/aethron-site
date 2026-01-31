# AETHRON - Premium Stealth Sci-Fi Portfolio

A professional portfolio site showcasing expertise in AI infrastructure and network engineering. Built with a premium "stealth sci-fi" aesthetic featuring toned-down green/black color palette, site-wide interactive background, and elegant animations.

## ✨ Features

### Visual Design
- **Color Palette**: Toned-down green/black theme (#070A08 background, #34D399 primary, #10B981 secondary, #00FF7A rare highlight)
- **Site-Wide Interactive Background**: Full-screen canvas with 50-80 particles responding to mouse movement
- **Mouse Parallax**: Subtle background shift based on cursor position (throttled and optimized)
- **Smooth Scrolling**: Buttery smooth scroll behavior with proper navbar offset
- **Glassmorphism**: Glass-morphic cards with subtle green edge glow on hover
- **Elegant Glows**: Reduced glow intensity (~60% less than typical neon) for sophisticated look
- **Scanline & Noise Overlays**: Subtle sci-fi effects

### Content Structure
1. **Hero**: Name placeholder ([YOUR FULL NAME]), AETHRON label, professional title
2. **About**: Personal narrative in I/Me voice, systems thinking approach
3. **Experience**: Timeline view with Wipro (2021-2022) and Independent Consulting (2022-Present)
4. **Projects**: 6 AI infrastructure projects with Problem/Solution/Outcome format
5. **Education**: MSc IoT (Dublin 2022-2025) + BSc Network & Technology
6. **Certifications**: CCNP, NVIDIA AI Infrastructure, Next: PNPT/DevSecOps/CCT with proof-of-work statement
7. **Skills**: Grouped by capability (AI Infrastructure, Networking, Automation, Cloud)
8. **Contact**: GitHub, LinkedIn, Email, Resume download placeholders
9. **Timeline Page**: Detailed chronological view with collapsible year/month sections

### Interactive Features
- **Active Navigation**: Highlights current section based on scroll position
- **Section Reveal**: Smooth fade-in animations using IntersectionObserver
- **Timeline Accordion**: Expand/collapse sections, compact/detailed view toggle
- **Mobile Support**: Device orientation for subtle parallax on mobile devices

### Performance & Accessibility
- **Optimized Animations**: requestAnimationFrame loop, throttled mouse input
- **Low Particle Count**: 50-80 particles max for 60fps on normal laptops
- **Reduced Motion Support**: Static canvas frame when prefers-reduced-motion is enabled
- **Debounced Resize**: Efficient window resize handling
- **Visibility API**: Pauses animations when tab is hidden
- **Semantic HTML**: Clean, accessible markup
- **Responsive Design**: Mobile-first approach

## 🏗️ Structure

```
aethron-site/
├── index.html      # Main portfolio page
├── timeline.html   # Detailed chronological timeline
├── styles.css      # Global theme + layout + effects
├── script.js       # Canvas background + mouse parallax + animations
└── README.md       # This file
```

## 🚀 Usage

Simply open `index.html` in any modern web browser. No build process, no dependencies, no installation required.

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended for testing)
python -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Deploy to GitHub Pages
# Just push to your repository with GitHub Pages enabled
```

## 🎨 Customization

### Replace Placeholder Name
Find and replace `[YOUR FULL NAME]` in `index.html` with your actual name.

### Update Links
Edit these placeholders in both `index.html` and `timeline.html`:
- GitHub: `https://github.com/rootuser39` → your GitHub profile
- LinkedIn: `https://linkedin.com/in/yourprofile` → your LinkedIn profile  
- Email: `your.email@example.com` → your email address
- Resume: Add your resume PDF and update the download link

### Customize Projects
Update the 6 project cards in `index.html` with your actual projects:
1. AI-Aware Network Traffic Optimization
2. GPU & Infrastructure Observability Correlator
3. Edge Inference Under Constrained Networks
4. Traffic-Aware Security Detection for AI Workloads
5. Failure Injection Lab for Faster RCA
6. Cost Driver Modeling for AI Infrastructure

### Update Timeline
Edit `timeline.html` to add your actual:
- Work experience details
- Project milestones
- Education modules
- Certification progress
- Evidence links (GitHub repos, demos, write-ups)

### Adjust Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
  --bg-primary: #070A08;
  --accent-primary: #34D399;
  --accent-secondary: #10B981;
  --accent-highlight: #00FF7A;
  /* ... */
}
```

### Configure Canvas Background
Edit particle config in `script.js`:
```javascript
const particleConfig = {
  count: 60,              // Number of particles (50-80 recommended)
  maxSpeed: 0.3,          // Particle drift speed
  connectionDistance: 120, // Distance for particle connections
  particleSize: 1.5,      // Particle radius
  parallaxStrength: 0.015 // Mouse parallax intensity (0 = disabled)
};
```

To disable the canvas background entirely:
```javascript
const particleConfig = {
  count: 0  // Set to 0 to disable
};
```

## 💻 Technologies

- **HTML5**: Semantic markup, accessibility features
- **CSS3**: 
  - CSS Custom Properties for theming
  - Flexbox and Grid layouts
  - Glassmorphism (backdrop-filter)
  - Advanced animations and transitions
  - Media queries for responsive design
  - Scroll behavior and scroll-margin-top
- **Vanilla JavaScript**:
  - Canvas API for particle system
  - Mouse tracking with throttling and lerping
  - IntersectionObserver API for scroll animations
  - Device Orientation API for mobile parallax
  - Visibility API for performance optimization
  - requestAnimationFrame for smooth 60fps

## 📊 Performance Notes

- Canvas animation is capped at 60fps
- Mouse input is throttled to ~60fps
- Window resize is debounced (150ms)
- Animations pause when tab is hidden
- Reduced particle count keeps GPU usage low
- No external dependencies = fast load time

## ♿ Accessibility

- Respects `prefers-reduced-motion` system setting
- Canvas renders static frame when motion is reduced
- All animations disabled with reduced motion
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- High contrast color scheme
- scroll-margin-top for proper anchor navigation

## 🌐 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires support for:
- CSS backdrop-filter
- IntersectionObserver API
- Canvas API
- CSS Grid and Flexbox
- CSS Custom Properties

## 🚢 GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Your site will be live at `https://yourusername.github.io/repository-name/`

No build step needed! All files are static and deploy-ready.

## 📝 What's Inside

### Color Palette (Toned Down Green/Black)
- Background: `#070A08` (near-black with slight green tint)
- Panels/glass: `rgba(12, 18, 14, 0.55)`
- Primary accent: `#34D399` (muted green)
- Secondary accent: `#10B981` (deeper green)
- Rare highlight: `#00FF7A` (only on hover/focus)
- Text: `#E6FFF3` (light mint)
- Muted text: `#9FB9AD` (gray-green)

### Signature Effects (Subtle, Not Cringe)
- Hero background: animated gradient + faint diagonal grid
- Scanline overlay (very subtle)
- CSS-generated noise effect
- Cards: glassmorphism with green edge glow on hover
- Buttons: "terminal button" style (border + subtle glow)
- Section reveal: simple translate/opacity on scroll

### Interactive Background
- Fixed full-screen canvas behind all content
- 50-80 particles with faint connections
- Gentle parallax based on mouse position
- Mouse response throttled for performance
- Resize handler with debouncing
- Device orientation support on mobile
- Static frame for reduced-motion users

## 📄 License

© 2026. All rights reserved.

---

Built with vanilla HTML/CSS/JS. No frameworks, no build tools, just clean code and premium design.
