import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

export default function NotFound() {
  return <Layout><section className="not-found"><div><span className="eyebrow">404 / Page not found</span><h1>We couldn't find that page.</h1><p>The link may be out of date, or the address may be incorrect.</p><Link className="button" to="/">Return to the Skeletix homepage <ArrowRight size={15} /></Link></div></section></Layout>;
}
