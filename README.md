# Anil Kumar Thatha Venkatachalapathy

**Senior iOS/macOS Engineer | 13+ Years Experience**

Hey there! Thanks for checking out my resume. I've spent the last 13 years building iOS and macOS apps, mostly for Apple's internal teams and retail stores worldwide.

## 🌐 Live Site

**[aniltv06.github.io](https://aniltv06.github.io)**

### Features

- **3D WebGL Background** - Dynamic geometric shapes using Three.js
- **Interactive Data Visualization** - Real-time charts displaying project impact metrics
- **Multi-Theme Support** - Light, dark, and terminal themes with smooth transitions
- **Progressive Web App** - Installable with offline support
- **Responsive Design** - Optimized for all screen sizes and devices
- **Accessibility** - WCAG 2.1 AA compliant with full keyboard navigation
- **Hidden Easter Egg** - Discover the secret with the Konami Code

## 🛠️ Tech Stack

### Core Technologies
- **Vite 7.2.4** - Modern build tool and dev server
- **Vanilla JavaScript (ES6+)** - Modular architecture with code splitting
- **CSS3** - BEM methodology, custom properties, animations
- **HTML5** - Semantic markup with proper accessibility

### Libraries
- **Three.js** - 3D graphics and WebGL rendering
- **Chart.js** - Data visualization and interactive charts
- **vite-plugin-pwa** - Service worker and PWA functionality

### Development Tools
- **Playwright** - End-to-end testing and accessibility validation
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **GitHub Actions** - Automated CI/CD deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/aniltv06/aniltv06.github.io.git
cd aniltv06.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the site locally.

### Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server with hot reload

# Production
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally

# Testing
npm run test         # Run Playwright E2E tests
npm run test:ui      # Run tests with Playwright UI
npm run test:debug   # Debug mode for tests

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 📁 Project Structure

```
├── public/                    # Static assets
│   ├── favicon/              # Favicon variants
│   ├── Anil_Thatha-Resume.pdf
│   ├── og-image.jpg
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.css              # Global styles
│   └── js/
│       ├── main.js           # Application entry point
│       ├── config/
│       │   └── constants.js  # Configuration constants
│       └── modules/
│           ├── analytics.js  # Google Analytics & Clarity
│           ├── animations.js # Scroll and fade animations
│           ├── charts.js     # Chart.js visualizations
│           ├── easter-egg.js # Konami code & easter egg
│           ├── keyboard.js   # Keyboard shortcuts
│           ├── modal.js      # Modal management
│           ├── navigation.js # Navigation & scroll behavior
│           ├── theme.js      # Theme switching logic
│           ├── utils.js      # Utility functions
│           └── webgl.js      # Three.js WebGL background
├── tests/                    # Playwright E2E tests
│   ├── accessibility.spec.js
│   ├── modal.spec.js
│   ├── navigation.spec.js
│   └── theme.spec.js
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions deployment
├── index.html               # Main HTML entry point
├── vite.config.js           # Vite configuration
└── playwright.config.js     # Playwright test configuration
```

## 🏗️ Architecture

### Design Patterns
- **Modular ES6 Architecture** - Each feature isolated in its own module
- **BEM CSS Methodology** - `.block__element--modifier` naming convention
- **Observer Pattern** - Event-driven interactions and state management
- **Lazy Loading** - Heavy libraries loaded on-demand for optimal performance

### Accessibility
- **ARIA Labels & Roles** - Proper semantic markup
- **Keyboard Navigation** - Full keyboard support with focus management
- **Screen Reader Support** - Tested with VoiceOver and NVDA
- **Skip Links** - Direct navigation to main content
- **Focus Trapping** - Modal and menu focus management

### Performance Optimizations
- **Code Splitting** - Separate vendor chunks for Three.js and Chart.js
- **Service Worker** - Precaching and runtime caching strategies
- **Image Optimization** - Optimized OG image (131 KB JPEG)
- **Minification** - Terser with console removal in production
- **Bundle Size** - ~28 KB JS (9.5 KB gzipped)

### Data Attributes System
- `data-component` - Component identification
- `data-testid` - E2E testing selectors
- `data-state` - State management (open/closed)
- `data-analytics` - Event tracking
- `data-action` - Button/link actions
- `data-theme` - Theme management

## 🎯 Performance Metrics

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Total Bundle Size:** 28.01 KB (9.48 KB gzipped)
- **Service Worker Cache:** 24 entries (~580 KB)
- **Time to Interactive:** < 2s

## 🚢 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions on every push to the `main` branch.

### Manual Deployment

```bash
# Build production bundle
npm run build

# Preview before deployment
npm run preview

# Commit and push
git add .
git commit -m "Deploy updates"
git push origin main
```

GitHub Actions will automatically:
1. Install dependencies
2. Run production build
3. Deploy to GitHub Pages
4. Update live site at aniltv06.github.io

## 🧪 Testing

Comprehensive E2E testing with Playwright covering:
- **Accessibility** - WCAG compliance, keyboard navigation, ARIA
- **Navigation** - Smooth scrolling, active states, mobile menu
- **Theming** - Theme switching, persistence, transitions
- **Modals** - Open/close, focus trapping, keyboard controls

```bash
# Run all tests
npm run test

# Run with UI
npm run test:ui

# Run specific test file
npx playwright test tests/accessibility.spec.js
```

## 📊 Analytics

Integrated analytics tracking:
- **Google Analytics (G-7KHN3J4KPP)** - Page views, user behavior
- **Microsoft Clarity (p7iqm5o7oj)** - Heatmaps, session recordings

Custom event tracking for:
- Theme changes
- Modal interactions
- Navigation clicks
- Resume downloads
- Easter egg discovery

## 🔒 Security

- **Content Security Policy** - Defined in meta tags
- **No sensitive data** - All information is public resume data
- **HTTPS only** - Enforced via GitHub Pages
- **XSS Prevention** - Proper input sanitization

## 📄 License

This project is open source and available for reference. Feel free to fork and adapt for your own portfolio.

## 👤 Contact

**Anil Kumar Thatha Venkatachalapathy**

- **Email:** aniltv06@gmail.com
- **LinkedIn:** [linkedin.com/in/anilthatha](https://www.linkedin.com/in/anilthatha/)
- **GitHub:** [github.com/aniltv06](https://github.com/aniltv06)
- **Blog:** [swiftbytes.blogspot.com](https://swiftbytes.blogspot.com)
- **Location:** California, USA

---

📥 **[Download PDF Resume](https://aniltv06.github.io/Anil_Thatha-Resume.pdf)**
