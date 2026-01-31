# AI Infrastructure & Network Systems Engineer Portfolio

A professional portfolio site showcasing expertise in AI infrastructure, network engineering, and systems automation. Built with a minimalist cyber sci-fi aesthetic featuring green/black color scheme and subtle animations.

## 👤 Professional Profile

**AI Infrastructure & Network Systems Engineer**
- CCNP (Enterprise + Automation) — In Progress
- NVIDIA-Certified Professional: AI Infrastructure
- MSc Electronic & Computer Technology (IoT), Dublin (2022–2025)

### Core Expertise
- **AI Infrastructure**: GPU cluster networking, RDMA/InfiniBand, AI workload optimization
- **Networking**: BGP, OSPF, SD-WAN, VPNs, hybrid cloud networking (AWS)
- **Automation**: Python, Terraform, Ansible, Infrastructure as Code
- **Observability**: Prometheus, Grafana, metrics correlation, failure analysis

## 🎨 Design Philosophy

**Minimalist Cyber Sci-Fi** aesthetic with:
- Dark green/black color palette (stealth tech)
- Glassmorphism effects for depth
- Subtle neon green glow effects
- Clean typography using system font stacks
- Professional, recruiter-safe presentation

## ✨ Features

### Sections
- **Hero**: Professional title, subtitle with credentials, dual CTAs
- **Experience**: Timeline view of Wipro role (2021-2022) and NDA consulting (2022-present)
- **Projects**: 6 infrastructure-focused projects with Problem → Solution → Outcome format
- **Education**: MSc IoT + BSc Network & Technology, including Arcane Guard capstone
- **Certifications**: CCNP Enterprise/ENAUTO, NVIDIA AI Infrastructure
- **Skills**: Capability-grouped technical skills
- **How I Work**: Professional philosophy on infrastructure as a system
- **Contact**: GitHub and LinkedIn links

### Visual Elements
- **Glass Navbar**: Fixed navigation with blur effect, smooth scrolling
- **Hero Section**: 
  - Animated gradient background
  - Canvas-based particle field (low density, optimized)
  - Faint grid overlay for sci-fi aesthetic
  - Dual CTAs (View Projects, Contact)
- **Section Animations**: Smooth reveal using IntersectionObserver
- **Timeline**: Visual timeline with markers for work experience
- **Project Cards**: Glassmorphism with neon edge glow on hover
- **Responsive**: Mobile-first design, works on all screen sizes

### Performance & Accessibility
- **Optimized animations** with requestAnimationFrame
- **Prefers-reduced-motion support**: Automatically disables animations for accessibility
- **Performance optimization**: Animations pause when tab is not visible
- Clean, semantic HTML5 markup
- No external dependencies or frameworks

## 🏗️ Structure

```
aethron-site/
├── index.html      # Main HTML with semantic markup and professional content
├── styles.css      # Green/black sci-fi styling with CSS custom properties
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

## 💻 Technologies

- **HTML5**: Semantic markup, accessibility features
- **CSS3**: 
  - CSS Custom Properties (green/black color scheme)
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
  --bg-primary: #060A07;
  --accent-primary: #00FF7A;
  --accent-secondary: #34D399;
  /* ... */
}
```

### Content
Update sections in `index.html`:
- Experience timeline items
- Project cards with Problem/Solution/Outcome
- Education and certifications
- Skills categories
- Contact links

## ♿ Accessibility

- Respects `prefers-reduced-motion` system setting
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- High contrast green/black color scheme for readability

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

© 2026. All rights reserved.