import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import DevStatus from '../components/DevStatus';
import Layout from '../components/Layout';
import { platformPrinciples, principles } from '../data/content';

export default function Home() {
  return <Layout>
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy reveal"><span className="eyebrow">Skeletix LLC · SkeletID in development</span>
        <h1>Forensic science deserves a <em>connected foundation.</em></h1>
        <p className="lead">SkeletID is a unified operating system for forensic science under development. It is designed to connect case information, documentation, and review in one workspace.</p>
        <div className="hero-actions"><Link className="button" to="/platform">Explore the platform <ArrowRight size={15} /></Link><Link className="button secondary" to="/demonstration">View concept demonstration <ArrowRight size={15} /></Link></div>
      </div>
    </div></section>
    <div className="container" style={{ paddingTop: 26 }}><DevStatus /></div>
    <section className="section"><div className="container two-col">
      <div><span className="eyebrow">The opportunity</span><h2>Keep case information connected.</h2><p>Forensic work draws on observations, methods, and records from several disciplines. Digital tools should help professionals follow those connections without taking decisions out of their hands.</p><Link className="text-link" to="/about">About Skeletix <ArrowRight size={14} /></Link></div>
      <div className="feature-list">{platformPrinciples.map((item, i) => <div className="feature-row" key={item.title}><span className="feature-index">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></div>)}</div>
    </div></section>
    <section className="section compact principles-section"><div className="container">
      <div className="section-head"><span className="eyebrow">A design direction, not a finished product</span><h2>What guides development.</h2><p>These principles guide the development of SkeletID. They describe our goals, not features available today.</p></div>
      <div className="tile-grid">{principles.slice(0, 3).map((item) => <Card key={item.number}><span className="tile-number">{item.number} / PRINCIPLE</span><h3>{item.title}</h3><p>{item.body}</p></Card>)}</div>
    </div></section>
    <section className="section"><div className="container split-panel">
      <div><span className="eyebrow">See the idea</span><h2>Explore the prototype.</h2><p>View the current SkeletID concept and fictional sample records. The demonstration is for discussion and is not an operational casework system.</p><Link to="/demonstration" className="button">Open the demonstration <ArrowRight size={15} /></Link></div>
      <div><span className="eyebrow">Built around people</span><h3>Professional judgment comes first.</h3><p>SkeletID is intended to support forensic science professionals, not replace their decisions. Workflows, data governance, and review requirements remain under development.</p><Link to="/technology" className="text-link">Read our design goals <ArrowRight size={14} /></Link></div>
    </div></section>
  </Layout>;
}
