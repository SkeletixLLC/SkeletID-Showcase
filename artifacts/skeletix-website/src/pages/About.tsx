import DevStatus from '../components/DevStatus';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function About() {
  return <Layout><PageHeading eyebrow="About Skeletix" title="About Skeletix LLC" description="Skeletix is developing SkeletID, one operating system intended to connect work across forensic disciplines." />
    <div className="container page-content">
      <section className="split-panel">
        <div>
          <span className="eyebrow">Our mission</span>
          <h2>One Operating system for all forensic science applications.</h2>
          <p>Forensic casework can involve several disciplines and institutions. Skeletix is developing SkeletID to bring that work into a single operating system, with connected case records, chain-of-custody tracking, documentation, and review.</p>
        </div>
        <div>
          <span className="eyebrow">Our approach</span>
          <h3>Support shared work and clear accountability.</h3>
          <p>The goal is to let professionals collaborate while keeping a record of who handled evidence, what work was performed, and how information moved between teams. SkeletID is under development. These are intended capabilities, not finished features.</p>
        </div>
      </section>
      <section className="section">
        <div className="two-col">
          <div>
            <span className="section-kicker">The perspective behind Skeletix</span>
            <h2>A background in forensic anthropology. A need across disciplines.</h2>
          </div>
          <div>
            <p>Drawing on a background in forensic anthropology, Skeletix's founder sees a need for a shared system that keeps evidence, documentation, and case history connected across forensic disciplines.</p>
            <p>SkeletID is intended to support collaboration within agencies and across local, state, and federal organizations. The goal is to help teams coordinate while preserving case context and chain-of-custody records.</p>
            <p>Each discipline brings its own methods and responsibilities. A shared operating system should support those differences, not replace professional expertise or institutional authority.</p>
          </div>
        </div>
      </section>
      <section className="section compact"><div className="content-narrow"><span className="section-kicker">Get in touch</span><h2>{site.founderLabel}</h2><a className="text-link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></div></section>
      <DevStatus />
    </div>
  </Layout>;
}
