import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { formDeliveryEnabled, site } from '../data/content';

export default function Terms() {
  return <Layout><PageHeading eyebrow="Website information" title="Draft terms of use." description="A working draft for review. These terms are not final, are not legal advice, and do not establish product access or a customer relationship." />
    <div className="container page-content"><article className="content-narrow prose"><span className="legal-draft">Draft: requires legal review</span><p style={{ marginTop: 19 }}>Last updated: {site.lastUpdated}</p>
      <h2>1. Draft status and scope</h2><p>This draft is intended to guide review of the Skeletix LLC informational website. It is not a final agreement. SkeletID is under development; this website does not grant access to a working product or operational service.</p>
      <h2>2. Informational material</h2><p>Descriptions of SkeletID capabilities explain proposed concepts and design goals. They may change, are not commitments to deliver features, and do not represent validated performance, regulatory compliance, certification, deployment, or suitability for a particular purpose.</p>
      <h2>3. Demonstration materials</h2><p>Any demonstration is illustrative and non-functional. Sample records are entirely fictional and must not be interpreted as actual cases, evidence, users, customers, or test results.</p>
      <h2>4. No professional or legal advice</h2><p>Website material is general information about a product concept. It is not forensic, scientific, legal, or other professional advice and must not be relied on for casework or operational decisions.</p>
      <h2>5. Forms and communications</h2><p>The Contact page uses Google Forms. Responses are submitted to Google and managed by the form owner. Submission confirmation does not guarantee an email notification or a response from Skeletix. {formDeliveryEnabled ? 'The separate Investor inquiry form uses Formspree.' : 'The separate Investor inquiry form is not enabled.'} Do not submit case details, evidence, or confidential information. No investment offer, partnership offer, or guarantee is made by the presence of these forms.</p>
      <h2>6. Review before publication</h2><p>Applicable governing law, intellectual property, disclaimers, liability, and dispute provisions must be completed and reviewed by legal counsel before these draft terms are adopted.</p>
      <h2>7. Contact</h2><p>Contact {site.founderLabel} at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</p>
    </article></div>
  </Layout>;
}
