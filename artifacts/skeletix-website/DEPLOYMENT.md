# Deployment notes

The marketing pages use a Vite single-page frontend. The new Team directory and private editor also require the Node API, PostgreSQL, Clerk, and App Storage. Deploying only `dist/public` to Cloudflare Pages does not provide these services.

The frontend build is `PORT=5173 BASE_PATH=/ pnpm --filter @workspace/skeletix-website run build`. The API build is `pnpm --filter @workspace/api-server run build`; its runtime is `pnpm --filter @workspace/api-server run start`. Services bind to their assigned `PORT`. The existing Replit preview configuration remains in `vite.config.ts`.

## Routing and services

- Route `/api/*` to the API at the same browser origin as the website, including `/api/__clerk`. These routes must take priority over any SPA fallback.
- Serve frontend application routes with `index.html`, including direct visits to `/team/manage`, `/sign-in/*`, and `/sign-up/*`. `public/_redirects` contains the static SPA fallback, not an API deployment.
- Keep database credentials, `CLERK_SECRET_KEY`, and storage configuration server-side. Only Clerk's publishable key belongs in frontend build configuration.
- The storage adapter currently uses Replit's managed storage sidecar. Hosting the API outside that environment requires a storage adapter and credentials appropriate to that host. The ZIP does not provision external services.
- Use HTTPS. Configure production authentication and domain settings through the supported setup for the deployment environment; development authentication keys are not a production launch configuration.

## Database and owner setup

Review schema changes through the deployment environment's migration process. Do not add startup schema changes or point a development schema-push command at production.

The development founder profile has been initialized. Production content needs separate initialization; source files alone are not a database backup. After schema setup, the deliberate `pnpm --filter @workspace/api-server run seed:team` command creates the approved founder profile and portrait in the database/storage selected by that runtime. It leaves an existing founder profile untouched. Do not rerun it to undo an intentional founder deletion. Review the target environment before running any initialization command.

`TEAM_OWNER_EMAIL` is a server configuration value, not a value supplied by a browser or changed by editing a public profile. The account's verified primary email must match it. An optional `TEAM_OWNER_USER_ID` can additionally pin access to one account in that authentication environment. Test accounts must not be authorized in production. See `TEAM_SETUP.md`.

Before launch:

1. Confirm the approved company identity details and replace only the marked placeholders in `src/data/content.ts`.
2. Review every product statement so intended capabilities remain clearly distinguished from implemented functionality.
3. Have qualified counsel review and complete the draft privacy policy and draft terms.
4. Confirm hosting, authentication, storage, logs, retention, and privacy practices; update the policy accordingly.
5. Test the Contact page email link on desktop and mobile. The separate Investor inquiry form remains disabled.
6. Verify owner sign-in, unauthorized denial, draft/public transitions, portrait uploads, direct routes, and SPA/API routing in the deployment environment.
7. Obtain approval before publishing any employee's portrait, biography, or email. Keep future employees hidden until approved.
