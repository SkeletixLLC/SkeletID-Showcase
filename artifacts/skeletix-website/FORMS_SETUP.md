# Formspree setup

Both the Contact and Investor forms use the same Formspree endpoint. The site remains static and does not need a backend or API key.

The approved notification recipient is `osteoidhumanid@gmail.com`, the contact address for Anastasia Slack, Owner of Skeletix LLC.

## Required setup

1. Create a [Formspree account](https://formspree.io/register) and verify your email address.
2. In the Formspree dashboard, create a new form.
3. Set the form's Target Email to `osteoidhumanid@gmail.com` and complete any recipient verification Formspree requests.
4. Copy the public form endpoint from the Integration section. It has the format `https://formspree.io/f/your-form-id`.
5. In `src/data/content.ts`, set `site.formspreeEndpoint` to that URL. Set `site.formspreeRecipientVerified` to `true` only after confirming the Target Email and verification in Formspree.
6. Rebuild the static site. No hosting secret is required for the public endpoint.

The recipient is controlled by the Formspree account, not by a hidden browser field. Publishing an email address or configuring an endpoint does not prove which recipient the service will use.

The visitor's `email` field is sent so replies can be addressed to the visitor. The form's `source` field distinguishes Contact from Investor inquiries. No recipient field is sent by the browser.

## Form behavior

- Forms stay disabled until the endpoint is valid and recipient confirmation is set.
- Name, email, and message are required. Contact also requires a topic; organization is optional for Investor inquiries.
- Submissions go directly to Formspree over HTTPS. No form data is stored by this site's code.
- The form disables repeat clicks while sending and includes a honeypot field.
- A success message appears only after Formspree accepts the request. It does not guarantee final inbox delivery.
- On an error or timeout, entered fields remain available and the direct email address is shown.

## Before treating delivery as live

- Submit a clearly marked test inquiry from each form.
- Confirm both messages arrive at the approved email address, including checking spam folders.
- Check that replying addresses the visitor, not a notification sender.
- Review spam protection and allowed-domain settings in Formspree.
- Review the provider's terms, retention settings, and data handling. Formspree stores submissions as well as forwarding notifications.
- Complete legal review of the draft privacy policy and terms. The site warns visitors not to include case details, evidence, or confidential information.

No passwords, private API keys, or credentials belong in frontend code. The public Formspree endpoint is safe to include in the static site.
