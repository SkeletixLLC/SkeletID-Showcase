import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../data/content';

export default function GoogleContactForm() {
  return (
    <section className="google-contact-form" aria-label="Contact form" data-testid="google-contact-form">
      <div className="google-form-toolbar">
        <div>
          <h3>Send an inquiry</h3>
          <p>This form is hosted by Google.</p>
        </div>
        <a className="button secondary" href={site.googleContactFormUrl} target="_blank" rel="noopener noreferrer">
          Open Google Form <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
      <iframe
        src={`${site.googleContactFormUrl}?embedded=true`}
        title="Skeletix contact form, hosted by Google Forms"
        className="google-form-frame"
        referrerPolicy="strict-origin-when-cross-origin"
        data-testid="google-contact-form-iframe"
      />
      <p className="google-form-note">
        Google Forms receives your response, and the form owner can view it. Submitting the form does not guarantee an email notification or a reply. Do not include case details, evidence, or confidential information.{' '}
        <Link to="/privacy">Read the draft privacy policy</Link>.
        {' '}If the form does not load here, open it using the link above.
      </p>
    </section>
  );
}
