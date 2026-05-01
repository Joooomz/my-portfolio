# Light Mode & Neutral Typography Redesign Guide

## ✅ Completed Updates
- **index.css** - Global colors, typography, backgrounds
- **CircuitCanvas.jsx** - Canvas animation colors (cyan → light gray)

## Color Palette Reference

### Old → New Color Mapping
| Element | Old Color | New Color | Hex |
|---------|-----------|-----------|-----|
| Background | #05050a | #fafafa | Off-white |
| Surface/Cards | #0a0c17 | #ffffff | White |
| Text Primary | #f2f2f7 | #1a1a1a | Dark gray |
| Text Muted | #8d90a0 | #808080 | Medium gray |
| Accent | #6effc0 | #2c2c2c | Charcoal |
| Border | rgba(110,255,192,0.14) | #e0e0e0 | Light gray |
| Accent-soft | rgba(110,255,192,0.16) | rgba(44,44,44,0.06) | Subtle gray |

### Typography Changes
- **Headings**: `Bebas Neue` → `Space Mono` (700 weight, monospace)
- **Body Text**: `Crimson Pro` → `Inter` (400 weight, sans-serif)
- **UI/Buttons**: `IBM Plex Mono` → `Space Mono` (500-700 weight, monospace)
- **Base Font Size**: 18px → 16px
- **Line Height**: 1.75 → 1.6

---

## Component Update Checklist

### 1. **Hero.jsx** ⚠️ Needs Update
**Key Changes:**
- Background: `radial-gradient(...)` → `linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)`
- `.hero-avatar-box`: border `rgba(110,255,192,0.26)` → `#e0e0e0`
- `.hero-avatar-initials`: `color: #6effc0` → `color: #2c2c2c`
- `.hero-badge`: `color: #6effc0` → `color: #2c2c2c`, `border: rgba(110,255,192,0.2)` → `border: #e0e0e0`
- `.hero-name`: `color: #f5f5f9` → `color: #1a1a1a`
- `.hero-name-accent`: `color: #6effc0` → `color: #2c2c2c`
- `.hero-tagline`: `color: #b8bcc9` → `color: #666666`
- All font families: Update `Bebas Neue` → `Space Mono`, `IBM Plex Mono` → `Space Mono`

**Theme Colors to Find & Replace:**
- `#6effc0` → `#2c2c2c` (primary accent)
- `#f5f5f9` → `#1a1a1a` (light text)
- `#b8bcc9` → `#666666` (muted text)
- `rgba(110,255,192,...)` → `rgba(44,44,44,...)` or `#e0e0e0` (borders/accents)

---

### 2. **Navbar.jsx** ⚠️ Needs Update
**Key Changes:**
- `.navbar-shell`: `background: rgba(8,8,16,0.95)` → `background: rgba(255,255,255,0.92)`
- `.navbar-shell`: `border-bottom: 1px solid #1e1e30` → `border-bottom: 1px solid #e0e0e0`
- `.navbar-logo`: `color: #6effc0` → `color: #1a1a1a`
- `.navbar-link`: `color: #88889a` → `color: #666666`
- `.navbar-link:hover`: `color: #6effc0` → `color: #2c2c2c`
- `.navbar-link-underline`: `background: #6effc0` → `background: #2c2c2c`
- `.mobile-menu`: `background: rgba(8,8,16,0.99)` → `background: #ffffff`
- `.mobile-menu`: `border-bottom: 1px solid #1e1e30` → `border-bottom: 1px solid #e0e0e0`

---

### 3. **Footer.jsx** ⚠️ Needs Update
**Key Changes:**
- `.footer`: `background: #080810` → `background: #fafafa`
- `.footer`: `border-top: 1px solid #1e1e30` → `border-top: 1px solid #e0e0e0`
- `.footer-logo`: `color: #6effc0` → `color: #1a1a1a`
- `.footer-nav-link`: `color: #88889a` → `color: #666666`
- `.footer-nav-link:hover`: `color: #6effc0` → `color: #2c2c2c`
- `.footer-copy`: `color: #55556a` → `color: #999999`
- `.footer-social-link`: `color: #88889a` → `color: #666666`
- `.footer-social-icon`: `color: #6effc0` → `color: #2c2c2c`

---

### 4. **Skills.jsx** ⚠️ Needs Update
**Key Changes:**
- `.skills-section`: Remove dark background, use light
- `.skill-card`: `background: rgba(255,255,255,0.04)` → `background: #f9f9f9`
- `.skill-card-hovered`: `background: rgba(110,255,192,0.03)` → `background: #f0f0f0`
- `.skill-category`: `color: #6effc0` → `color: #2c2c2c`
- `.skill-name`: `color: #dddde8` → `color: #1a1a1a`
- `.skill-desc`: `color: #88889a` → `color: #666666`
- `.skill-bar`: `background: #1e1e30` → `background: #e0e0e0`
- `.skill-bar-fill`: `background: linear-gradient(to right, #6effc0, #a8ffd8)` → `background: linear-gradient(to right, #2c2c2c, #555555)`

---

### 5. **About.jsx** ⚠️ Needs Update
**Key Changes:**
- `.about-eyebrow`: `color: #6effc0` → `color: #2c2c2c`
- `.about-title`: `color: #ffffff` → `color: #1a1a1a`
- `.about-paragraph`: `color: #b7bbc8` → `color: #666666`
- `.stat-card`: `background: rgba(255,255,255,0.04)` → `background: #f9f9f9`
- `.stat-card`: `border: 1px solid rgba(110,255,192,0.12)` → `border: 1px solid #e0e0e0`
- `.stat-number`: `color: #ffffff` → `color: #1a1a1a`
- `.stat-label`: `color: #b8bcc9` → `color: #666666`
- `.about-side-card`: Same card styling updates

---

### 6. **Experience.jsx** ⚠️ Needs Update
**Key Changes:**
- `.experience-eyebrow`: `color: #6effc0` → `color: #2c2c2c`
- `.experience-title`: `color: #ffffff` → `color: #1a1a1a`
- `.timeline-item`: `background: rgba(255,255,255,0.04)` → `background: #f9f9f9`
- `.timeline-item`: `border: 1px solid rgba(110,255,192,0.12)` → `border: 1px solid #e0e0e0`
- `.timeline-item.current`: `border-color: rgba(110,255,192,0.36)` → `border-color: #2c2c2c`
- `.timeline-item.current`: `box-shadow: 0 0 40px rgba(110,255,192,0.08)` → `box-shadow: 0 0 20px rgba(44,44,44,0.08)`
- `.skill-tag`: `background: rgba(110,255,192,0.1)` → `background: #f0f0f0`
- `.skill-tag`: `color: #6effc0` → `color: #2c2c2c`
- `.cert-item`: `background: rgba(10,14,28,0.72)` → `background: #f5f5f5`
- `.cert-item`: `border: 1px solid rgba(110,255,192,0.08)` → `border: 1px solid #e0e0e0`
- `.cert-name`: `color: #ffffff` → `color: #1a1a1a`

---

### 7. **Projects.jsx** ⚠️ Needs Update
**Key Changes:**
- `.projects-eyebrow`: `color: #6effc0` → `color: #2c2c2c`
- `.projects-title`: `color: #ffffff` → `color: #1a1a1a`
- `.project-card`: `background: rgba(255,255,255,0.04)` → `background: #f9f9f9`
- `.project-card`: `border: 1px solid rgba(110,255,192,0.12)` → `border: 1px solid #e0e0e0`
- `.project-symbol`: `background: rgba(110,255,192,0.14)` → `background: #e8e8e8`
- `.project-symbol`: `color: #6effc0` → `color: #2c2c2c`
- `.project-name`: `color: #ffffff` → `color: #1a1a1a`
- `.project-desc`: `color: #b8bcc9` → `color: #666666`
- `.project-tag`: `background: rgba(10,14,28,0.88)` → `background: #f0f0f0`
- `.project-tag`: `color: #b8bcc9` → `color: #666666`

---

### 8. **Contact.jsx** ⚠️ Needs Update
**Key Changes:**
- `.contact-label`: `color: #6effc0` → `color: #2c2c2c`
- `.contact-title`: `color: #dddde8` → `color: #1a1a1a`
- `.contact-intro`: `color: #88889a` → `color: #666666`
- `.contact-field`: `background: #080810` → `background: #f9f9f9`
- `.contact-field.focused`: `border-bottom-color: #6effc0` → `border-bottom-color: #2c2c2c`
- `.contact-input`: `color: #dddde8` → `color: #1a1a1a`
- `.contact-btn`: `background: #6effc0` → `background: #2c2c2c`
- `.contact-btn`: `color: #080810` → `color: #ffffff`
- `.contact-success`: `color: #6effc0` → `color: #2c2c2c`
- `.contact-success-dot`: `background: #6effc0` → `background: #2c2c2c`
- `.contact-card`: `background: rgba(255,255,255,0.04)` → `background: #f9f9f9`
- `.contact-card a:hover`: `color: #6effc0` → `color: #2c2c2c`

---

## Search & Replace Pattern (for IDE)

### Quick Global Replacements
Open **Find & Replace** in VS Code and apply these in each component file:

1. `#6effc0` → `#2c2c2c` (main accent)
2. `#f5f5f9` → `#1a1a1a` (light text)
3. `#dddde8` → `#1a1a1a` (light text)
4. `#88889a` → `#666666` (muted text)
5. `#b8bcc9` → `#666666` (muted text)
6. `#b7bbc8` → `#666666` (muted text)
7. `#08080a` → `#ffffff` (dark backgrounds)
8. `rgba(110,255,192,` → `rgba(44,44,44,` (accent transparency)
9. `rgba(110,255,192,0.08)` → `#e0e0e0` (accent borders)
10. `#1e1e30` → `#e0e0e0` (dark borders)

### Typography Replacements
11. `'Bebas Neue'` → `'Space Mono'` (headings)
12. `'IBM Plex Mono'` → `'Space Mono'` (UI text)
13. `'Crimson Pro'` → `'Inter'` (body text)

---

## Visual Summary

### Dark Mode (Old) → Light Mode (New)
- 🌙 Dark navy backgrounds → ☀️ Clean white/off-white
- 🟢 Neon cyan accents → ◼️ Subtle charcoal accents
- 💫 Glow effects → ✨ Soft shadows
- 📝 Serif body text → 🔤 Clean sans-serif

---

## Next Steps

1. Open each component file listed above
2. Use Find & Replace with the mapping above
3. Test in browser to verify colors and contrast
4. Check mobile responsiveness with light background

**Estimated Time**: 15-20 minutes to apply all replacements across 8 components
