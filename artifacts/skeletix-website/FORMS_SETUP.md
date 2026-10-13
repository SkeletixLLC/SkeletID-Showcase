# Contact form setup

The Contact page embeds the published Google Form supplied by Skeletix. It also includes an "Open Google Form" link for browsers that do not display the embedded form.

The public form URL is centralized in `site.googleContactFormUrl` in `src/data/content.ts`. The embedded URL adds `?embedded=true`. No API key, backend, Cloudflare email configuration, or Formspree endpoint is required for this contact form.

## Email notifications

The site does not control Google Forms notification settings and cannot verify the account that owns the form from its public link.

To receive alerts at the approved contact address:

1. Open the form's editor while signed in as `osteoidhumanid@gmail.com`.
2. Open the **Responses** tab.
3. Open its three-dot menu and select **Get email notifications for new responses**.
4. Submit a clearly marked test response and check that account's inbox and spam folder.

Responses are stored in Google Forms and any linked spreadsheet. Standard alerts are not the same as forwarding a complete inquiry email. The respondent's response-copy setting is also separate from owner notifications.

## Public access and privacy

- Keep the form published for the intended audience.
- If visitors should not need a Google account, review response-access and email-collection settings. Verified email collection and restrictions may require sign-in.
- Review the form's confirmation message and notification settings in Google Forms.
- Avoid collecting case details, evidence, or confidential information.
- Review Google's terms and response retention/access settings. The website's privacy policy and terms remain drafts requiring legal review.

## Investor inquiries

The separate custom Investor form remains disabled. Investment and partnership inquiries can use the Contact page's Google Form or the direct email address.

Dormant Formspree code remains only for the separate custom form. Its empty endpoint and unverified-recipient flag keep it disabled; do not enable it without a separate setup decision.

No passwords or private credentials belong in frontend code.
