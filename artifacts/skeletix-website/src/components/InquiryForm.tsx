import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

export default function InquiryForm({ category = false }: { category?: boolean }) {
  const [message, setMessage] = useState('');
  const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('This form is a design placeholder and is disabled. No information was sent or stored.');
  };
  return <form className="form-box" onSubmit={preventSubmit} data-testid={category ? 'contact-form' : 'inquiry-form'}>
    {category && <div className="field"><label htmlFor="inquiry-category">What would you like to discuss?</label><select id="inquiry-category" defaultValue=""><option value="" disabled>Select a topic</option><option>General question</option><option>Product and research</option><option>Media inquiry</option><option>Other</option></select></div>}
    <div className="field"><label htmlFor="full-name">Name</label><input id="full-name" name="name" autoComplete="name" placeholder="Your name" disabled /></div>
    <div className="field"><label htmlFor="email-address">Email</label><input id="email-address" name="email" type="email" autoComplete="email" placeholder="you@example.org" disabled /></div>
    {!category && <div className="field"><label htmlFor="organization">Organization <span>(optional)</span></label><input id="organization" name="organization" placeholder="Organization name" disabled /></div>}
    <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" placeholder="A brief note about your inquiry" disabled /></div>
    <button type="submit" className="button" disabled>Send inquiry <ArrowRight size={15} aria-hidden="true" /></button>
    <p className="disabled-note">This form is disabled. Form delivery has not been connected; submissions do not send email or reach Skeletix. Fields are unavailable and no information is collected.{message && <span role="status"> {message}</span>}</p>
  </form>;
}
