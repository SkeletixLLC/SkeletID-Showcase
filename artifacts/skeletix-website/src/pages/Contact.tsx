import GoogleContactForm from '../components/GoogleContactForm';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function Contact() {
  return <Layout><PageHeading eyebrow="Contact" title="Get in touch with Skeletix." description="Send general questions about SkeletID, the company, or potential partnerships using the Google Form or the email address below." />
    <div className="container page-content"><div className="form-shell">
      <div>
        <span className="section-kicker">Email Skeletix directly</span>
        <h2>Contact email</h2>
        <a className="text-link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        <div className="callout" style={{ marginTop: 24 }}><span className="callout-mark">i</span><span>Use the form for general inquiries only. Do not send case details, evidence, or confidential information.</span></div>
      </div>
      <GoogleContactForm />
    </div></div>
  </Layout>;
}
