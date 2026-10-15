# Horizon Properties — Base44 Setup

## Overview
A premium real estate agency website built with React + Vite, featuring a multi-page
experience with property browsing, filtering, and detail pages.

## Tech Stack
- **React 18** + **Vite 5** (dev server with HMR)
- **React Router 6** for client-side routing (/, /properties, /properties/:id)
- Plain CSS (global design tokens + per-component CSS files)
- Google Fonts: Plus Jakarta Sans (all weights)
- No backend/database — property data is in `src/data/properties.js`

## Running
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
- Dev server on port 5173 inside container, mapped to host port 3000.
- `npm install` runs on startup; `node_modules` in a named volume.
- Vite binds `0.0.0.0` with `allowedHosts: true` in preview mode.

## Structure
```
src/
  App.jsx                    — BrowserRouter + Routes + scroll-animation observer
  main.jsx                   — React entry point
  data/properties.js          — 8 property records with images, specs, features
  styles/global.css           — design tokens, reset, buttons, animations
  components/
    Header.jsx                — transparent→solid on scroll, mobile burger menu
    Hero.jsx                  — full-width image, headline, search bar
    About.jsx                 — two-column with asymmetric image composition
    FeaturedProperties.jsx    — horizontal carousel with drag/scroll + arrows
    PropertyCard.jsx           — reusable card (default/featured/compact variants)
    Services.jsx              — 3×2 editorial grid of 6 services
    WhyChoose.jsx              — dark navy stats + features section
    Team.jsx                  — 4 team member cards with hover socials
    CTA.jsx                   — circular icon + headline + button
    Footer.jsx                — 4-column footer with newsletter signup
    ScrollToTop.jsx            — scrolls to top on route change
  pages/
    Home.jsx                  — assembles all homepage sections
    PropertiesPage.jsx        — filterable property listing (search, location, type, beds, price, sort)
    PropertyDetail.jsx        — gallery with lightbox, specs, features, agent card, similar properties
```

## Verification
- `curl http://localhost:3000/` returns the Vite HTML shell.
- Homepage: hero, about, featured carousel, services, why-choose, team, CTA, footer.
- `/properties` — 8 property cards with working filters and sort.
- `/properties/:id` — gallery with thumbnails, lightbox, save button, agent card, similar properties.
- Mobile: burger menu, responsive grids, swipeable carousel, no horizontal overflow.
- No secrets or external credentials required.
