# Skeletix LLC / SkeletID website

A static, responsive marketing website for Skeletix LLC and its proposed product, SkeletID. The product is under development; copy describes intended concepts and goals and must not be read as evidence of a launched, operational, validated, or compliant system.

## Stack

- React 18 and TypeScript
- Vite 5
- React Router 6 (browser history)
- Tailwind CSS 3 (PostCSS setup) with a bespoke CSS design system

## Routes

`/`, `/platform`, `/demonstration`, `/technology`, `/about`, `/investors`, `/contact`, `/privacy`, `/terms`, and a not-found route.

The content source of truth is `src/data/content.ts`. Edit that file to update product descriptions, route metadata, fictional sample data, and the explicitly marked company-detail placeholders. Do not replace placeholders with invented people, locations, contact details, partner names, or investment details.

The demonstration intentionally uses unmistakably fictional sample records. The contact and investor/partnership forms are disabled; they do not submit or send email. No analytics, tracking scripts, APIs, keys, secrets, or backend are included.

## Development

Use the workspace package manager to install dependencies, then run `npm run dev` (or the equivalent workspace task). Vite's existing Replit preview configuration is retained. `npm run build` creates the static SPA output in `dist/public`; `npm run typecheck` checks TypeScript.

## Before publication

Review all claims and legal copy, replace editable company-detail placeholders with approved information, configure hosting and direct-route fallback, and only enable forms after selecting and testing an appropriate delivery service and updating the privacy notice.
