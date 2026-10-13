import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import DevStatus from '../components/DevStatus';
import Layout from '../components/Layout';
import PlatformGraphic from '../components/PlatformGraphic';
import { platformPrinciples, principles } from '../data/content';

export default function Home() {
  return <Layout>
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy reveal"><span className="eyebrow">Skeletix LLC · SkeletID in development</span>
        <h1>Forensic science deserves a <em>connected foundation.</em></h1>
        <p className="lead">We are developing SkeletID: a proposed operating system for forensic science workflows, designed to bring context, documentation, and review into closer conversation.</p>
        <div className="hero-actions"><Link className="button" to="/platform">Explore the platform <ArrowRight size={15} /></Link><Link className="button secondary" to="/demonstration">View concept demonstration <ArrowRight size={15} /></Link></div>
      </div><PlatformGraphic />
    </div></section>
    <div className="container" style={{ paddingTop: 26 }}><DevStatus /></div>
    <section className="section"><div className="container two-col">
      <div><span className="eyebrow">The opportunity</span><h2>Good work needs room to connect.</h2><p>Forensic science is careful, multidisciplinary work. The digital tools around it should make it easier to see how information relates—while keeping professional judgment and accountability with people.</p><Link className="text-link" to="/about">Why Skeletix is exploring this <ArrowRight size={14} /></Link></div>
      <div className="feature-list">{platformPrinciples.map((item, i) => <div className="feature-row" key={item.title}><span className="feature-index">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></div>)}</div>
    </div></section>
    <section className="section compact" style={{ background: '#e9eee8' }}><div className="container">
      <div className="section-head"><span className="eyebrow">A design direction, not a finished product</span><h2>One concept. A few deliberate priorities.</h2><p>SkeletID is early-stage work. These are the principles shaping the proposed direction—not a list of features available today.</p></div>
      <div className="tile-grid">{principles.slice(0, 3).map((item) => <Card key={item.number}><span className="tile-number">{item.number} / PRINCIPLE</span><h3>{item.title}</h3><p>{item.body}</p></Card>)}</div>
    </div></section>
    <section className="section"><div className="container split-panel">
      <div><span className="eyebrow">See the idea</span><h2>A working sketch of the experience.</h2><p>Explore a non-functional concept screen built with invented sample records. It is intended to make the design direction easier to discuss—not to represent an active system.</p><Link to="/demonstration" className="button">Open the demonstration <ArrowRight size={15} /></Link></div>
      <div><span className="eyebrow">Built around people</span><h3>Technology should support considered practice.</h3><p>Our aim is to explore how digital workflows might better serve forensic science professionals and the communities their work touches. The hard questions—about fit, governance, and evidence—deserve thoughtful answers as development progresses.</p><Link to="/technology" className="text-link">Read our design goals <ArrowRight size={14} /></Link></div>
    </div></section>
  </Layout>;
}
