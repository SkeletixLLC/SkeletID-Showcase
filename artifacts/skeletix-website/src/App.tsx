import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { SignIn, SignUp, useAuth, useClerk } from '@clerk/react';
import BrandLogo from './components/BrandLogo';
import Seo from './components/Seo';
import About from './pages/About';
import Contact from './pages/Contact';
import Demonstration from './pages/Demonstration';
import Home from './pages/Home';
import Investors from './pages/Investors';
import NotFound from './pages/NotFound';
import Platform from './pages/Platform';
import Privacy from './pages/Privacy';
import Technology from './pages/Technology';
import Terms from './pages/Terms';
import Team from './pages/Team';
import TeamManage from './pages/TeamManage';
import './team.css';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function HomeRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  if (isLoaded && isSignedIn) return <Navigate to="/team/manage" replace />;
  return <Home />;
}

function AuthFrame({ children, register = false }: { children: ReactNode; register?: boolean }) {
  const { isLoaded, isSignedIn } = useAuth();
  const clerk = useClerk();
  const location = useLocation();
  if (isLoaded && isSignedIn) return <Navigate to="/team/manage" replace />;
  // Verification needs an active signup attempt. A stray direct link should start at the signup form.
  if (isLoaded && location.pathname === '/sign-up/verify-email-address' && clerk.client?.signUp.status === null) {
    return <Navigate to="/sign-up" replace />;
  }
  if (!isLoaded) return <div className="team-auth-page"><Seo /><p role="status">Loading secure sign-in…</p></div>;
  return <div className="team-auth-page"><Seo />
    <aside className="team-auth-story">
      <BrandLogo />
      <div className="team-auth-copy"><span className="team-overline">Skeletix / Owner workspace</span><h1>One shared place for forensic work.</h1><p>Sign in to check your access to the private team directory editor. Account registration does not grant editing rights.</p></div>
      <span className="team-auth-wordmark">skeletix <span className="brand-sub">forensic science, connected</span></span>
    </aside>
    <section className="team-auth-card">
      {children}
      <p className="team-auth-note">{register ? 'An account is not an editor invitation. Access is determined separately by Skeletix.' : 'The directory editor is limited to accounts verified by Skeletix.'}</p>
      <Link className="team-auth-home" to="/">Back to Skeletix</Link>
    </section>
  </div>;
}

function App() {
  return <Routes>
    <Route path="/" element={<HomeRoute />} />
    <Route path="/sign-in/*" element={<AuthFrame><SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} forceRedirectUrl={`${basePath}/team/manage`} /></AuthFrame>} />
    <Route path="/sign-up/*" element={<AuthFrame register><SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} forceRedirectUrl={`${basePath}/team/manage`} /></AuthFrame>} />
    <Route path="/team" element={<Team />} />
    <Route path="/team/manage" element={<TeamManage />} />
    <Route path="/platform" element={<Platform />} />
    <Route path="/demonstration" element={<Demonstration />} />
    <Route path="/technology" element={<Technology />} />
    <Route path="/about" element={<About />} />
    <Route path="/investors" element={<Investors />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="*" element={<NotFound />} />
  </Routes>;
}

export default App;
