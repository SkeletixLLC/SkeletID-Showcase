import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

export default function NotFound() {
  return <Layout><section className="not-found"><div><span className="eyebrow">404 / Not found</span><h1>This page isn't in the record.</h1><p>The address may have changed, or the page may not exist.</p><Link className="button" to="/">Return to Skeletix <ArrowRight size={15} /></Link></div></section></Layout>;
}
