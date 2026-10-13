import Card from '../components/Card';
import DevStatus from '../components/DevStatus';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { principles } from '../data/content';

export default function Technology() {
  return <Layout><PageHeading eyebrow="Technology principles" title="Designed for careful work." description="The technical direction for SkeletID is still being explored. These principles describe intended design goals—not a finalized architecture, certification, or verified performance." />
    <div className="container page-content">
      <DevStatus />
      <section className="section compact"><div className="tile-grid">{principles.map((item)=><Card key={item.number}><span className="tile-number">{item.number} / DESIGN GOAL</span><h3>{item.title}</h3><p>{item.body}</p></Card>)}</div></section>
      <section className="section compact"><div className="two-col"><div><span className="section-kicker">Principles under consideration</span><h2>Make the details matter.</h2></div><div className="feature-list">
        {[['Information relationships','Explore structures that keep records connected to the context that gives them meaning.'],['Human review','Keep qualified people central to interpretation and decisions.'],['Interoperability questions','Approach exchange with care for meaning, provenance, and the limits of any integration.'],['Privacy and governance','Treat data handling, access, retention, and governance as foundational open design questions.']].map(([t,d],i)=><div className="feature-row" key={t}><span className="feature-index">0{i+1}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}
      </div></div></section>
      <div className="callout"><span className="callout-mark">!</span><span>These principles do not imply security certification, regulatory compliance, validated performance, completed integrations, or suitability for operational use. No such status is claimed.</span></div>
    </div>
  </Layout>;
}
