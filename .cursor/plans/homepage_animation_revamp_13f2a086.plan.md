---
name: Homepage Animation Revamp
overview: Revamp the homepage animation sequence to feature the HeroName SVG with staggered letter paths, a centered description with SplitText animation, coordinated delay timing for header/navbar, and an ASCII gradient background that fades in at the end.
todos:
    - id: hero-name-animation
      content: Rewrite HeroSectionName to use HeroName SVG with staggered letter-path GSAP animation
      status: completed
    - id: description-restyle
      content: Center HeroSectionDescription for all breakpoints, reduce font size, update copy and add tagline
      status: completed
    - id: description-timing
      content: Adjust HeroSectionDescription delay to fire at 60-75% of HeroName animation
      status: completed
    - id: header-simplify
      content: "Simplify Header: remove 'Available for Work / View Resume', make thinner, keep Branding logo + animation"
      status: completed
    - id: navbar-fade
      content: Add GSAP fade-in animation to BottomNavbar gated on animationsReady + delay
      status: completed
    - id: ascii-background
      content: Port AsciiHeroBackground into project, adapt timing to use delay prop + animationsReady
      status: completed
    - id: page-layout
      content: 'Rework page.tsx layout: add ASCII bg layer, center hero content, wire up all delay props'
      status: completed
isProject: false
---

# Homepage Animation Revamp

## Animation Sequence (timeline)

```mermaid
gantt
    title Homepage Animation Timeline
    dateFormat s
    axisFormat %Ss

    section Entrance
    HeroName letters stagger   :h, 0, 1.2s
    HeroSectionDescription     :d, 0.6, 1s
    Header                     :hdr, 1.0, 1s
    BottomNavbar fade-in       :nav, 1.8, 0.6s
    ASCII Background fade-in   :bg, 1.8, 2.5s
```

All timing is relative to `animationsReady` becoming true (after the 3s preloader). A single `startDelay` in `page.tsx` seeds each component's `delay` prop.

---

## 1. HeroSectionName - Staggered letter paths using HeroName SVG

**Files:** [src/components/Sections/HeroSection/HeroSectionName.tsx](src/components/Sections/HeroSection/HeroSectionName.tsx)

- Replace the current `Name` + `Surname` two-SVG layout with the single `HeroName` component (which already exports `letterIds` for the 8 letter paths: P, R, A, T, Y, U, S, H).
- GSAP animation: set all letter paths to `opacity: 0` and `yPercent: 100`, then stagger them in with `stagger: 0.08`, `duration: 0.8`, `ease: 'power4.out'`.
- The SVG enters on a white background (no ASCII bg yet at this point).
- Remove the bottom margin that currently pushes the name down; center it vertically instead since the layout is changing.

---

## 2. HeroSectionDescription - Centered, smaller, new copy

**Files:** [src/components/Sections/HeroSection/HeroSectionDescription.tsx](src/components/Sections/HeroSection/HeroSectionDescription.tsx)

- Change the description copy to something like: "AI-powered Full Stack Engineer crafting intelligent, beautiful digital experiences." with a tagline "Animate your story." on a new line (styled differently, e.g. the accent color `#ff4c24`).
- Make it `text-center` for all breakpoints (remove the `lg:text-left`).
- Reduce font size: use `subheading lg:title3` instead of `title3 lg:title1`.
- Keep the SplitText-by-lines stagger animation. Adjust `delay` to fire when HeroName is ~60-75% done (roughly `startDelay + 0.8`).

---

## 3. Header - Simplified and thinner

**Files:** [src/components/Header.tsx](src/components/Header.tsx)

- Remove the "Available for Work / View Resume" text block entirely (the `showResume` prop and associated `<span ref={ref}>` section).
- Make the header thinner: reduce vertical padding/height so it sits more compactly at the top. Remove the 9-column grid since only the Branding logo remains; use a simple flex row instead.
- Keep the Branding SVG logo with its existing GSAP slide-up animation.
- Receives a later `delay` prop from `page.tsx` (roughly `startDelay + 1.0`) so it enters after the description starts.
- Remove the now-unnecessary SplitText import and logic (was only used for the "Available for Work" text).

---

## 4. BottomNavbar - Fade in after header

**Files:** [src/components/BottomNavbar.tsx](src/components/BottomNavbar.tsx)

- Keep the navbar in `layout.tsx`. Do not move it into `page.tsx` or duplicate it per page.
- Add GSAP-based opacity fade-in (`opacity: 0` -> `1`, `duration: 0.6`, `ease: 'power2.out'`).
- Gate the animation with `usePageReady()` from `PreloaderProvider` and fire it 1.8s after `animationsReady` becomes true (self-contained delay, no prop needed from parent).

---

## 5. ASCII Gradient Background

**Files:** New component at [src/components/AsciiHeroBackground.tsx](src/components/AsciiHeroBackground.tsx), referenced in [src/app/page.tsx](src/app/page.tsx)

- Port the `AsciiHeroBackground` component from the downloaded file into the project at `src/components/AsciiHeroBackground.tsx`.
- Adapt the `FADE_DELAY` / `FADE_DURATION` timing: instead of a fixed 5s delay from mount, accept a `delay` prop (in seconds) and compute `startTime` relative to when `animationsReady` fires plus that delay.
- Place it as a full-viewport `position: fixed` / `inset-0` / `z-[-1]` layer behind all content in `page.tsx`.
- It fades in at the same time as the navbar (~`startDelay + 1.8`), giving the white-background-first effect you want.

---

## 6. Homepage layout (page.tsx)

**Files:** [src/app/page.tsx](src/app/page.tsx)

Rework the layout to:

- Place the ASCII background as the bottom-most layer (fixed, behind everything).
- Center `HeroSectionName` (the big PRATYUSH letters) prominently.
- Center `HeroSectionDescription` above or below the name.
- Keep `Header` at the top row.
- `BottomNavbar` remains in `layout.tsx` (self-contained fade animation).

Timing props passed from `page.tsx`:

| Component              | delay value        |
| ---------------------- | ------------------ |
| HeroSectionName        | `startDelay` (0)   |
| HeroSectionDescription | `startDelay + 0.6` |
| Header                 | `startDelay + 1.0` |
| BottomNavbar           | `startDelay + 1.8` |
| AsciiHeroBackground    | `startDelay + 1.8` |

---

## Key decisions / open questions

- The `BottomNavbar` stays in `layout.tsx`. Its fade animation is self-contained: gated on `usePageReady()` with a hardcoded 1.8s delay after `animationsReady` becomes true. No props or context plumbing needed.
- The ASCII background uses a canvas that repaints every frame. We will ensure it respects `prefers-reduced-motion` (already handled in the source).
