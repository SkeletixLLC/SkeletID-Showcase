import DevStatus from '../components/DevStatus';
import InquiryForm from '../components/InquiryForm';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { formDeliveryEnabled, site } from '../data/content';

export default function Investors() {
  return <Layout><PageHeading eyebrow="Investors & partnerships" title="Discuss SkeletID with Skeletix." description="We welcome inquiries about potential investment and partnerships as Skeletix develops SkeletID. No investment terms or active partnerships are offered on this website." />
    <div className="container page-content"><div className="form-shell"><div><span className="section-kicker">Start a conversation</span><h2>Contact {site.founderLabel}.</h2><p>{formDeliveryEnabled ? 'Use the inquiry form or email Skeletix to discuss potential investment or partnership.' : 'The investor inquiry form is not enabled yet. Email Skeletix to discuss potential investment or partnership.'}</p><p><a className="text-link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p><DevStatus compact /><p style={{ marginTop: 18 }}>This page is for inquiries only. It is not an offer to sell or a solicitation to buy an investment.</p></div><InquiryForm /></div></div>
  </Layout>;
}
