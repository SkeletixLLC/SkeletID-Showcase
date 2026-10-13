import Card from '../components/Card';
import DevStatus from '../components/DevStatus';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { principles } from '../data/content';

export default function Technology() {
  return <Layout><PageHeading eyebrow="Technology principles" title="Technology and security goals." description="SkeletID is under development. These principles outline the design direction, not a finalized architecture or verified security, certification, or performance." />
    <div className="container page-content">
      <DevStatus />
      <section className="section compact"><div className="tile-grid">{principles.map((item)=><Card key={item.number}><span className="tile-number">{item.number} / DESIGN GOAL</span><h3>{item.title}</h3><p>{item.body}</p></Card>)}</div></section>
      <section className="section compact"><div className="two-col"><div><span className="section-kicker">Principles under consideration</span><h2>Design for forensic work.</h2></div><div className="feature-list">
        {[['Connected records','Keep evidence, observations, methods, and reports linked to their sources and case context.'],['Professional review','Keep qualified professionals responsible for interpretation, review, and decisions.'],['Careful information exchange','Preserve context and provenance when information is shared, and account for the limits of each integration.'],['Privacy and governance','Define how information is accessed, handled, and retained before operational use.']].map(([t,d],i)=><div className="feature-row" key={t}><span className="feature-index">0{i+1}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}
      </div></div></section>
      <div className="callout"><span className="callout-mark">!</span><span>These goals are not claims of security certification, regulatory compliance, validated performance, completed integrations, or readiness for operational use.</span></div>
    </div>
  </Layout>;
}
