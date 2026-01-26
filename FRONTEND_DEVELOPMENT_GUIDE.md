# YumRush - Frontend Development Guide

## 📋 Project Overview

YumRush is a modern restaurant management and delivery platform built with React. It features a clean, professional design with smooth CSS animations and a white background color scheme.

### Architecture
- **Frontend Framework**: React + Vite
- **Styling**: CSS3 with animations (no flashy colors)
- **Animations**: GSAP for complex animations, CSS keyframes for simple ones
- **Color Scheme**: White background with orange (#ff6b00) accents
- **State Management**: Context API (UserContext, CartContext, ThemeContext)

---

## 🎨 Design System

### Color Palette
- **Primary**: `#ff6b00` (Orange) - CTAs and highlights
- **Primary Gradient**: `linear-gradient(135deg, #ff6b00 0%, #ff9b42 100%)`
- **Background**: `#ffffff` (White)
- **Light BG**: `#f8f9fa` (Off-white)
- **Text Dark**: `#1e1e1e` (Almost black)
- **Text Gray**: `#666` (Medium gray)
- **Border**: `#f0f0f0` (Light gray)

### Typography
- **Font Family**: System fonts (BlinkMacSystemFont, "Segoe UI", Roboto, etc.)
- **Heading Sizes**: 
  - H1: 56px (responsive to 28px on mobile)
  - H2: 44px (responsive to 22px on mobile)
  - H3: 32px (responsive to 18px on mobile)
  - H4: 24px, H5: 20px, H6: 16px

### Spacing System
- **Base Unit**: 8px
- **Padding**: 8px, 16px, 24px, 32px, 48px
- **Gap/Margin**: Same as padding
- **Section Padding**: 60-100px vertical, 48px horizontal (responsive)

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── common.css   # Button, Card, Modal, Loader styles
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.jsx   # GSAP animated navbar
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── layout.css   # Navbar, Footer, Sidebar styles
│   │   └── menu/            # Menu-specific components
│   │       ├── MenuCard.jsx
│   │       ├── MenuList.jsx
│   │       └── CategoyFilter.jsx
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   │   ├── Home.jsx     # Main home page
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturedMenu.jsx
│   │   │   └── home.css     # Hero and featured styles
│   │   ├── Menu/
│   │   ├── About/
│   │   ├── Contact/
│   │   └── NotFound.jsx
│   ├── context/             # Context providers
│   │   ├── UserContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useFetch.js
│   │   ├── useDebounce.js
│   │   └── LocalStorage.js
│   ├── services/            # API services
│   │   ├── api.js
│   │   ├── menuService.js
│   │   └── bookingService.js
│   ├── styles.css/          # Global styles
│   │   ├── global.css       # Base styles and utilities
│   │   ├── reset.css
│   │   └── variable.css
│   ├── utils/               # Utility functions
│   │   ├── constants.js
│   │   ├── validators.js
│   │   ├── formatPrice.js
│   │   └── storage.js
│   ├── config/              # Configuration
│   │   ├── appConfig.js
│   │   └── env.js
│   ├── assets/              # Images, fonts, etc.
│   ├── App.jsx              # Root component
│   ├── index.jsx            # Entry point
│   └── index.css            # Additional root styles
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎬 CSS Animations

### Available Keyframe Animations

All animations are defined in `home.css` with 0.3s-0.8s durations:

#### Entrance Animations
- **`fadeInUp`**: Fade in with upward slide
- **`fadeInDown`**: Fade in with downward slide
- **`slideInLeft`**: Slide in from left
- **`slideInRight`**: Slide in from right
- **`scaleIn`**: Scale from 0.9 to 1
- **`slideDown`**: Navbar slide down animation

#### Motion Animations
- **`bounce`**: Vertical bounce (3s loop)
- **`float`**: Gentle floating motion with rotation (6-8s loop)
- **`pulse`**: Scale pulse effect (2s loop)
- **`spin`**: 360° rotation for loaders (1s loop)

### Using Animations in Components

```jsx
// In JSX
<div className="featured-card" style={{ "--delay": `${index * 0.1}s` }}>
  {/* Card content */}
</div>

// In CSS
.featured-card {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: var(--delay);
}
```

---

## 🧩 Component Guide

### Button Component
```jsx
import Button from "./components/common/Button";

<Button variant="primary" size="md">Order Now</Button>
<Button variant="secondary">Book Table</Button>

// Variants: primary, secondary, tertiary
// Sizes: sm, md, lg, xl
```

### Card Component
```jsx
import Card from "./components/common/Card";

<Card variant="default">
  <div className="card-header">
    <h3>Card Title</h3>
  </div>
  <div className="card-body">Content</div>
  <div className="card-footer">Footer</div>
</Card>
```

### Modal Component
```jsx
import Modal from "./components/common/Modal";
import { useState } from "react";

const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
>
  <p>Modal content here</p>
</Modal>
```

### Loader Component
```jsx
import Loader from "./components/common/Loader";

<Loader size="md" /> {/* sm, md, lg */}
<Loader fullPage /> {/* Full page loader */}
```

---

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 769px and above
- **Tablet**: 481px to 768px
- **Mobile**: 480px and below

### Responsive Utilities
```css
@media (max-width: 768px) {
  /* Tablet and below */
}

@media (max-width: 480px) {
  /* Mobile only */
}
```

---

## 🎯 Home Page Components

### HeroSection
Large hero banner with:
- Title and subtitle
- Description text
- CTA buttons (Order Now, Book Table)
- Statistics cards (Happy Customers, Dishes, Rating)
- Animated visual element with floating circles

### FeaturedMenu
Grid display of featured dishes with:
- Icons/emojis
- Name and category
- Price
- Add to Cart button
- Staggered animation on scroll

---

## 🔧 Global CSS Classes

### Spacing Utilities
```css
.mt-1, .mt-2, .mt-3     /* margin-top: 8px, 16px, 24px */
.mb-1, .mb-2, .mb-3     /* margin-bottom: 8px, 16px, 24px */
.pt-1, .pt-2, .pt-3     /* padding-top: 8px, 16px, 24px */
.pb-1, .pb-2, .pb-3     /* padding-bottom: 8px, 16px, 24px */
```

### Text Utilities
```css
.text-center             /* text-align: center */
.text-muted             /* color: #999 */
.container              /* max-width: 1200px, centered */
```

---

## 🚀 Development Workflow

### Running the Project
```bash
cd frontend
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

### File Organization Best Practices

1. **Components**: One component per file
2. **Styles**: Co-locate styles with components (component.css next to component.jsx)
3. **Naming**: PascalCase for components, kebab-case for CSS classes
4. **Imports**: Organize imports (React, components, styles, utilities)

### Adding New Pages

1. Create folder in `pages/` (e.g., `pages/Menu/`)
2. Create page component (e.g., `Menu.jsx`)
3. Create page styles (e.g., `menu.css`)
4. Import in `routes/Approutes.jsx`
5. Define route

### Adding New Components

1. Create in appropriate folder (common, layout, menu, etc.)
2. Create corresponding `.css` file
3. Export default component
4. Import in parent component

---

## 📐 Key Animations Used

### Hero Section
- Title: `fadeInDown` with 0.1s delay
- Subtitle: `fadeInDown` with 0.2s delay
- Description: `fadeInDown` with 0.3s delay
- Buttons: `fadeInDown` with 0.4s delay
- Stats: `fadeInUp` with 0.5s delay, each stat uses `scaleIn`
- Visual: `slideInRight` with bounce and floating circles

### Featured Cards
- Section header: `fadeInUp`
- Cards: `fadeInUp` with staggered 0.1s delays (CSS variable `--delay`)
- Icons: `pulse` animation on hover

### Navbar
- Entire navbar: `slideDown` on mount
- Brand: Hover scales to 1.05
- Nav items: Color transition, animated underline
- Indicator: GSAP animation on click

---

## 🎨 Styling Guidelines

### Button Styling Rules
- Primary buttons: Gradient background, white text, shadow
- Secondary buttons: White background, colored border and text
- Hover state: Scale up slightly, enhanced shadow
- Disabled state: Reduced opacity, no transform

### Card Styling Rules
- Border: 1px solid #f0f0f0
- Hover: Border color changes to #ff6b00, shadow increases, transform up
- Padding: 24px (responsive to 12px on mobile)
- Rounded corners: 12px

### Typography Rules
- Max-width for text blocks: 400-500px for readability
- Line-height: 1.6 for body text, 1.2 for headings
- Letter-spacing: 0.5px for uppercase text

---

## 🔗 Integration Points

### API Services (to be connected)
- `menuService.js` - Menu CRUD operations
- `bookingService.js` - Booking management
- `api.js` - Base API configuration

### Context Providers (to be implemented)
- `UserContext.jsx` - User authentication and profile
- `CartContext.jsx` - Shopping cart state
- `ThemeContext.jsx` - Theme switching (if needed)

### Custom Hooks (to be implemented)
- `useFetch.js` - Data fetching with loading states
- `useDebounce.js` - Debounce utility for search
- `LocalStorage.js` - Local storage management

---

## ✅ Checklist for New Features

- [ ] Create component files (`.jsx`)
- [ ] Create style files (`.css`)
- [ ] Add responsive design (@media queries)
- [ ] Add animations (if needed)
- [ ] Create utilities/helpers (if needed)
- [ ] Export and import properly
- [ ] Test on desktop, tablet, mobile
- [ ] Verify accessibility (color contrast, focus states)
- [ ] Update documentation

---

## 🎯 Next Steps

1. **Setup Backend**: Node.js + Express
2. **Create Routes**: Home, Menu, Booking, About, Contact
3. **Implement Cart**: Add to cart functionality
4. **Admin Panel**: Authentication and management pages
5. **Database**: MongoDB integration
6. **Deployment**: Deploy to VPS/Cloud server

---

## 📝 Notes

- No external UI frameworks (custom CSS for simplicity)
- GSAP is available for complex animations
- All animations use CSS transforms and opacity for performance
- Mobile-first responsive design approach
- Consistent spacing and sizing throughout

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Base structure complete, ready for feature development
