export const site = {
  company: 'Skeletix LLC',
  product: 'SkeletID',
  status: 'In development',
  tagline: 'A unified operating system for forensic science.',
  demoPrototypeUrl: 'https://witty-water-0e51aeb0f.3.azurestaticapps.net/ver1/sign-in.html',
  ownerName: 'Anastasia Slack',
  ownerRole: 'Owner of Skeletix LLC',
  contactEmail: 'osteoidhumanid@gmail.com',
  googleContactFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScWRHHe7THtdbhDBn0zlnyuiHTVDsmxGDuU-ebYv-qq9JGINg/viewform',
  // Public form URL, not an API key. Configure the recipient in Formspree.
  formspreeEndpoint: '',
  formspreeRecipientVerified: false,
  companyAddress: '[Company address to be added, if approved for publication]',
  investorInformation: '[Investor information to be added, if approved for publication]',
  partnershipInformation: '[Partnership information to be added, if approved for publication]',
  testimonials: '[No approved testimonials supplied]',
  lastUpdated: '[Date to be added before publication]',
};

export const formDeliveryEnabled =
  /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(site.formspreeEndpoint) &&
  site.formspreeRecipientVerified;

export const navigation = [
  { label: 'Platform', href: '/platform' },
  { label: 'Demonstration', href: '/demonstration' },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
];

export const routeMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Skeletix | Building SkeletID for forensic science', description: 'Skeletix is developing SkeletID, a proposed unified operating system for forensic science. Explore the vision, design principles, and development status.' },
  '/platform': { title: 'SkeletID Platform | Skeletix', description: 'Explore the proposed SkeletID platform architecture, with connected workflows designed around traceability, context, and review.' },
  '/demonstration': { title: 'SkeletID Web Prototype | Skeletix', description: 'View the separate SkeletID sign-in prototype. It is a design mock, not access to a launched product or an operational casework system.' },
  '/technology': { title: 'Technology Principles | Skeletix', description: 'The intended technical principles and design goals guiding SkeletID, a forensic science operating system under development.' },
  '/about': { title: 'About Skeletix | SkeletID', description: 'Learn about Skeletix LLC, the company developing SkeletID, and its owner, Anastasia Slack.' },
  '/investors': { title: 'Investor & Partnership Information | Skeletix', description: formDeliveryEnabled ? 'Contact Skeletix LLC about investment or partnership inquiries through the inquiry form or by email.' : 'Information for people interested in Skeletix. Investment and partnership inquiry forms are disabled until delivery is configured.' },
  '/contact': { title: 'Contact Skeletix | SkeletID', description: 'Contact Anastasia Slack, Owner of Skeletix LLC, using the Google contact form or email for questions about SkeletID, the company, or partnerships.' },
  '/privacy': { title: 'Draft Privacy Policy | Skeletix', description: 'Review the clearly marked draft privacy policy for the Skeletix website. This draft is not legal advice and requires review before publication.' },
  '/terms': { title: 'Draft Terms of Use | Skeletix', description: 'Review the clearly marked draft terms for the Skeletix website. These draft terms require legal review before publication.' },
};

export const platformPrinciples = [
  { title: 'A connected workspace', body: 'SkeletID is intended to bring case information, observations, methods, and review into one workspace. Professional judgment remains with the people doing the work.' },
  { title: 'Keep the source in view', body: 'Records should retain their sources and links to related information as work moves between stages.' },
  { title: 'Review as part of the process', body: 'Planned workflows distinguish recorded information from interpretation and review, so each step can be followed.' },
];

export const principles = [
  { number: '01', title: 'Traceable by design', body: 'Intended records should make the origin and sequence of documented work easier to follow. The approach remains a design goal, not a validated capability.' },
  { number: '02', title: 'People remain accountable', body: 'SkeletID is intended to support qualified professionals. It does not replace their expertise, interpretation, or responsibility for decisions.' },
  { number: '03', title: 'Clarity over certainty', body: 'Interfaces should distinguish what is known, what is recorded, what is interpreted, and what still needs attention.' },
  { number: '04', title: 'Purposeful restraint', body: 'The product is under development. Specific implementation, privacy, security, interoperability, and compliance decisions have not yet been represented as finished or certified.' },
];

