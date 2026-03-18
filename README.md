# Portfolio Site (Unified Landing + Home)

This project is a single, cohesive portfolio experience.

Flow:

1. Landing section
2. Short scroll-driven text melt transition
3. Main homepage content (about, projects, context, contact)

There is no fake intro vs real portfolio split anymore.

## Stack

- React + TypeScript (Vite)
- Tailwind CSS
- Framer Motion
- Lucide React

## Run Locally

Recommended: Node.js `20.19+` (or `22+`) and npm `10+`.

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Project Structure

- `src/App.tsx`
  - App composition: theme provider + cursor manager + unified home flow.
- `src/components/home/Home.tsx`
  - Main page container for landing and homepage sections.
- `src/components/home/Landing.tsx`
  - Real landing section at the top of the portfolio.
- `src/components/home/ScrollTransition.tsx`
  - Short melt/distortion handoff while scrolling out of landing.
- `src/components/home/HomePage.tsx`
  - Main homepage composition (intro, projects, context, contact).
- `src/components/home/projects.ts`
  - Typed static project data source.
- `src/components/themes/`
  - Theme configs, registry, transition layers, and theme manager.
- `src/components/themes/unlockLogic.tsx`
  - Dormant unlock architecture (state/actions) kept for future reuse.
- `src/components/cursor/`
  - Custom cursor modes and cursor rendering.

## Content Editing

- Landing copy and CTA labels:
  - `src/components/home/LandingContent.tsx`
- Homepage intro/context/contact blocks:
  - `src/components/home/HomeIntro.tsx`
  - `src/components/home/ContextBlock.tsx`
  - `src/components/home/ContactSection.tsx`
- Projects:
  - `src/components/home/projects.ts`

## Themes

Themes are full-page visual systems now, not landing-only skins.

- Theme switching is available from the landing CTA.
- Theme transitions remain active in the background across landing and homepage.
- Theme tokens drive section surfaces, borders, type, and color usage throughout the full page.

## Dormant Unlock Logic

The previous visible unlock/overclock presentation was removed.

The unlock mechanism is still preserved internally in
`src/components/themes/unlockLogic.tsx` as a dormant feature:

- `isUnlocked`
- `unlock()`
- `lock()`
- `toggle()`

It is intentionally not exposed through current UI/theme options.

## Build and Deploy

Create a production build:

```bash
npm run build
```

Build output is in `dist/`.
