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
        description="See the current sign-in concept for SkeletID, hosted as a separate prototype. It is a design reference—not access to an operational product."
      />
      <div className="container page-content">
        <div className="callout" role="note">
          <span className="callout-mark" aria-hidden="true">!</span>
          <span>
            <strong>Prototype only. SkeletID is under development.</strong>{' '}
            This embedded sign-in screen is not production access. The mock may
            display example credentials or review states; do not enter real
            credentials, case information, or other sensitive data.
          </span>
        </div>

        <section className="prototype-section" aria-label="SkeletID web mock prototype">
          <div className="prototype-toolbar">
            <div>
              <span className="section-kicker">Hosted prototype</span>
              <p>Opens on a separate website. No Skeletix account is provided here.</p>
            </div>
            <a
              className="button"
              href={site.demoPrototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-open-prototype"
            >
              Open prototype in a new tab
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
            SkeletID is under development. This prototype may change and does
            not represent a launched or production-ready system.
          </p>
        </section>

        <section className="section compact">
          <div className="two-col">
            <div>
              <span className="section-kicker">A work in progress</span>
              <h2>A prototype to make the direction tangible.</h2>
            </div>
            <div>
              <p>
                The sign-in screen and review states are part of a concept
                demonstration. Their presence does not mean accounts, access
                requests, authentication, or casework are operational.
              </p>
              <p>
                No performance, security, validation, or compliance status is
                claimed for the prototype. SkeletID’s design and capabilities
                remain under development.
              </p>
              <Link className="text-link" to="/platform">
                Explore the proposed platform <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
