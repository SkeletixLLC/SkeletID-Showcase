import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeMeta } from '../data/content';

export default function Seo() {
  const location = useLocation();
  const meta = routeMeta[location.pathname] ?? {
    title: 'Page not found | Skeletix',
    description: 'The requested Skeletix page could not be found.',
  };
  useEffect(() => {
    document.title = meta.title;
    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] ?? '');
        else element.name = selector.match(/name="([^"]+)"/)?.[1] ?? '';
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[name="twitter:card"]', 'content', 'summary');
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
  }, [location.pathname, meta.description, meta.title]);
  return null;
}
