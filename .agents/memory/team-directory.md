---
name: Team directory permissions
description: Owner-only editing and the deployment tradeoff approved for the employee directory.
---

The user chose a private owner-only editor for employee profiles rather than source-file editing. Employee profiles are grouped by department; the founder appears first.

**Why:** The user wants only themselves to add authorized employees, including professional portraits, short biographies, and contact emails.

**How to apply:** Enforce ownership on the server, not merely by hiding UI controls. Public registration must not grant editing rights, and drafts must stay out of public directory and photo responses. Preserve the distinction between this website editor and the SkeletID product.

The Team page is about the people helping build SkeletID and make it a reality.

**Why:** The user clarified that the page is about the team building the product, while liking the connection to forensic disciplines.

**How to apply:** Keep forensic disciplines as product context. Present employees by company department, not as a directory of forensic disciplines.

The private editor introduces runtime services to what was formerly a static marketing website.

**Why:** Secure sign-in, persistent profile editing, and uploads cannot be provided by static HTML alone.

**How to apply:** Keep Git exports and deployment notes complete for both frontend and API. Do not describe a frontend-only Cloudflare Pages upload as a working deployment of the directory editor.
