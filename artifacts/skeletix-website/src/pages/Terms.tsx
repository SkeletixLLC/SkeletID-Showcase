import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { formDeliveryEnabled, site } from '../data/content';

export default function Terms() {
  return <Layout><PageHeading eyebrow="Website information" title="Draft terms of use" description="These draft terms cover the Skeletix website. They are incomplete and require legal review before publication." />
    <div className="container page-content"><article className="content-narrow prose"><span className="legal-draft">Draft: requires legal review</span><p style={{ marginTop: 19 }}>Last updated: {site.lastUpdated}</p>
      <h2>1. Draft status and scope</h2><p>This draft covers the Skeletix LLC informational website. It is not a final agreement. SkeletID is under development, and this website does not provide access to a working product or operational service.</p>
      <h2>2. Information on this website</h2><p>SkeletID descriptions explain proposed concepts and design goals. They may change and are not promises to deliver specific features. They are not claims of validated performance, regulatory compliance, certification, or readiness for deployment or a particular use.</p>
      <h2>3. Demonstration materials</h2><p>The demonstration is illustrative and non-operational. Sample records are fictional. Do not interpret them as real cases, evidence, users, customers, or test results.</p>
      <h2>4. No professional or legal advice</h2><p>This website provides general information about a product concept. It is not forensic, scientific, legal, or other professional advice. Do not rely on it to make casework or operational decisions.</p>
      <h2>5. Email and communications</h2><p>The Contact page links to Skeletix's email address. The link opens your email application; email providers process messages sent through it. Sending a message does not guarantee a reply. The separate Investor inquiry form {formDeliveryEnabled ? 'uses Formspree.' : 'is disabled.'} Do not email case details, evidence, or confidential information. Contacting Skeletix is not an offer of investment or partnership.</p>
      <h2>6. Review before publication</h2><p>These draft terms need legal review and completion, including governing law, intellectual property, disclaimers, liability, and dispute provisions.</p>
      <h2>7. Contact</h2><p>Contact {site.founderLabel} at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</p>
    </article></div>
  </Layout>;
}
