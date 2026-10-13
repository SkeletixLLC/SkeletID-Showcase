import Card from '../components/Card';
import DevStatus from '../components/DevStatus';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';

export default function Platform() {
  return <Layout><PageHeading eyebrow="Platform concept" title="A connected view of forensic work." description="SkeletID is being developed as a proposed operating system: a coherent place to relate work, context, documentation, and review. The architecture below describes a design direction, not a current implementation." />
    <div className="container page-content">
      <DevStatus />
      <section className="section compact"><div className="section-head"><span className="section-kicker">Proposed architecture</span><h2>From recorded work to reviewable context.</h2><p>The conceptual model groups common needs into connected layers. Scope, implementation, and suitability remain to be determined through development and appropriate professional input.</p></div>
        <div className="architecture-flow">{[['01','Capture','A proposed place for observations and source context.'],['02','Organize','Relate materials, notes, and work items.'],['03','Review','Keep review and discussion near the record.'],['04','Understand','Support a clearer view of sequence and relationships.']].map(([n,t,d])=><article className="flow-item" key={n}><small>{n} / CONCEPT</small><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>
      <section className="section compact"><div className="two-col"><div><span className="section-kicker">The through line</span><h2>Traceability is a design consideration.</h2></div><div><p>When information is recorded in disconnected places, it can be difficult to reconstruct the context in which it was created or how it relates to later work. SkeletID’s proposed direction gives those relationships a visible place in the workflow.</p><p>This is an aspiration, not a claim of validated auditability, chain-of-custody support, or regulatory compliance. Those questions require careful design, technical implementation, testing, and review.</p></div></div></section>
      <section className="section compact"><div className="tile-grid">{[['01','Origins remain visible','An intended interface goal is to keep source and context close to documented work.'],['02','Sequence is legible','The concept considers how people might review when work was recorded and how it developed.'],['03','Review has context','Notes and review are intended to remain connected to the material they address.']].map(([n,t,d])=><Card key={n}><span className="tile-number">{n} / INTENT</span><h3>{t}</h3><p>{d}</p></Card>)}</div></section>
      <p>Specific audit mechanisms, retention behavior, access controls, integrations, and validation methods have not been finalized or represented as available.</p>
    </div>
  </Layout>;
}
