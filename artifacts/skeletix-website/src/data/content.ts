export const site = {
  company: 'Skeletix LLC',
  product: 'SkeletID',
  status: 'In development',
  tagline: 'A more connected way to think about forensic science.',
  demoPrototypeUrl: 'https://witty-water-0e51aeb0f.3.azurestaticapps.net/ver1/sign-in.html',
  founderBio: '[Founder biography to be added by Skeletix LLC.]',
  contactEmail: '[Contact email to be added]',
  companyAddress: '[Company address to be added, if approved for publication]',
  investorInformation: '[Investor information to be added, if approved for publication]',
  partnershipInformation: '[Partnership information to be added, if approved for publication]',
  testimonials: '[No approved testimonials supplied]',
  lastUpdated: '[Date to be added before publication]',
};

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
  '/about': { title: 'About Skeletix | SkeletID', description: 'Learn about Skeletix LLC’s mission to explore a more connected, carefully designed digital foundation for forensic science.' },
  '/investors': { title: 'Investor & Partnership Information | Skeletix', description: 'Information for people interested in Skeletix. Investment and partnership inquiry forms are disabled until delivery is configured.' },
  '/contact': { title: 'Contact Skeletix | SkeletID', description: 'Find contact information for Skeletix LLC. The categorized contact form is disabled until form delivery is connected.' },
  '/privacy': { title: 'Draft Privacy Policy | Skeletix', description: 'Review the clearly marked draft privacy policy for the Skeletix website. This draft is not legal advice and requires review before publication.' },
  '/terms': { title: 'Draft Terms of Use | Skeletix', description: 'Review the clearly marked draft terms for the Skeletix website. These draft terms require legal review before publication.' },
};

export const platformPrinciples = [
  { title: 'A connected workspace', body: 'A proposed shared foundation for bringing case context, observations, methods, and review into a more coherent workspace—without suggesting that professional judgment can be automated.' },
  { title: 'Context that travels with the work', body: 'The design intent is to keep relevant provenance and relationships visible as work moves between stages, rather than leaving meaning scattered across disconnected records.' },
  { title: 'Review as part of the process', body: 'Planned workflows place documentation and review alongside the work itself, with clear distinctions between recorded information, interpretation, and subsequent review.' },
];

export const principles = [
  { number: '01', title: 'Traceable by design', body: 'Intended records should make the origin and sequence of documented work easier to follow. The approach remains a design goal, not a validated capability.' },
  { number: '02', title: 'People remain accountable', body: 'SkeletID is being conceived as a tool to support qualified professionals—not to replace expertise, interpretation, or accountable decision-making.' },
  { number: '03', title: 'Clarity over certainty', body: 'Interfaces should distinguish what is known, what is recorded, what is interpreted, and what still needs attention.' },
  { number: '04', title: 'Purposeful restraint', body: 'The product is under development. Specific implementation, privacy, security, interoperability, and compliance decisions have not yet been represented as finished or certified.' },
];

