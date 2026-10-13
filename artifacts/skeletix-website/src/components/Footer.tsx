import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { site } from '../data/content';

export default function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-top">
      <div className="footer-brand">
        <Link to="/" className="brand"><BrandLogo /><span><span className="brand-name">skeletix</span><span className="brand-sub">SkeletID in development</span></span></Link>
        <p>Exploring a more connected digital foundation for forensic science. Thoughtful design, with professional context and human judgment at the center.</p>
      </div>
      <div className="footer-links">
        <div><h3>Explore</h3><Link to="/platform">Platform concept</Link><Link to="/demonstration">Concept demonstration</Link><Link to="/technology">Technology principles</Link></div>
        <div><h3>Company</h3><Link to="/about">About Skeletix</Link><Link to="/investors">Investors & partnerships</Link><Link to="/contact">Contact</Link></div>
        <div><h3>Information</h3><Link to="/privacy">Draft privacy policy</Link><Link to="/terms">Draft terms</Link><span className="brand-sub">{site.status}</span></div>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {site.company}. All content is the property of Skeletix LLC. SkeletID is under development.</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>
  </div></footer>;
}
