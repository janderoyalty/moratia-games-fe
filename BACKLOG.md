# Moratia Games — Backlog

Items identified during development that were intentionally deferred because they require standalone, focused work.

---

## Codebase Architecture

### CSS Modules Migration
Convert all `.css` files to `.module.css` so class names are locally scoped to each component. Prevents accidental style leaks between components (e.g. the `#testimonials` rule that leaked across 3 nested DOM elements). Touches every component file — do as a single dedicated pass.

### Duplicate DOM ID Refactor
Multiple components use `id` attributes incorrectly:
- `id="updates--text-box--entry"` is rendered inside a `.map()`, creating duplicate IDs in the DOM
- `id="testimonials"` exists on 3 nested elements across LandingPage, Testimonials, and TestimonialsTextBox

All repeated elements should use classes, not IDs. Pairs well with the CSS Modules migration.

### Remove `firebase-admin` from Client Bundle
`firebase-admin` is a Node.js server-only SDK and has no place in a browser app. It is currently listed in `package.json` dependencies and gets bundled into the build. Remove it entirely — the browser `firebase` SDK handles everything the frontend needs.

### Prune Unused Package Dependencies
The `Calendar` component was deleted but its dependencies were not. Remove from `package.json`:
- `react-calendar`
- `react-datepicker`

Run `yarn install` after removing to update `yarn.lock`.

### Design Token System
Replace hardcoded color and font values scattered across all CSS files with CSS custom properties defined in one place:
```css
:root {
  --color-bg:      #010203;
  --color-light:   #f9f9ff;
  --color-green:   #25c115;
  --color-gray:    #bababa;
  --color-cta:     #ffce00;
  --color-link:    #78be6e;
}
```
Makes the entire visual system updatable from a single file. Best done after or alongside the CSS Modules migration.

---

## Features / Pages

### Gallery Overhaul
Full redesign of the Gallery page plus adding the new image dump. The current gallery component was intentionally untouched during the responsive audit. Requires a separate session with the new images in hand.

### Gallery Admin Page
No admin UI exists for managing gallery images. Needs to be built to allow adding, removing, and reordering photos without a code deploy.

### Testimonials Admin Page
Testimonials are currently hardcoded in the component. Build an admin page to add, edit, and remove testimonials via Firestore (same pattern as the Updates admin).

### Products Admin Page
Product listings are currently hardcoded. Build an admin page to manage product entries via Firestore.

### Races / World Content Admin
The race descriptions and world lore text are hardcoded in components. Build an admin UI so content can be updated without a code change.

---

## DevOps / Infrastructure

### CI/CD Pipeline (GitHub Actions)
Deploys are currently manual — run `./deploy.sh` locally to build and push to Bluehost. A GitHub Actions workflow could automate this: on every merge to `main`, trigger a build and rsync deploy automatically. Requires storing the SSH private key as a GitHub secret.

---

*Last updated: 2026-05-27*
