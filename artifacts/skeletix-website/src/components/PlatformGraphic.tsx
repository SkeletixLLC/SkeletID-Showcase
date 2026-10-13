import { Activity, FileCheck2, GitBranch, Layers3, Microscope } from 'lucide-react';

export default function PlatformGraphic() {
  return <div className="architecture-art reveal-delay" aria-label="Conceptual diagram of proposed connected SkeletID workflows">
    <div className="art-top"><span>Conceptual system map</span><span className="art-led"><i /><i /><i /></span></div>
    <div className="art-core">
      <span className="orbit one" /><span className="orbit two" />
      <div className="core-node"><span><b>SkeletID</b><small>PROPOSED CORE</small></span></div>
      <span className="satellite a"><Layers3 aria-hidden="true" /></span><span className="satellite b"><FileCheck2 aria-hidden="true" /></span>
      <span className="satellite c"><GitBranch aria-hidden="true" /></span><span className="satellite d"><Microscope aria-hidden="true" /></span>
      <span className="satellite e"><Activity aria-hidden="true" /></span>
    </div>
    <div className="art-caption"><span>Illustrative only · subject to change</span><span>Design direction 01</span></div>
  </div>;
}
