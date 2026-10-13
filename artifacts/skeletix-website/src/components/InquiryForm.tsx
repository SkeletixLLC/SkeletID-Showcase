import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formDeliveryEnabled, site } from '../data/content';

export default function InquiryForm({ category = false }: { category?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const sending = useRef(false);
  const prefix = category ? 'contact' : 'investor';
  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    if (!formDeliveryEnabled) {
      setStatus('error');
      setMessage('The form is not enabled yet. Please email Skeletix directly.');
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get('_gotcha') || '').trim()) return;
    sending.current = true;
    setStatus('sending');
    setMessage('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(site.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
        signal: controller.signal,
      });
      if (!response.ok) {
        setStatus('error');
        setMessage(response.status === 429
          ? 'The form is temporarily unavailable. Please try again later or email Skeletix directly.'
          : 'Your inquiry could not be submitted. Please try again or email Skeletix directly.');
        return;
      }
      form.reset();
      setStatus('success');
      setMessage('Your inquiry has been submitted. Thank you for getting in touch.');
    } catch {
      setStatus('error');
      setMessage('We could not confirm your submission. Your message is still in the form. Please email Skeletix directly if you need help.');
    } finally {
      window.clearTimeout(timeout);
      sending.current = false;
    }
  };
  return <form className="form-box" onSubmit={submitInquiry} aria-busy={status === 'sending'} data-testid={category ? 'contact-form' : 'inquiry-form'}>
    <fieldset disabled={!formDeliveryEnabled || status === 'sending'}>
      <legend className="sr-only">{category ? 'Contact Skeletix' : 'Investment and partnership inquiry'}</legend>
      <input type="hidden" name="source" value={category ? 'Skeletix contact form' : 'Skeletix investor and partnership form'} />
      <div className="sr-only" aria-hidden="true"><label htmlFor={`${prefix}-website`}>Leave this field empty</label><input id={`${prefix}-website`} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></div>
      {category && <div className="field"><label htmlFor={`${prefix}-category`}>What would you like to discuss?</label><select id={`${prefix}-category`} name="topic" defaultValue="" required><option value="" disabled>Select a topic</option><option>General question</option><option>Product and research</option><option>Media inquiry</option><option>Other</option></select></div>}
      <div className="field"><label htmlFor={`${prefix}-name`}>Name</label><input id={`${prefix}-name`} name="name" autoComplete="name" placeholder="Your name" maxLength={120} required /></div>
      <div className="field"><label htmlFor={`${prefix}-email`}>Email</label><input id={`${prefix}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.org" maxLength={254} required /></div>
      {!category && <div className="field"><label htmlFor={`${prefix}-organization`}>Organization <span>(optional)</span></label><input id={`${prefix}-organization`} name="organization" placeholder="Organization name" maxLength={200} /></div>}
      <div className="field"><label htmlFor={`${prefix}-message`}>Message</label><textarea id={`${prefix}-message`} name="message" placeholder="A brief note about your inquiry" maxLength={5000} required /></div>
      <button type="submit" className="button" disabled={!formDeliveryEnabled || status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send inquiry'} <ArrowRight size={15} aria-hidden="true" /></button>
    </fieldset>
    {formDeliveryEnabled
      ? <p className="disabled-note">Formspree processes and stores your submission and forwards notifications to Skeletix. Please do not include case details, evidence, or confidential information. <Link to="/privacy">Read the draft privacy policy</Link>.</p>
      : <p className="disabled-note">This form is not enabled yet. Please email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> directly.</p>}
    {message && <p className="disabled-note" role={status === 'error' ? 'alert' : 'status'} aria-live={status === 'error' ? 'assertive' : 'polite'}>{message}{status === 'error' && <> <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></>}</p>}
  </form>;
}
