import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeading from '../components/PageHeading';
import { site } from '../data/content';

export default function Demonstration() {
  return (
    <Layout>
      <PageHeading
        eyebrow="Prototype demonstration"
        title="Explore the SkeletID web mock."
        description="Explore the SkeletID sign-in concept in a separate prototype. It is a design reference, not an operational product."
      />
      <div className="container page-content">
        <div className="callout" role="note">
          <span className="callout-mark" aria-hidden="true">!</span>
          <span>
            <strong>Prototype only. SkeletID is under development.</strong>{' '}
            This sign-in screen does not provide access to a live product. It may
            display example credentials or review states. Do not enter real
            credentials, case information, or other sensitive data.
          </span>
        </div>

        <section className="prototype-section" aria-label="SkeletID web mock prototype">
          <div className="prototype-toolbar">
            <div>
              <span className="section-kicker">Hosted prototype</span>
              <p>This prototype opens on a separate website. It does not create or provide a Skeletix account.</p>
            </div>
            <a
              className="button"
              href={site.demoPrototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-open-prototype"
            >
              Open the prototype in a new tab
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="prototype-frame">
            <iframe
              src={site.demoPrototypeUrl}
              title="SkeletID sign-in prototype"
              loading="lazy"
              referrerPolicy="no-referrer"
              data-testid="frame-skeletid-prototype"
            />
          </div>
            <p className="prototype-caption">
             SkeletID is under development. This prototype may change and is not
             a launched or production-ready system.
          </p>
        </section>

        <section className="section compact">
          <div className="two-col">
            <div>
              <span className="section-kicker">A work in progress</span>
              <h2>A working view of the design direction.</h2>
            </div>
            <div>
              <p>
                The sign-in screen and review states illustrate a concept.
                They do not mean that accounts, access requests, authentication,
                or casework are available.
              </p>
              <p>
                The prototype has not been validated or assessed for security,
                performance, or compliance. SkeletID’s design and capabilities
                remain under development.
              </p>
              <Link className="text-link" to="/platform">
                Explore the platform concept <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
