import DevStatus from '../components/DevStatus';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function About() {
  return <Layout><PageHeading eyebrow="About Skeletix" title="A considered approach to a complex field." description="Skeletix LLC is developing SkeletID around a simple question: how might digital tools better connect the work of forensic science without losing the context and care it requires?" />
    <div className="container page-content">
      <section className="split-panel"><div><span className="eyebrow">Our mission</span><h2>Bring the work into clearer view.</h2><p>We are exploring a digital foundation that could help forensic science professionals navigate information with greater context and continuity. We believe thoughtful tools should respect the complexity of the work and the people it serves.</p></div><div><span className="eyebrow">Our approach</span><h3>Curiosity with restraint.</h3><p>Forensic science calls for rigor, humility, and responsible communication. SkeletID is at an early stage; we will describe what is intended while remaining clear about what is not yet built or established.</p></div></section>
      <section className="section"><div className="two-col"><div><span className="section-kicker">Why forensic anthropology</span><h2>Start with the realities of the work.</h2></div><div><p>Forensic anthropology draws on detailed observation, methodical documentation, and careful interpretation in service of human questions. Its practice makes visible why context, provenance, and thoughtful review matter.</p><p>Skeletix is interested in this field as a meaningful starting point for considering how digital systems might better support forensic science—not as a claim of professional authority or a substitute for expertise.</p></div></div></section>
      <section className="section compact"><div className="content-narrow"><span className="section-kicker">Founder</span><h2>A little more about the people behind the work.</h2><p>{site.founderBio}</p><p className="section-kicker">This placeholder is intentionally editable. No founder identity or biography has been published here.</p></div></section>
      <DevStatus />
    </div>
  </Layout>;
}
