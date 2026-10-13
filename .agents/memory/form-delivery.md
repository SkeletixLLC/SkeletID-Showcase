---
name: Simple inquiry delivery
description: User's Google Forms choice for the Contact page and simplicity requirement.
---

Keep the marketing frontend static and prioritize simple form/email processing. Use the user's Google Form for the Contact page.

**Why:** After considering Formspree and Cloudflare, the user emphasized simplicity and supplied a Google Form specifically to connect to the Contact page.

**How to apply:** Do not replace the Contact page's Google Form with a custom delivery service or add serverless infrastructure without discussing it. Do not infer Google Forms notification settings or account ownership from a public form link. Keep the separate Investor form's delivery decision distinct from the user's Contact-page request.

A successful text fetch of a Google Form does not prove that the embedded form works for signed-out visitors.

**Why:** A public fetch returned form fields while the actual embedded browser view required Google sign-in.

**How to apply:** Check the rendered iframe before claiming public access works. Report Google-controlled access restrictions separately from the site's connection and notification settings.
