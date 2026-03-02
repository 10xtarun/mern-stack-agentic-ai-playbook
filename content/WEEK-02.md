# Week 2: Advanced CSS & Design Systems

## 📌 Week Overview

Master professional CSS techniques: Flexbox, Grid, positioning, accessibility, and building reusable design systems.

---

## 🎯 Learning Outcomes

- ✅ Master Flexbox & Grid layouts
- ✅ Understand CSS positioning (static, relative, absolute, fixed, sticky)
- ✅ Implement animations & transitions
- ✅ Build accessible color systems
- ✅ Create reusable CSS components

---

## 📊 Key Concepts

### Flexbox Deep Dive [^1]

```css
.flex-container {
    display: flex;
    flex-direction: row;              /* row, column, row-reverse */
    justify-content: center;          /* align horizontally */
    align-items: center;              /* align vertically */
    gap: 16px;                        /* space between items */
    flex-wrap: wrap;                  /* wrap to new line */
}

.flex-item {
    flex: 1;                          /* grow equally */
    flex: 0 1 200px;                  /* no-grow, shrink, basis */
    order: 1;                         /* visual order */
}
```

**Use Flexbox for**: Navigation menus, component layouts, card grids (1D layouts)

### CSS Grid [^2]

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
    grid-template-rows: auto 1fr auto;      /* header, content, footer */
    gap: 20px;
    grid-auto-flow: dense;                  /* fill gaps smartly */
}

.grid-item {
    grid-column: span 2;                    /* span 2 columns */
    grid-row: 1 / 3;                        /* start/end row */
}

/* Responsive grid */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}
```

**Use Grid for**: Page layouts, dashboards, complex 2D layouts

### Positioning [^3]

```css
.static {
    position: static;        /* default, in normal flow */
}

.relative {
    position: relative;      /* relative to normal position */
    top: 10px;
    left: 20px;
}

.absolute {
    position: absolute;      /* relative to nearest positioned parent */
    top: 0;
    right: 0;
}

.fixed {
    position: fixed;         /* relative to viewport */
    top: 0;
    z-index: 1000;           /* stack order */
}

.sticky {
    position: sticky;        /* hybrid: relative + fixed when scrolling */
    top: 0;
}
```

### Animations & Transitions [^4]

```css
/* Transition: smooth change between states */
.button {
    background: blue;
    transition: background 0.3s ease-in-out;  /* property, duration, timing */
}

.button:hover {
    background: darkblue;
}

/* Animation: complex, repeated movements */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.header {
    animation: slideIn 0.5s ease-out forwards;  /* duration, timing, fill-mode */
}

/* Common animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Accessibility in CSS [^5]

```css
/* Color contrast: 4.5:1 for normal text (WCAG AA) [^6] */
.text {
    color: #333;           /* dark on light = good contrast */
    background: #fff;
}

/* Don't use color alone to convey info */
/* ❌ BAD */
.error { color: red; }     /* colorblind users won't see it */

/* ✅ GOOD */
.error {
    color: red;
    border-left: 4px solid red;
    padding-left: 8px;
}

/* Focus states required for keyboard navigation */
button:focus {
    outline: 2px solid #333;
    outline-offset: 2px;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

@media (prefers-color-scheme: dark) {
    body {
        background: #1a1a1a;
        color: #fff;
    }
}
```

---

## 💻 Daily Tasks

### Days 1-2: Flexbox Mastery

**Exercise**: Create a responsive navigation bar using Flexbox

```html
<nav class="navbar">
    <div class="nav-logo">YourName</div>
    <ul class="nav-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="hamburger">☰</div>
</nav>
```

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: var(--primary);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 30px;
}

.hamburger {
    display: none;
    font-size: 24px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hamburger {
        display: block;
    }
}
```

**Commit**: `style(portfolio): add responsive flexbox navbar`

### Days 3-4: CSS Grid & Complex Layouts

**Exercise**: Create a portfolio grid layout

```css
.portfolio-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 40px;
}

.project-card {
    grid-column: span 1;
}

.featured-project {
    grid-column: span 2;     /* featured project spans 2 columns */
}

@media (max-width: 768px) {
    .featured-project {
        grid-column: span 1;  /* full width on mobile */
    }
}
```

**Commit**: `style(portfolio): create CSS grid layout for projects`

### Days 5-6: Animations & Polish

**Exercise**: Add smooth animations to portfolio

```css
.project-card {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
}

.project-card:nth-child(1) { animation-delay: 0.1s; }
.project-card:nth-child(2) { animation-delay: 0.2s; }
.project-card:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Button interactions */
.btn {
    transition: all 0.3s ease;
    transform: translateY(0);
}

.btn:hover {
    background: darken(var(--primary), 10%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn:active {
    transform: translateY(0);
}
```

**Commit**: `style(portfolio): add animations and polish`

### Day 7: Accessibility Audit & Testing

**Checklist**:
- [ ] All text has 4.5:1 contrast ratio
- [ ] All buttons have focus states
- [ ] Page works with keyboard navigation (Tab key)
- [ ] Respects `prefers-reduced-motion`
- [ ] Works in light & dark modes

**Tools**:
- https://webaim.org/resources/contrastchecker/ (Contrast checker)
- Chrome DevTools → Lighthouse (Accessibility audit)
- https://www.axe-devtools.com/ (Accessibility testing)

---

## 🎨 Color System Best Practices [^7]

```css
:root {
    /* Primary colors */
    --primary-50: #f0f5fa;
    --primary-100: #e0eaf4;
    --primary-500: #2d5f8d;
    --primary-700: #1a3a52;
    
    /* Secondary colors */
    --secondary-500: #70c1b3;
    
    /* Semantic colors */
    --success: #4caf50;
    --warning: #ff9800;
    --error: #f44336;
    --info: #2196f3;
    
    /* Neutral colors */
    --gray-50: #f9fafb;
    --gray-900: #111827;
    
    /* Spacing scale */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
}
```

---

## 📋 Week 2 Checklist

- [ ] Navbar is responsive with Flexbox
- [ ] Projects grid uses CSS Grid
- [ ] Smooth animations on page load
- [ ] All interactive elements have hover/focus states
- [ ] Accessibility audit passed (4.5:1 contrast)
- [ ] Works in light & dark modes
- [ ] Responsive at all breakpoints
- [ ] Git commits for each day

---

## 📚 Citations

[^1]: MDN Flexbox - https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
[^2]: MDN Grid - https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids
[^3]: MDN Positioning - https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
[^4]: MDN Animations - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations
[^5]: WCAG 2.1 - https://www.w3.org/WAI/WCAG21/quickref/
[^6]: WebAIM Contrast - https://webaim.org/articles/contrast/
[^7]: Design Tokens - https://www.figma.com/design-system/

**Next**: [WEEK-03.md](./WEEK-03.md) - JavaScript Fundamentals
