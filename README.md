# AETHRON Tech Portfolio

A luxury cyber sci-fi themed static portfolio site built with pure HTML, CSS, and JavaScript. Features a minimalist yet sophisticated design with subtle animations and interactive elements.

## 🎨 Design Philosophy

**Luxury + Cyber + Sci-Fi** aesthetic with:
- Dark, sophisticated color palette with cyan accents
- Glassmorphism effects for depth and modernity
- Subtle neon glow effects (tasteful, not overwhelming)
- Clean typography using system font stacks
- Minimalist layout - recruiter-safe and professional

## ✨ Features

### Visual Elements
- **Glass Navbar**: Fixed navigation with blur effect, smooth scrolling, and active section highlighting
- **Hero Section**: 
  - Animated gradient background
  - Subtle vignette overlay
  - Faint grid overlay for sci-fi aesthetic
  - Canvas-based particle field with low density, slow drift
- **Section Animations**: Smooth reveal animations using IntersectionObserver
- **Project Cards**: Glassmorphism with neon edge glow on hover
- **Improved Typography**: Modern system font stack with optimized spacing

### Interactive Features
- Smooth scrolling navigation with active link highlighting
- Particle field animation (40 particles, optimized with requestAnimationFrame)
- Section reveal animations on scroll
- Hover effects on cards and links
- Responsive design for all screen sizes

### Performance & Accessibility
- **Low particle count** (40) for optimal performance
- **Optimized animation loop** with requestAnimationFrame
- **Prefers-reduced-motion support**: Automatically disables animations and particles for users who prefer reduced motion
- **Performance optimization**: Particle animation pauses when tab is not visible
- Clean, semantic HTML5 markup
- No external dependencies or frameworks

## 🏗️ Structure

```
aethron-site/
├── index.html      # Main HTML structure with semantic markup
├── styles.css      # All styling with CSS custom properties
├── script.js       # Interactive features (particles, scrolling, animations)
└── README.md       # This file
```

## 🚀 Usage

Simply open `index.html` in any modern web browser. No build process, no dependencies, no installation required.

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended for development)
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🎯 Sections

1. **Hero**: AETHRON branding with animated background and particle field
2. **About**: Brief introduction and description
3. **Projects**: Showcase of three featured projects with glassmorphism cards
4. **Contact**: Links to GitHub and LinkedIn profiles

## 💻 Technologies

- **HTML5**: Semantic markup, accessibility features
- **CSS3**: 
  - CSS Custom Properties (variables)
  - Flexbox and Grid layouts
  - Glassmorphism effects with backdrop-filter
  - Advanced animations and transitions
  - Media queries for responsive design
- **Vanilla JavaScript**:
  - Canvas API for particle system
  - IntersectionObserver API for scroll animations
  - Event listeners for navigation and scrolling
  - Performance optimizations (requestAnimationFrame, visibility API)

## 🎨 Customization

### Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
  --accent-cyan: #00d4ff;
  --accent-purple: #b366ff;
  --accent-pink: #ff6eb4;
  /* ... */
}
```

### Particles
Adjust particle settings in `script.js`:
```javascript
const particleConfig = {
  count: 40,              // Number of particles
  maxSpeed: 0.3,          // Movement speed
  connectionDistance: 150, // Connection line distance
  particleSize: 2         // Particle size in pixels
};
```

## ♿ Accessibility

- Respects `prefers-reduced-motion` system setting
- Semantic HTML structure
- Proper ARIA attributes where needed
- Keyboard navigation support
- High contrast ratios for text readability

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires support for:
- CSS backdrop-filter (glassmorphism)
- IntersectionObserver API
- Canvas API
- CSS Grid and Flexbox

## 📄 License

© 2026 AETHRON. All rights reserved.