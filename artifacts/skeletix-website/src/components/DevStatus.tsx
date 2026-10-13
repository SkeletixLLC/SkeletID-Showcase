export default function DevStatus({ compact = false }: { compact?: boolean }) {
  return <div className={`callout ${compact ? 'status-compact' : ''}`} role="note" data-testid="development-status">
    <span className="callout-mark" aria-hidden="true">●</span>
    <span><strong>SkeletID is under development.</strong> It is a proposed product, not a launched or production-ready system. Capabilities described on this site are design goals and may change.</span>
  </div>;
}
