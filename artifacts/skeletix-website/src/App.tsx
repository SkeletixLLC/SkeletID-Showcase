import { Route, Routes } from 'react-router-dom';
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

function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
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
