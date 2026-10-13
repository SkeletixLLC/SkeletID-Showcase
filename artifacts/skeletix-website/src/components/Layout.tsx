import { type ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Seo from './Seo';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="site-shell"><Seo /><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></div>;
}
