---
name: Cloudflare inquiry delivery
description: User's preferred hosting and inquiry-delivery approach.
---

Keep the marketing frontend static. The user prefers Cloudflare for contact and investor inquiry delivery instead of Formspree.

**Why:** After initially choosing Formspree, the user requested Cloudflare because their website domain is hosted with Cloudflare.

**How to apply:** Confirm whether Cloudflare hosts the actual site or only manages DNS before choosing Pages Functions or a Worker. Explain the serverless handler requirement. Do not change existing mail DNS without checking the domain's email setup. Require recipient verification and delivery testing before treating forms as ready.
