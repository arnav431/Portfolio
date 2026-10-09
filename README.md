# Arnav Khajuria — Portfolio (React)

Vite + React 18 + Tailwind 3. Same look as the original single-file site, now componentised.

## Run
    npm install
    npm run dev      # local dev server
    npm run build    # production build in dist/

## Images
Put images in `public/images/` using the lowercase names listed in `public/images/README.txt`. Paths are resolved through `src/components/Img.jsx`, which respects the deploy base path and falls back gracefully if a file is missing.

## Editing content
All text, projects, skills, certificates and experience live in `src/data.js`.

## Structure
- `src/styles/main.css` — original CSS (unchanged class names)
- `src/styles/bat.css` — the pixel-art bat animation
- `src/components/Background.jsx` — canvas grid + custom cursor
- `src/components/Nav.jsx`, `Hero.jsx`, `Sections.jsx`, `svgs.jsx`

## Adding achievement certificates
Open `src/data.js`, find `achievements`, and fill the `certificates` array of any item (instructions are in the comment above it).
Put image files in `public/images/achievements/`. Images open in a full-screen preview; links open in a new tab.
