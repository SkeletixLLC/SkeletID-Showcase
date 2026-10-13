import DevStatus from '../components/DevStatus';
import InquiryForm from '../components/InquiryForm';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function Investors() {
  return <Layout><PageHeading eyebrow="Investors & partnerships" title="Thoughtful conversations, when the time is right." description="Skeletix is developing SkeletID. We are not publishing investment terms, funding figures, partner relationships, or a fundraising status here." />
    <div className="container page-content"><div className="form-shell"><div><span className="section-kicker">Stay in touch</span><h2>Interest can be noted, but not sent here yet.</h2><p>Investment and partnership inquiry forms are included as interface placeholders only. They are disabled until form delivery is connected and reviewed.</p><DevStatus compact /><p style={{ marginTop: 18 }}>There are no claims here about current fundraising, available terms, or active partnerships.</p><p>{site.investorInformation} {site.partnershipInformation}</p></div><InquiryForm /></div></div>
  </Layout>;
}
