import InquiryForm from '../components/InquiryForm';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function Contact() {
  return <Layout><PageHeading eyebrow="Contact" title="A clear way to get in touch matters." description="We want to make it straightforward to reach Skeletix. Contact details and form delivery are not yet configured on this website." />
    <div className="container page-content"><div className="form-shell"><div><span className="section-kicker">Contact details</span><h2>Details to be added.</h2><p>The company contact email is not available for publication yet. Please do not treat this interface as a submitted contact request.</p><div className="callout"><span className="callout-mark">i</span><span>{site.contactEmail}<br />{site.companyAddress}<br />Form delivery is not connected, and no message can be sent from this page.</span></div></div><InquiryForm category /></div></div>
  </Layout>;
}
