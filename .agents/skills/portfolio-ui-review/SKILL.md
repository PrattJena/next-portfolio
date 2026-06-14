---
name: portfolio-ui-review
description: Use when reviewing or improving the visual design, layout, typography, spacing, motion, or interaction quality of this portfolio.
---

---

# Portfolio UI Review Skill

Use this skill when the user asks to improve, critique, polish, redesign, or visually review part of the portfolio UI.

Apply precise design vocabulary from the installed `vocabulary` skill where relevant.

Focus on:

- typography: hierarchy, tracking, leading, line length, type scale
- layout: spacing, negative space, alignment, max-width, responsive behavior
- color: contrast, semantic tokens, dark mode, tinted neutrals
- interaction: affordance, hover state, focus state, touch target
- motion: easing, duration, stagger, reduced motion, GPU-friendly transforms
- accessibility: semantic HTML, aria-labels, focus states, DOM order

For code changes, preserve this project’s existing stack:

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- LiftKit CSS tokens/utilities
- GSAP / `@gsap/react`

Use Tailwind for layout and responsive behavior. Use LiftKit-backed tokens for semantic spacing, color, and typography when they match the existing design system.

Do not replace the project’s LiftKit CSS setup with another UI system.
