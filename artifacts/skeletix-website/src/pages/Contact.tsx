import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function Contact() {
  return <Layout><PageHeading
    eyebrow="Contact"
    title="Get in touch with Skeletix."
    description="Email us with questions about SkeletID, investment inquiries, potential partnerships, or collaboration."
  />
    <div className="container page-content"><div className="content-narrow">
      <span className="section-kicker">Email Skeletix directly</span>
      <h2>Start a conversation</h2>
      <p><a className="text-link contact-email-link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p>
      <div className="callout" style={{ marginTop: 24 }}><span className="callout-mark">i</span><span>Please do not email case details, evidence, or confidential information.</span></div>
    </div></div>
  </Layout>;
}
