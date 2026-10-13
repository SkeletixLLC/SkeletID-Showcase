import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { fictionalSample } from '../data/content';

export default function Demonstration() {
  return <Layout><PageHeading eyebrow="Concept demonstration" title="A sketch of connected context." description="This non-functional mockup illustrates a possible way to bring a case overview, documentation, and review into one workspace." />
    <div className="container page-content">
      <div className="callout"><span className="callout-mark">!</span><span><strong>Fictional data. Conceptual interface.</strong> Every identifier, note, and record below is invented for illustration. No actual person, case, evidence, examination, or professional workflow is represented. This is not a working product.</span></div>
      <section style={{ marginTop: 30 }} aria-label="Fictional SkeletID interface mockup">
        <div className="demo-window">
          <div className="demo-bar"><span>SkeletID / workspace concept</span><span className="fiction-label">Fictional sample · not operational</span></div>
          <div className="demo-body">
            <aside className="demo-side" aria-label="Conceptual mockup sections"><span className="active">Overview</span><span>Observations</span><span>Documentation</span><span>Review notes</span></aside>
            <div className="demo-main">
              <span className="section-kicker">Illustrative workspace</span><h3>{fictionalSample.title}</h3><p>{fictionalSample.note}</p>
              <div className="sample-case"><div><small>Sample record identifier</small><p style={{ fontFamily: 'var(--mono)', color: '#466258', marginTop: 6 }}>{fictionalSample.caseId}</p></div><div><small>Illustrative status</small><p style={{ marginTop: 6 }}>Design mockup only</p></div></div>
              <table className="demo-table"><thead><tr><th>Record type</th><th>Example content</th><th>State</th></tr></thead><tbody>{fictionalSample.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table>
              <span className="demo-stamp">SAMPLE CONTENT — ENTIRELY FICTIONAL</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section compact"><div className="two-col"><div><span className="section-kicker">What this is</span><h2>An illustration for conversation.</h2></div><div><p>This screen helps communicate one possible information architecture. It does not indicate that software has been deployed, that any dataset exists, or that the displayed states correspond to working functionality.</p><p>The visual language and workflow concepts may change as SkeletID continues through development.</p><Link className="text-link" to="/platform">Explore the proposed platform <ArrowRight size={14} /></Link></div></div></section>
    </div>
  </Layout>;
}
