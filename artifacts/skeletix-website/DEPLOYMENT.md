# Deployment notes

This is a static single-page application. Build with `npm run build`; deploy the contents of `dist/public` to a static host configured to serve `index.html` for application routes. `public/_redirects` contains the common `/* /index.html 200` fallback rule. Confirm the equivalent rule for the chosen host so direct visits and refreshes work on every route.

The Vite Replit preview configuration remains in `vite.config.ts` and uses the workspace-provided `PORT` and `BASE_PATH` values. Production hosting should serve the app at the intended base path and use an appropriate secure transport.

Before launch:

1. Confirm the approved company identity details and replace only the marked placeholders in `src/data/content.ts`.
2. Review every product statement so intended capabilities remain clearly distinguished from implemented functionality.
3. Have qualified counsel review and complete the draft privacy policy and draft terms.
4. Confirm the static host's request logs, retention, and privacy practices; update the policy accordingly.
5. Keep forms disabled until delivery is intentionally implemented, tested, and documented. No form delivery is part of this artifact.
6. Verify routes, accessible keyboard navigation, metadata, and hosting fallback in the deployment environment.

No analytics, tracking tools, third-party APIs, backend, secrets, or external form service is configured here.
