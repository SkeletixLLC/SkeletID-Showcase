export const site = {
  company: 'Skeletix LLC',
  product: 'SkeletID',
  status: 'In development',
  tagline: 'One operating system for all forensic science applications.',
  demoPrototypeUrl: 'https://witty-water-0e51aeb0f.3.azurestaticapps.net/ver1/sign-in.html',
  founderLabel: "Skeletix's founder",
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
  '/': { title: 'Skeletix | SkeletID for forensic science', description: 'Skeletix is developing SkeletID, a unified operating system designed to connect forensic work, case information, documentation, and review.' },
  '/platform': { title: 'SkeletID Platform Concept | Skeletix', description: 'See how SkeletID is intended to connect evidence, forensic examinations, chain-of-custody records, and collaboration across institutions.' },
  '/demonstration': { title: 'SkeletID Concept Demonstration | Skeletix', description: 'Explore the SkeletID sign-in concept. This separate prototype is for demonstration only and is not an operational casework system.' },
  '/technology': { title: 'SkeletID Technology Goals | Skeletix', description: 'Learn about the technical and security principles guiding SkeletID, a proposed forensic science operating system under development.' },
  '/about': { title: 'About Skeletix | SkeletID', description: 'Learn why Skeletix is developing SkeletID to connect forensic disciplines, track chain of custody, and support collaboration across institutions.' },
  '/investors': { title: 'Investment & Partnership Inquiries | Skeletix', description: 'Contact Skeletix to discuss potential investment or partnerships. No investment terms or active partnerships are offered on this website.' },
  '/contact': { title: 'Contact Skeletix | SkeletID', description: 'Contact Skeletix about SkeletID, the company, or potential partnerships using the Google Form or published email address.' },
  '/privacy': { title: 'Draft Privacy Policy | Skeletix', description: 'Read the draft privacy policy for the Skeletix website. It requires completion and legal review before publication.' },
  '/terms': { title: 'Draft Terms of Use | Skeletix', description: 'Read the draft terms for the Skeletix website. They require completion and legal review before publication.' },
  '/team': { title: 'Our Team | Skeletix', description: 'Meet the people developing SkeletID, an operating system intended to connect forensic disciplines.' },
  '/team/manage': { title: 'Team Directory Editor | Skeletix', description: 'Private owner workspace for managing the Skeletix team directory.' },
  '/sign-in': { title: 'Sign in | Skeletix', description: 'Sign in to check your access to the private Skeletix team directory editor.' },
  '/sign-up': { title: 'Create account | Skeletix', description: 'Create an account to check access to the Skeletix team directory editor. Registration does not grant access.' },
};

export const platformPrinciples = [
  { title: 'A connected workspace', body: 'Bring case records, observations, methods, and review into one proposed workspace. Keep decisions in the hands of the professionals doing the work.' },
  { title: 'Keep sources visible', body: 'Link records to their sources and related evidence as work moves from collection to examination and review.' },
  { title: 'Build review into the workflow', body: 'Keep observations, interpretations, and review distinct, while making it easier to follow how work develops.' },
];

export const principles = [
  { number: '01', title: 'Traceable work', body: 'Make the source and sequence of documented work easier to follow. Traceability is a design goal, not a validated capability.' },
  { number: '02', title: 'Professional accountability', body: 'Support qualified professionals without replacing their expertise, interpretation, or responsibility for decisions.' },
  { number: '03', title: 'Clear records', body: 'Distinguish observations, recorded facts, interpretations, and open questions.' },
  { number: '04', title: 'Careful development', body: 'Privacy, security, interoperability, and compliance require thoughtful design and validation. These decisions are not yet final or certified.' },
];

