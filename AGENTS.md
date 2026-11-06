# TABARK — COMPLETE FRONTEND DEVELOPMENT CONTEXT

## 1. Project Overview

**Project Name:** Tabark  
**Project Type:** Modern Minimalist E-commerce Startup  
**Development Approach:** Mobile-First, Responsive, Performance-Focused  
**Architecture:** Next.js App Router  
**Primary Goal:** Build a premium, modern, minimalist, and fully functional e-commerce website.

### Project Vision

Tabark is a modern e-commerce brand focused on delivering a clean, elegant, and seamless online shopping experience.

The website should communicate simplicity, sophistication, trust, and quality through thoughtful design, refined typography, high-quality imagery, and exceptionally smooth interactions.

The overall design direction should feel like a combination of premium DTC brands, modern editorial websites, and sophisticated e-commerce experiences.

The website must not look like a generic e-commerce template.

### Core Design Philosophy

- Minimalism over unnecessary decoration.
- Visual storytelling over excessive text.
- Functionality over visual gimmicks.
- Smooth interactions over aggressive animations.
- Clear navigation and intuitive shopping experiences.
- Premium aesthetics with functional simplicity.
- Performance and accessibility without compromise.
- Mobile-first development with universal responsiveness.

The final experience should feel intentionally designed, professionally crafted, and ready for a real e-commerce startup.

---

## 2. Frontend Technology Stack

Use the following technologies throughout the project.

| Technology | Purpose |
|---|---|
| Next.js | Main frontend framework |
| TypeScript | Type safety and maintainability |
| Tailwind CSS | Styling and responsive layouts |
| shadcn/ui | Accessible and customizable UI components |
| Lucide React | Lightweight iconography |
| Motion | UI animations and transitions |
| GSAP | Advanced animations and scroll interactions |
| Lottie React | Vector-based animations |
| React Hook Form | Form handling and validation |
| next-themes | Dark and light theme management |

### Technology Implementation Rules

**Next.js**
- Use the App Router architecture.
- Prefer Server Components by default.
- Use Client Components only when interactivity is required.
- Implement proper loading, error, and not-found states.
- Use Next.js Image for image optimization.

**Tailwind CSS**
- Establish a consistent design system.
- Use responsive utility classes.
- Avoid unnecessary custom CSS.
- Use reusable styling patterns.
- Maintain consistent spacing and typography.

**shadcn/ui**
- Use accessible, customizable UI primitives.
- Customize components to match Tabark's visual identity.
- Avoid using default component styling without refinement.

**Motion**
- Use for interface animations, hover interactions, entrance animations, and transitions.
- Keep animations subtle and natural.

**GSAP**
- Use for advanced scroll-based animations, timelines, and controlled visual storytelling.
- Use ScrollTrigger when appropriate.
- Clean up animations and ScrollTriggers when components unmount.

**Lottie React**
- Use only where vector animations provide meaningful visual value.
- Avoid unnecessary decorative animations.

**React Hook Form**
- Use for forms, validation, and submission states.
- Integrate schema validation where appropriate.

**next-themes**
- Implement consistent theme management.
- Ensure all components support the active theme.

### Important Animation Architecture Rule

Avoid running multiple animation systems on the same element.

Use Motion for standard UI interactions and GSAP for advanced timeline or scroll-driven experiences. Use CSS transitions for simple state changes.

---

## 3. Visual Identity & Design Direction

### Overall Aesthetic

Tabark should have a:
- Minimalist aesthetic.
- Premium editorial appearance.
- Clean and spacious composition.
- Modern typography.
- Subtle visual hierarchy.
- Refined micro-interactions.
- Consistent visual language.

### Color Palette

Use a restrained and sophisticated color palette.

Suggested foundation:

- Primary background: Warm white / off-white.
- Secondary background: Soft beige or light gray.
- Primary text: Near-black.
- Secondary text: Muted gray.
- Borders: Very light neutral gray.
- Accent: One sophisticated brand color.

Avoid:
- Excessive gradients.
- Unnecessary bright colors.
- Heavy shadows.
- Overly decorative elements.
- Inconsistent accent colors.

Colors should be implemented through reusable design tokens so the entire website can be updated consistently.

### Typography

Use modern, clean typography.

Establish a clear hierarchy between:

- Hero headings.
- Section headings.
- Product names.
- Product prices.
- Navigation links.
- Product descriptions.
- Buttons and labels.
- Supporting information.

Typography should feature generous spacing, appropriate font weights, and comfortable line heights.

### Layout Principles

- Generous whitespace.
- Consistent horizontal padding.
- Well-balanced grid systems.
- Large, high-quality product imagery.
- Clean alignment.
- Consistent section spacing.
- Responsive container widths.
- Balanced visual composition.

The website should never feel overcrowded.

---

## 4. Mobile-First Design & Universal Responsiveness

**Mobile-first development is a mandatory architectural requirement.**

Build every page and component starting from mobile screen sizes, then progressively enhance the experience for tablets, laptops, desktops, and ultra-wide displays.

Mobile must not simply be a scaled-down desktop version. Every layout must be intentionally adapted to its screen size and interaction method.

### Responsive Breakpoints

Use Tailwind CSS breakpoints as a starting point:

| Device | Screen Width |
|---|---|
| Small mobile | 320px–374px |
| Standard mobile | 375px–639px |
| Large mobile | 640px–767px |
| Tablet | 768px–1023px |
| Laptop | 1024px–1279px |
| Desktop | 1280px–1535px |
| Large desktop | 1536px+ |

Layouts must remain balanced at intermediate widths, not just at predefined breakpoints.

### Mobile-First Development Rules

- Start with mobile layouts and styles.
- Progressively enhance larger screens.
- Avoid fixed widths that cause overflow.
- Use flexible grids, Flexbox, and CSS Grid.
- Use fluid typography with CSS `clamp()` where appropriate.
- Use responsive spacing and container widths.
- Maintain consistent image aspect ratios.
- Adapt navigation to smaller screens.
- Avoid unnecessary content duplication between breakpoints.
- Ensure every component works independently at different widths.

### Responsive Navigation

**Mobile**
- Compact header.
- Minimal logo and icon-based actions.
- Animated navigation drawer.
- Touch-friendly navigation links.
- Accessible search and cart interactions.

**Tablet**
- Adapted navigation with appropriate spacing.
- Maintain clear access to shopping actions.

**Desktop**
- Full navigation menu.
- Balanced horizontal spacing.
- Refined hover interactions.
- Optional mega-menu for larger collections.

### Responsive Product Experience

- Use 2-column product grids on standard mobile where appropriate.
- Adapt card spacing to screen width.
- Use larger product grids on tablets and desktops.
- Maintain image proportions.
- Make product galleries swipe-friendly.
- Keep variant selectors and quantity controls touch-friendly.
- Make product information easy to read.
- Ensure important shopping actions remain accessible.

### Touch & Interaction Optimization

Every interactive element must work naturally with touch, mouse, keyboard, and trackpad.

- Minimum recommended touch target: 44 × 44px.
- Support swipe gestures where appropriate.
- Never depend exclusively on hover functionality.
- Provide visible active and pressed states.
- Prevent accidental interactions.
- Ensure modals and drawers fit smaller screens.
- Keep important actions reachable.
- Support keyboard navigation.

### Responsive Animation Behavior

- Use lighter animations on mobile when appropriate.
- Avoid excessive parallax on touch devices.
- Prevent scroll-triggered animation conflicts.
- Keep carousels smooth on touch screens.
- Avoid animations that cause layout shifts.
- Respect reduced-motion preferences.
- Maintain fluid transitions on lower-powered devices.

### Cross-Device Testing

Test the complete website on:

- iPhone SE and smaller mobile screens.
- Modern iPhone devices.
- Small and large Android phones.
- iPads and Android tablets.
- Small laptops.
- Standard desktop monitors.
- Large and ultra-wide displays.

Also test:
- Portrait and landscape orientations.
- Different browser viewport sizes.
- Touch and mouse interactions.
- Mobile Safari and Chrome.
- Keyboard navigation.
- Browser zoom up to 200%.

### Responsive Quality Standard

At every screen size:

1. No unwanted horizontal scrolling.
2. No clipped text or overflowing components.
3. No broken image proportions.
4. No overlapping UI elements.
5. No inaccessible buttons or navigation.
6. No inconsistent spacing.
7. No broken modal or drawer layouts.
8. No animation performance issues.
9. No loss of essential functionality.
10. No compromise in the premium visual identity.

---

## 5. Website Structure & Page Sections

### A. Announcement Bar

A minimal announcement bar for promotions, shipping information, or important brand messages.

Requirements:
- Subtle background contrast.
- Short and clear messaging.
- Optional dismiss functionality.
- Smooth entrance and exit transitions.
- Responsive typography.

### B. Navigation / Header

Include:
- Tabark brand logo.
- Main navigation links.
- Shop / Collections.
- Search icon.
- Account icon.
- Shopping bag icon with live item count.

Requirements:
- Sticky header where appropriate.
- Clean desktop navigation.
- Animated mobile navigation drawer.
- Smooth dropdown transitions.
- Accessible keyboard interactions.
- Responsive layout.

### C. Hero Section

The hero should immediately communicate the brand identity.

Include:
- Large editorial-style hero image or visual.
- Bold, concise headline.
- Short supporting description.
- Primary CTA.
- Optional secondary CTA.

Design requirements:
- Strong visual hierarchy.
- Generous whitespace.
- Balanced text and imagery.
- Subtle entrance animations.
- Responsive composition.
- High-quality image treatment.

### D. Featured Collections

Include:
- Editorial collection cards.
- Large imagery.
- Minimal text overlays or labels.
- Smooth hover transitions.
- Responsive grid layout.

Collection cards should feel like editorial visual stories rather than ordinary category boxes.

### E. Featured Products

Include:
- Product card grid.
- Product images.
- Product names.
- Product prices.
- Optional badges.
- Quick-add functionality.
- Wishlist interaction where appropriate.

Product card requirements:
- Subtle image zoom or image switching.
- Smooth hover transitions.
- Clear product information.
- Responsive card dimensions.
- Accessible shopping actions.

### F. Brand Story / Editorial Section

Use this section to communicate Tabark's identity.

Include:
- Large editorial imagery.
- Short brand-focused storytelling.
- Asymmetric layouts where appropriate.
- Minimal CTA.
- Smooth image reveal animations.

### G. Promotional / Campaign Section

Include:
- Featured campaign or seasonal collection.
- Strong visual presentation.
- Minimal text.
- Clear CTA.
- Responsive image treatment.

### H. Newsletter Section

Include:
- Minimal subscription form.
- Email validation using React Hook Form.
- Clear success and error feedback.
- Smooth submission states.
- Accessible labels and feedback.

### I. Footer

Include:
- Brand logo.
- Short brand description.
- Navigation links.
- Customer support links.
- Social media links.
- Newsletter entry point where appropriate.
- Copyright information.
- Shipping and payment information where relevant.

The footer should remain minimal and organized.

---

## 6. Essential E-commerce Functionality

The website must provide a real, functional shopping experience.

Implement:

### Product Management Interface
- Product listing pages.
- Product detail pages.
- Product image galleries.
- Product variants.
- Product availability.
- Product descriptions.
- Pricing information.
- Related products.

### Shopping Experience
- Add-to-cart functionality.
- Shopping cart.
- Quantity controls.
- Remove-from-cart functionality.
- Cart drawer.
- Live cart item count.
- Wishlist functionality.
- Product search.
- Category filtering.
- Sorting.
- Responsive checkout entry point.

### User Experience
- User account interface.
- Authentication integration when backend services are available.
- Form validation.
- Loading states.
- Empty states.
- Error states.
- Success notifications.

### Functional Requirements

Every interactive element must have meaningful functionality.

Never create decorative buttons that do nothing.

Do not simulate successful purchases, authentication, or form submissions without a real implementation.

Keep frontend components ready for integration with an e-commerce backend, product API, payment gateway, and inventory system.

---

## 7. Animation & Interaction Design

**This is one of the highest-priority requirements of the entire project.**

Every animation, modal, carousel, drawer, dropdown, and scrolling interaction must feel exceptionally smooth, polished, and intentional.

The website should feel fluid and responsive rather than heavily animated.

### Animation Principles

- Use natural easing curves.
- Prefer subtle motion.
- Avoid sudden transitions.
- Avoid excessive bouncing.
- Avoid unnecessary animation on every element.
- Maintain consistent animation timing.
- Prioritize responsiveness.
- Never sacrifice usability for animation.

### Recommended Animation Timing

| Interaction | Duration |
|---|---|
| Button hover | 150–250ms |
| Icon interaction | 150–250ms |
| Dropdown | 200–300ms |
| Modal | 250–400ms |
| Drawer | 300–450ms |
| Page transitions | 300–500ms |
| Image transitions | 400–700ms |
| Scroll reveals | 500–800ms |

These are starting guidelines, not rigid requirements.

### Modal & Drawer Animations

Every modal and drawer should include:

- Smooth opacity transitions.
- Subtle scale or slide transitions.
- Proper background overlay.
- Smooth opening and closing.
- Click-outside behavior where appropriate.
- Escape-key support.
- Background scroll locking.
- Focus management.
- Accessible keyboard interactions.
- Responsive dimensions.

### Carousel Animations

Every carousel must feature:

- Smooth sliding transitions.
- Touch and swipe support.
- Responsive behavior.
- Clear navigation controls.
- Proper drag interactions.
- Smooth momentum where appropriate.
- No abrupt snapping unless intentionally designed.

Avoid unnecessary autoplay.

### Scroll Animations

Use Motion and GSAP where appropriate.

Examples:
- Subtle fade-in.
- Fade-up.
- Image reveal.
- Staggered product card entrances.
- Gentle parallax effects.
- Sticky section transitions.
- Smooth section reveals.

Avoid excessive scroll-triggered effects that negatively affect usability.

### Hover Interactions

Buttons, links, cards, and icons should provide subtle visual feedback.

Examples:
- Smooth color transitions.
- Subtle image zoom.
- Underline animations.
- Small icon movement.
- Soft opacity transitions.
- Gentle background changes.

### Smooth Scrolling

Scrolling should feel natural and uninterrupted.

- Avoid aggressive scroll hijacking.
- Prefer native browser scrolling.
- Use smooth anchor navigation where appropriate.
- Avoid unnecessarily heavy scroll listeners.
- Keep sticky elements stable.
- Ensure GSAP ScrollTrigger instances are properly cleaned up.
- Respect reduced-motion preferences.

### Animation Accessibility

- Support `prefers-reduced-motion`.
- Never make essential information dependent on animation.
- Ensure keyboard and screen-reader users can access all functionality.
- Avoid flashing or disorienting effects.

---

## 8. Component Architecture & Project Structure

Maintain a clean, scalable, and reusable component architecture.

Suggested structure:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   │
│   ├── shop/
│   │   └── page.tsx
│   │
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── collections/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── cart/
│   │   └── page.tsx
│   │
│   └── checkout/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── AnnouncementBar.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── Collections.tsx
│   │   ├── BrandStory.tsx
│   │   └── Newsletter.tsx
│   │
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx
│   │   └── ProductFilters.tsx
│   │
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   └── CartItem.tsx
│   │
│   └── ui/
│
├── hooks/
├── lib/
├── types/
├── data/
└── styles/
```

### Architecture Guidelines

- Keep components modular and reusable.
- Separate business logic from UI.
- Use reusable hooks for shared functionality.
- Keep product and cart types strongly typed.
- Centralize shared utilities.
- Avoid oversized components.
- Avoid unnecessary prop drilling.
- Maintain consistent naming conventions.
- Use a predictable state management approach.
- Keep the architecture ready for future expansion.

---

## 9. Design System & UI Consistency

Create a consistent design system before implementing the entire website.

Establish reusable tokens for:

- Brand colors.
- Background colors.
- Text colors.
- Typography.
- Font sizes.
- Spacing.
- Container widths.
- Border radius.
- Border colors.
- Shadows.
- Animation durations.
- Easing functions.
- Z-index layers.

Create reusable UI components for:

- Buttons.
- Inputs.
- Selects.
- Badges.
- Product cards.
- Navigation links.
- Modals.
- Drawers.
- Dropdowns.
- Tooltips.
- Loading indicators.
- Notifications.

All components must follow the same visual language.

Avoid inconsistent styling between different pages.

---

## 10. Performance & Optimization

Performance is a core requirement, not a final optimization step.

Implement:

- Next.js image optimization.
- Lazy loading.
- Code splitting.
- Efficient component rendering.
- Optimized animation rendering.
- Proper font loading.
- Reduced unnecessary JavaScript.
- Avoidance of layout shifts.
- Lightweight assets.
- Proper loading and skeleton states.
- Dynamic imports for heavy client-side components where appropriate.

### Animation Performance

- Prefer `transform` and `opacity` animations.
- Avoid unnecessary layout recalculations.
- Avoid animating expensive CSS properties.
- Avoid excessive GSAP timelines.
- Use `will-change` only when justified.
- Clean up animation instances and event listeners.
- Avoid multiple animation libraries controlling the same element.

### Performance Goals

Target:
- Excellent Core Web Vitals.
- Fast initial page loading.
- Smooth interactions on mobile.
- Stable layouts.
- Efficient image delivery.
- Minimal unnecessary client-side JavaScript.

The experience must remain smooth on lower-powered mobile devices.

---

## 11. Accessibility & Usability

Accessibility must be integrated into every component.

Implement:

- Semantic HTML.
- Accessible labels.
- Keyboard navigation.
- Visible focus states.
- Appropriate ARIA attributes.
- Accessible modal behavior.
- Proper color contrast.
- Screen-reader-friendly controls.
- Descriptive image alt text.
- Reduced-motion support.
- Form validation feedback.

All primary interactions must be usable without a mouse.

Do not sacrifice accessibility for visual effects.

---

## 12. Quality Assurance & Testing

Test every page and component before considering the project complete.

### Functional Testing

Verify:
- Navigation links.
- Search functionality.
- Product filtering.
- Product sorting.
- Product detail interactions.
- Product image galleries.
- Add-to-cart.
- Quantity updates.
- Cart drawer.
- Wishlist.
- Form validation.
- Theme switching.
- Modal opening and closing.
- Carousel interactions.

### Responsive Testing

Test:
- 320px mobile screens.
- 375px mobile screens.
- 430px mobile screens.
- 768px tablets.
- 1024px laptops.
- 1280px desktops.
- 1440px desktops.
- 1920px large displays.

Also test intermediate widths, landscape orientation, and browser zoom.

### Visual Testing

Verify:
- Consistent spacing.
- Typography hierarchy.
- Image quality.
- Grid alignment.
- Responsive layouts.
- Hover states.
- Animation quality.
- Modal and drawer positioning.
- Light and dark theme consistency.

### Final Quality Standard

No broken layouts, dead buttons, horizontal overflow, unnecessary loading delays, broken animations, or inaccessible interactions.

---

## 13. Final Development Instructions

Build Tabark as a complete, polished, modern minimalist e-commerce experience.

Do not focus only on making the website visually attractive.

Every part of the interface must be:

- Functional.
- Responsive.
- Accessible.
- Performance-conscious.
- Consistent.
- Easy to maintain.
- Ready for backend integration.

Follow a mobile-first approach from the beginning.

Do not implement desktop layouts first and attempt to adapt them to mobile afterward.

Treat animation and interaction quality as a global design-system standard, not something implemented independently by each component.

Every modal, carousel, drawer, dropdown, page transition, hover interaction, and scroll animation must feel exceptionally smooth.

Avoid unnecessary visual complexity. Every design decision should have a clear purpose.

### Final Experience Goals

The finished Tabark website should feel:

- Minimal.
- Premium.
- Elegant.
- Modern.
- Fast.
- Fluid.
- Intuitive.
- Responsive.
- Professionally crafted.

**The ultimate objective is to create a premium e-commerce experience where simplicity, visual quality, responsive design, performance, and interaction quality work together seamlessly.**

### Final Design Principle

LESS VISUAL NOISE.  
MORE INTENTIONAL DESIGN.  
SMOOTHER INTERACTIONS.  
BETTER USER EXPERIENCE.