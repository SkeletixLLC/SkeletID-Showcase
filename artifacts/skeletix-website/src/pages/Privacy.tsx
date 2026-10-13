import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function Privacy() {
  return <Layout><PageHeading eyebrow="Website information" title="Draft privacy policy." description="A working draft for review. This text is not a final policy, legal advice, or a statement about product data practices." />
    <div className="container page-content"><article className="content-narrow prose"><span className="legal-draft">Draft: requires legal review</span><p style={{ marginTop: 19 }}>Last updated: {site.lastUpdated}</p>
      <h2>1. About this draft</h2><p>This draft is provided to identify topics that should be addressed before the Skeletix LLC website is published for public use. It is not a final privacy notice. SkeletID is under development and is not offered through this website.</p>
      <h2>2. Information submitted through this site</h2><p>Forms displayed on this website are disabled. Form delivery has not been connected; information cannot be submitted through them. Do not enter personal, case-related, sensitive, or confidential information into this demonstration interface.</p>
      <h2>3. Website operations</h2><p>This static website is not configured with analytics or tracking scripts. Hosting providers and infrastructure may process technical information as part of delivering a website; the applicable provider, data, retention, and terms must be confirmed and described before this draft is finalized.</p>
      <h2>4. Cookies and similar technologies</h2><p>No analytics or advertising cookies are intentionally configured by this site. Hosting behavior and any future technology must be reviewed before this statement is finalized.</p>
      <h2>5. Product information</h2><p>This website does not provide a SkeletID account or operational product. No product data handling practices are established by this draft.</p>
      <h2>6. Your choices and contact</h2><p>Applicable rights and contact procedures must be reviewed by counsel and completed before publication. For questions, contact {site.ownerName}, {site.ownerRole}, at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</p>
      <h2>7. Changes and review</h2><p>This draft requires legal review and completion, including identification of the relevant jurisdiction, operator details, hosting practices, and effective date.</p>
    </article></div>
  </Layout>;
}
