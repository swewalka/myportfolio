# AI Portfolio (With A Reveal)

This is my portfolio, but with a twist:

- **The top section** is a deliberately over-the-top, AI-crafted “showpiece” (themes, cursor modes, heavy motion).
- **Then it breaks character** and admits the truth: this part is AI-coded, and I’m not a web developer.
- **Below that** is the real me: a mechanical engineer who likes building things, plus the actual projects and links.

## Stack

- React + TypeScript (Vite)
- Tailwind CSS
- Framer Motion (animations)
- Lucide (icons)

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

## Where To Edit Things

- AI intro section (themes, cursor, “overclock” button): `src/components/hero/`
- The reveal / “this was AI” transition copy: `src/components/hero/HeroRevealLayer.tsx`
- Theme-specific overclock effects (signature theme): `src/components/themes/signature/overclock/`
- Bio, real projects + contact links: `src/components/RealPortfolio.tsx`
- Theme definitions / modules / rotation: `src/components/themes/`
- Global styling: `src/index.css`

`RealPortfolio.tsx` currently contains placeholder project cards and links; swap them for your real work.

## Deploy

This is a static Vite build.

```bash
npm run build
```

Output is in `dist/` (serve it with any static host, or use `npm run preview` locally).
