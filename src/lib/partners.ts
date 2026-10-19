export const partnerCompanies = [
  'Wrangle',
  'BenchSci',
  'Scrubs Co-Pilot',
  'KitchenMate / MicroMart',
  'Preply',
  'DataRobot',
  'Pitchly',
  'Nebullam',
  'Sodima Solutions',
  'Solum Labs / Climate Corporation',
] as const

export const partners = [
  {
    /** Matches the Person @id in the site-wide JSON-LD (/about#vaibhav). */
    id: 'vaibhav',
    name: 'Vaibhav Malhotra',
    role: 'Founder & Partner, Principal AI Engineer',
    location: 'Vancouver, BC',
    image: '/vaibhav.jpg',
    initials: 'VM',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mvaibhav/' },
      { label: 'GitHub', href: 'https://github.com/vmal' },
    ],
    shortBio:
      'Principal engineer with production AI work across Meta, Amazon, McGraw Hill, Scrubs Co-Pilot, Stuf Storage, Springhouse, and MyMethod.',
    bio: 'Vaibhav founded ESARC so senior engineers could ship production AI fast: AI agents write the code, and a partner reviews every change. He has shipped pricing services, voice agents, RAG over EHR data, multi-agent eval loops, and production AI systems inside startups and frontier AI teams.',
    companies: [
      'Meta',
      'Amazon',
      'McGraw Hill',
      'Scrubs Co-Pilot',
      'Stuf Storage',
      'Springhouse',
      'MyMethod',
    ],
  },
  {
    id: 'bhimesh',
    name: 'Bhimesh Chauhan',
    role: 'Partner, Principal AI Engineer',
    location: 'Vancouver, BC',
    image: '/bhimesh.jpg',
    initials: 'BC',
    links: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/bhimeshchauhan/',
      },
      { label: 'Portfolio', href: 'https://bhimeshchauhan.github.io/' },
    ],
    shortBio:
      'Engineering leader for AI-powered products, clinical documentation, RAG systems, biomedical data infrastructure, IoT platforms, and enterprise ML integrations.',
    bio: 'Bhimesh brings 10+ years across startups and scale-ups, with recent work leading AI data infrastructure at BenchSci and co-founding Scrubs Co-Pilot. He designed Wrangle, a consumer travel app built at ESARC, and owns most of its codebase. His background spans RAG, LLM systems, real-time clinical documentation, IoT operations, personalization, and AutoML integrations.',
    companies: partnerCompanies,
  },
] as const
