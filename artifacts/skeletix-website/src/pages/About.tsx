import DevStatus from '../components/DevStatus';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function About() {
  return <Layout><PageHeading eyebrow="About Skeletix" title="About Skeletix LLC." description="Skeletix LLC is developing SkeletID, a unified operating system for forensic science." />
    <div className="container page-content">
      <section className="split-panel"><div><span className="eyebrow">Our mission</span><h2>Connect the work of forensic science.</h2><p>Our goal is to help forensic science professionals keep case information, documentation, and review connected. SkeletID is intended to support their work while preserving the sources and context behind each record.</p></div><div><span className="eyebrow">Our approach</span><h3>Be clear about what is being built.</h3><p>SkeletID is at an early stage. This website describes proposed workflows and design goals, not finished features or validated results.</p></div></section>
      <section className="section"><div className="two-col"><div><span className="section-kicker">Why forensic anthropology</span><h2>Start with the work itself.</h2></div><div><p>Forensic anthropology depends on detailed observation, documentation, and interpretation. Records need clear sources and a reliable review process.</p><p>This field provides a starting point for Skeletix to explore digital workflows for forensic science. SkeletID is not a substitute for professional expertise.</p></div></div></section>
      <section className="section compact"><div className="content-narrow"><span className="section-kicker">Company owner</span><h2>{site.ownerName}</h2><p>{site.ownerRole}</p><a className="text-link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></div></section>
      <DevStatus />
    </div>
  </Layout>;
}
