import Card from '../components/Card';
import DevStatus from '../components/DevStatus';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';

const workflowConcepts = [
  {
    number: '01',
    title: 'Capture',
    intent: 'Bring field observations, evidence intake, and laboratory documentation into the same case record.',
    example: 'A scene investigator could link recovery photographs and collection locations to an evidence item. An anthropologist could add an inventory and examination notes, with the author, date, and source recorded alongside each entry.',
  },
  {
    number: '02',
    title: 'Organize',
    intent: 'Connect evidence items, samples, examination requests, and results without losing their relationships.',
    example: 'A bone sample sent for DNA analysis could stay linked to its original evidence item. Dental images, toxicology requests, and other examinations could be grouped under the same case, with each discipline responsible for its own records.',
  },
  {
    number: '03',
    title: 'Review',
    intent: 'Keep technical review, questions, and revisions attached to the work being examined.',
    example: 'A firearms examiner could request a second review of comparison notes. A DNA analyst could connect reviewer comments to an interpretation and report version, so teams can distinguish preliminary work from reviewed findings.',
  },
  {
    number: '04',
    title: 'Understand',
    intent: 'Show how evidence handling, examinations, and reporting fit into the wider case history.',
    example: 'A case coordinator could follow an item from collection through transfers, laboratory receipt, examination, and report review. Local investigators and state or federal specialists could see pending work and related findings within their authorized scope.',
  },
];

const traceabilityIntents = [
  {
    number: '01',
    title: 'Origins remain visible',
    intent: 'Keep each observation, image, and result connected to its source rather than relying on a filename or a separate note.',
    example: 'A latent-print image could retain its evidence-item reference, capture details, and examiner notes. A laboratory result could link back to the sample and the documented method used.',
  },
  {
    number: '02',
    title: 'Sequence is legible',
    intent: 'Make custody events and changes to case records distinguishable and easier to follow.',
    example: 'An intended custody record would document who released and received an item, when the transfer occurred, and its purpose. Examination dates, amended findings, and report versions would have their own history, separate from physical custody.',
  },
  {
    number: '03',
    title: 'Review has context',
    intent: 'Allow specialists to collaborate on relevant records while preserving authorship and responsibility.',
    example: 'A local agency could coordinate with a state laboratory or federal specialist around the same evidence item. Questions and responses would stay linked to the examination or report they concern, with sharing governed by institutional permissions.',
  },
];

export default function Platform() {
  return <Layout><PageHeading eyebrow="Platform concept" title="A connected view of forensic work." description="From scene documentation to laboratory analysis and report review, SkeletID is intended to connect forensic disciplines in one operating system. The examples below describe proposed workflows, not available features." />
    <div className="container page-content">
      <DevStatus />
      <section className="section compact"><div className="section-head"><span className="section-kicker">Proposed architecture</span><h2>From the scene to the laboratory to review.</h2><p>These four concepts describe how different kinds of forensic work could connect. The illustrative examples span several disciplines; they are not a finalized feature list. Workflows would need to be developed and evaluated with the professionals and institutions using them.</p></div>
        <div className="architecture-flow">
          {workflowConcepts.map(({ number, title, intent, example }) => (
            <article className="flow-item" key={number}>
              <small>{number} / CONCEPT</small>
              <h3>{title}</h3>
              <p>{intent}<br /><br /><strong>In forensic work:</strong> {example}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section compact"><div className="two-col"><div><span className="section-kicker">The through line</span><h2>Follow the evidence and the work behind it.</h2></div><div><p>Evidence may move between a local evidence unit, a state laboratory, and a federal institution. SkeletID is intended to keep custody records connected to examination requests, results, and review, so a handoff does not separate an item from its history.</p><p>Physical chain of custody and the history of digital records are related but distinct. The concept calls for documenting both, with clear authorship and controlled sharing within and across institutions. It does not claim validated auditability, regulatory compliance, or guaranteed admissibility.</p></div></div></section>
      <section className="section compact">
        <div className="tile-grid">
          {traceabilityIntents.map(({ number, title, intent, example }) => (
            <Card key={number}>
              <span className="tile-number">{number} / INTENT</span>
              <h3>{title}</h3>
              <p>{intent}</p>
              <p><strong>In forensic work:</strong> {example}</p>
            </Card>
          ))}
        </div>
      </section>
      <p>These examples describe documentation and coordination, not automated forensic conclusions. Professional judgment remains with qualified practitioners. Audit mechanisms, retention, access controls, integrations, and validation methods still require development and testing.</p>
    </div>
  </Layout>;
}
