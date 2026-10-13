import { type ReactNode } from 'react';

export default function PageHeading({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <header className="page-hero"><div className="container reveal">
    <span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p className="lead">{description}</p>{children}
  </div></header>;
}
