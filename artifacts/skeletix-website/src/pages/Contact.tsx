import InquiryForm from '../components/InquiryForm';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function Contact() {
  return <Layout><PageHeading eyebrow="Contact" title="Contact Skeletix." description="For questions about SkeletID, Skeletix LLC, or partnerships, email Anastasia Slack directly." />
    <div className="container page-content"><div className="form-shell">
      <div>
        <span className="section-kicker">Contact details</span>
        <h2>{site.ownerName}</h2>
        <p>{site.ownerRole}</p>
        <a className="text-link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        <div className="callout" style={{ marginTop: 24 }}><span className="callout-mark">i</span><span>The contact form is not enabled yet. Please use the email address above to get in touch.</span></div>
      </div>
      <InquiryForm category />
    </div></div>
  </Layout>;
}
