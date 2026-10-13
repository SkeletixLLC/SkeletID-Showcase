import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { navigation } from '../data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return <>
    <div className="announcement"><div className="container announcement-inner"><span className="status-dot" aria-hidden="true" />SkeletID is under development. This site describes design goals, not available product features.</div></div>
    <nav className="navbar" aria-label="Main navigation"><div className="container nav-inner">
      <Link to="/" className={`brand${location.pathname === '/' ? ' brand-home' : ''}`} aria-label="Skeletix home">
        <BrandLogo /><span><span className="brand-name">skeletix</span><span className="brand-sub">forensic science, connected</span></span>
      </Link>
      <button className="mobile-toggle" type="button" aria-expanded={open} aria-controls="primary-links" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}>
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <div id="primary-links" className={`nav-links${open ? ' open' : ''}`}>
        {navigation.map((item) => <NavLink key={item.href} to={item.href}>{item.label}</NavLink>)}
        <NavLink to="/investors">Investors</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </div></nav>
  </>;
}
