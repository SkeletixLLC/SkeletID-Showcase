import InquiryForm from '../components/InquiryForm';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { formDeliveryEnabled, site } from '../data/content';

export default function Contact() {
  return <Layout><PageHeading eyebrow="Contact" title="Contact Skeletix." description={formDeliveryEnabled ? 'For questions about SkeletID, Skeletix LLC, or partnerships, use the form below or email Anastasia Slack directly.' : 'For questions about SkeletID, Skeletix LLC, or partnerships, email Anastasia Slack directly.'} />
    <div className="container page-content"><div className="form-shell">
      <div>
        <span className="section-kicker">Contact details</span>
        <h2>{site.ownerName}</h2>
        <p>{site.ownerRole}</p>
        <a className="text-link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        <div className="callout" style={{ marginTop: 24 }}><span className="callout-mark">i</span><span>{formDeliveryEnabled ? 'Use the form for general inquiries. Please do not send case details, evidence, or confidential information.' : 'The contact form is not enabled yet. Please use the email address above to get in touch.'}</span></div>
      </div>
      <InquiryForm category />
    </div></div>
  </Layout>;
}
