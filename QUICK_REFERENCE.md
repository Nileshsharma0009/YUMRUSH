# YumRush Frontend - Quick Reference

## 🎯 Key Files You'll Work With

### Pages (Add your pages here)
- `src/pages/Home/Home.jsx` - Landing page
- `src/pages/Menu/Menu.jsx` - Menu browsing
- `src/pages/Contact/Contact.jsx` - Contact page
- `src/pages/About/About.jsx` - About page

### Components (Use these everywhere)
- `src/components/common/Button.jsx` - All buttons
- `src/components/common/Card.jsx` - Content cards
- `src/components/common/Modal.jsx` - Dialogs
- `src/components/common/Loader.jsx` - Loading spinner

### Styles (CSS)
- `src/styles.css/global.css` - Global styles
- `src/components/common/common.css` - Component styles
- `src/components/layout/layout.css` - Layout styles
- `src/pages/Home/home.css` - Page styles + animations

### Configuration
- `src/config/appConfig.js` - App settings
- `src/config/env.js` - Environment variables
- `src/services/api.js` - API base setup

---

## 💡 Common Tasks

### Add a Button
```jsx
import Button from "./components/common/Button";

<Button variant="primary" size="lg" onClick={() => {}}>
  Click Me
</Button>
```

**Variants**: primary | secondary | tertiary  
**Sizes**: sm | md | lg | xl

---

### Add a Card
```jsx
import Card from "./components/common/Card";

<Card className="my-card">
  <div className="card-header">
    <h3>Title</h3>
  </div>
  <div className="card-body">Content</div>
  <div className="card-footer">Footer</div>
</Card>
```

---

### Show a Modal
```jsx
import Modal from "./components/common/Modal";
import { useState } from "react";

const [open, setOpen] = useState(false);

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm"
  footer={<Button onClick={() => setOpen(false)}>Close</Button>}
>
  Your content
</Modal>
```

---

### Show a Loader
```jsx
import Loader from "./components/common/Loader";

<Loader size="md" />
{/* Sizes: sm, md, lg */}

<Loader fullPage /> {/* Full page loader */}
```

---

### Create a New Page
1. Create folder: `src/pages/PageName/`
2. Create component: `PageName.jsx`
3. Create styles: `pageName.css`
4. Import in `App.jsx`

```jsx
// src/pages/Menu/Menu.jsx
import "./menu.css";

export default function Menu() {
  return <div className="menu-page">{/* Content */}</div>;
}
```

---

### Add Page Styles with Animations
```css
/* src/pages/Menu/menu.css */

.menu-page {
  animation: fadeInUp 0.8s ease-out;
}

.menu-item {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: 0.1s;
}

/* Use available animations:
   fadeInUp, fadeInDown, slideInLeft, slideInRight,
   scaleIn, bounce, float, pulse, spin
*/
```

---

### Responsive Styling
```css
/* Desktop (default) */
.container {
  padding: 48px;
}

/* Tablet */
@media (max-width: 768px) {
  .container {
    padding: 24px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .container {
    padding: 16px;
  }
}
```

---

## 🎨 Styling Cheat Sheet

### Colors
```
Primary: #ff6b00 (Orange)
Secondary: #ff9b42 (Light Orange)
Background: #ffffff (White)
Text Dark: #1e1e1e (Almost Black)
Text Gray: #666 (Medium Gray)
Border: #f0f0f0 (Light Gray)
Light BG: #f8f9fa (Off-white)
```

### Spacing
```
Margin/Padding: 8px, 16px, 24px, 32px, 48px
Gaps: 12px, 20px, 30px, 40px
Border Radius: 6px (controls), 8px (buttons), 12px (cards)
```

### Shadows
```css
/* Subtle shadow */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

/* Medium shadow */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

/* Strong shadow */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

/* Orange shadow (for primary elements) */
box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
```

### Typography
```css
/* Headings */
h1 { font-size: 56px; font-weight: 700; }
h2 { font-size: 44px; font-weight: 700; }
h3 { font-size: 32px; font-weight: 700; }

/* Body */
p { font-size: 16px; color: #666; line-height: 1.6; }

/* Small */
small, .text-sm { font-size: 14px; }
```

---

## 🎬 Animation Quick Reference

### Entrance Animations (Fade/Slide in)
```css
animation: fadeInUp 0.8s ease-out;
animation: fadeInDown 0.8s ease-out;
animation: slideInLeft 0.8s ease-out;
animation: slideInRight 0.8s ease-out;
animation: scaleIn 0.6s ease-out;
```

### Loop Animations (Continuous)
```css
animation: bounce 3s ease-in-out infinite;
animation: float 6s ease-in-out infinite;
animation: pulse 2s ease-in-out infinite;
animation: spin 1s linear infinite;
```

### With Delay (for list items)
```css
animation: fadeInUp 0.6s ease-out;
animation-delay: 0.2s;

/* Or use CSS variable */
animation-delay: var(--delay);
/* Set in JSX: style={{ "--delay": `${index * 0.1}s` }} */
```

---

## 🔗 API Integration

### Fetch Data
```jsx
import { useFetch } from "./hooks/useFetch";

function Menu() {
  const { data, loading, error } = useFetch("/api/menu");

  if (loading) return <Loader fullPage />;
  if (error) return <p>Error loading menu</p>;

  return <div>{/* Display data */}</div>;
}
```

### Post Data
```jsx
const response = await fetch("/api/booking", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

---

## 📱 Breakpoints
- **Desktop**: 769px and above
- **Tablet**: 481px to 768px  
- **Mobile**: 480px and below

---

## ✨ Best Practices

1. **Always use components**: Button, Card, Modal, Loader
2. **Keep styles modular**: One `.css` file per component
3. **Use CSS variables**: For repeated values
4. **Mobile first**: Design for mobile, enhance for desktop
5. **Animate smoothly**: 0.3s-0.8s transitions
6. **Test responsive**: Check all breakpoints
7. **Keep it simple**: No complex CSS, prefer CSS Grid/Flexbox

---

## 🐛 Troubleshooting

### Component not showing?
- Check imports: `import Component from "./path"`
- Check CSS import: `import "./component.css"`
- Check class names: Should match CSS

### Animation not working?
- Add animation to class: `animation: fadeInUp 0.8s ease-out;`
- Use correct animation name from available list
- Check animation timing (duration, delay)

### Responsive not working?
- Check media query max-width values (768px, 480px)
- Use `max-width` not `width` in queries
- Test with browser DevTools (F12)

---

## 📚 Full Documentation

See `FRONTEND_DEVELOPMENT_GUIDE.md` for complete details on:
- Architecture and folder structure
- All components and usage
- Animation system
- Styling guidelines
- Development workflow
- File organization best practices

---

## 🚀 Ready to Build!

Everything is setup and ready. Start by:
1. Running `npm run dev`
2. Checking the landing page
3. Creating new pages in `src/pages/`
4. Using the component library
5. Building out features

Happy coding! 🎉
