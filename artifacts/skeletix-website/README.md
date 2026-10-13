# Skeletix LLC / SkeletID website

A responsive marketing website for Skeletix LLC and its proposed product, SkeletID, with a server-backed Team directory and owner-only editor. The product is under development; copy describes intended concepts and goals, not a launched, validated, or certified forensic system.

## Stack

- React 18 and TypeScript
- Vite 5
- React Router 6 (browser history)
- Tailwind CSS 3 (PostCSS setup) with a bespoke CSS design system

## Routes

`/`, `/platform`, `/demonstration`, `/technology`, `/about`, `/investors`, `/contact`, `/privacy`, `/terms`, `/team`, `/team/manage`, `/sign-in/*`, `/sign-up/*`, and a not-found route.

The content source of truth is `src/data/content.ts`. Edit that file to update product descriptions, route metadata, fictional sample data, and the explicitly marked company-detail placeholders. Do not replace placeholders with invented people, locations, contact details, partner names, or investment details.

The demonstration uses fictional sample records. The Contact page embeds the owner's Google Form and includes a direct link. Google Forms controls responses and notification settings. The separate Investor form remains disabled; visitors can use Contact or email. See `FORMS_SETUP.md`. No first-party analytics or advertising scripts are included.

Team profiles and departments are stored in PostgreSQL through `artifacts/api-server`. Clerk manages sign-in; the server restricts editing to the configured owner's verified primary email. Team portraits use App Storage. Passwords are not stored or shown by the website. Read `TEAM_SETUP.md` before managing profiles and `DEPLOYMENT.md` before hosting the new functionality.

## Development

From the workspace root, run `pnpm install --frozen-lockfile`. The existing managed workflows start the website and API. The API requires the managed database, Clerk credentials, and App Storage configuration. Run `pnpm --filter @workspace/api-spec run codegen` after contract changes. `PORT=5173 BASE_PATH=/ pnpm --filter @workspace/skeletix-website run build` creates the frontend in `dist/public`. The Team page needs the API at the same origin under `/api`; frontend output alone is not the complete app.

## Before publication

Review all claims and legal copy, replace marked placeholders, confirm Google Form access and owner notifications, and test the complete directory/editor deployment. Check direct-route fallback, authentication, storage, and privacy notices before publication.
