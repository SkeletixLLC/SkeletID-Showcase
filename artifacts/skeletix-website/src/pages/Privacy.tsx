import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { formDeliveryEnabled, site } from '../data/content';

export default function Privacy() {
  return <Layout><PageHeading eyebrow="Website information" title="Draft privacy policy" description="This draft explains the website's current information practices where known. It is incomplete and requires legal review before publication." />
    <div className="container page-content"><article className="content-narrow prose"><span className="legal-draft">Draft: requires legal review</span><p style={{ marginTop: 19 }}>Last updated: {site.lastUpdated}</p>
      <h2>1. About this draft</h2><p>This draft identifies privacy topics that need to be addressed before the Skeletix LLC website's privacy policy is finalized. It is not a final notice or legal advice. SkeletID is under development and is not offered through this website.</p>
      <h2>2. Information you submit</h2><p>The Contact page uses a Google Form provided by Skeletix. When you submit it, Google processes and stores your response, and the form owner can view it. Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> explains how Google handles information. Skeletix uses inquiries to respond. Access, retention, and applicable legal requirements still need review.</p><p>{formDeliveryEnabled ? 'The separate Investor inquiry form uses Formspree to process and store submissions and send notifications to Skeletix.' : 'The separate Investor inquiry form is disabled and does not submit information. Use the Contact page or email for investment and partnership inquiries.'} Do not submit case details, evidence, or confidential information.</p><p>If you email Skeletix, the email service receives your message and sender details.</p>
      <h2>3. Website operations</h2><p>This website does not use analytics or tracking scripts. Website hosts and related infrastructure may process technical information to deliver the site. The applicable providers, data, retention periods, and terms need to be confirmed before this draft is finalized.</p>
      <h2>4. Cookies and similar technologies</h2><p>This website does not include its own analytics or advertising scripts. The embedded Google Form may use cookies or similar technologies, as described in <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's privacy policy</a> and your browser settings. Hosting and embedded-service practices need review before this policy is finalized.</p>
      <h2>5. SkeletID product information</h2><p>This website does not provide a SkeletID account or operational product. This draft does not describe data practices for the product.</p>
      <h2>6. Your choices and contact</h2><p>Your privacy rights and how to exercise them depend on applicable law. These details must be reviewed and added before publication. For questions, contact {site.founderLabel} at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</p>
      <h2>7. Updates and review</h2><p>Before publication, this draft needs legal review and completion, including the relevant jurisdiction, operator details, hosting practices, and effective date.</p>
    </article></div>
  </Layout>;
}
