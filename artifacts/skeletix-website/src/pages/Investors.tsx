import DevStatus from '../components/DevStatus';
import InquiryForm from '../components/InquiryForm';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function Investors() {
  return <Layout><PageHeading eyebrow="Investors & partnerships" title="Investment and partnership inquiries." description="Skeletix is developing SkeletID. Investment terms, funding figures, partnerships, and fundraising status are not published on this website." />
    <div className="container page-content"><div className="form-shell"><div><span className="section-kicker">Get in touch</span><h2>Contact {site.ownerName}.</h2><p>{site.ownerRole}</p><p>To discuss Skeletix, email <a className="text-link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. The inquiry form is not enabled yet.</p><DevStatus compact /><p style={{ marginTop: 18 }}>This page is not an investment offer or a statement of available terms or active partnerships.</p></div><InquiryForm /></div></div>
  </Layout>;
}
