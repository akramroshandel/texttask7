# Lumière Hair Salon — Base44 Setup

## Overview
A single-page React + Vite marketing site for a hair salon, built from a reference
image. No backend, no database, no external services.

## Tech Stack
- **React 18** + **Vite 5** (dev server with HMR)
- Plain CSS (one global stylesheet + per-component CSS files)
- Google Fonts: Playfair Display (headings) + Montserrat (body)

## Running
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
- Dev server runs on port 5173 inside the container, mapped to host port 3000.
- `npm install` runs on container startup; `node_modules` is stored in a named
  volume so bind-mounting the source doesn't clobber it.
- Vite binds `0.0.0.0` and accepts the preview's external hostname via
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (set by the platform).

## Structure
```
src/
  App.jsx              — root component, scroll-animation observer
  main.jsx             — React entry point
  styles/global.css    — design tokens, reset, shared utilities
  components/
    Navbar.jsx         — fixed header with mobile burger menu
    Hero.jsx           — hero with image, badge, social proof
    Features.jsx       — 4-column feature grid
    Services.jsx       — 4 service cards
    MoreThanSalon.jsx   — split-circle section
    FinalCTA.jsx       — circular image + booking CTA
    Footer.jsx         — dark footer with links and contact
```

## Verification
- `curl http://localhost:3000/` should return the Vite HTML shell.
- The page renders the full landing page with smooth-scroll nav links.
- No secrets or external credentials required.
