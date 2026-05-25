export const partnerCompanies = [
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
    name: 'Vaibhav Malhotra',
    role: 'Founder & Partner, Principal Engineer',
    location: 'Vancouver, BC',
    image: '/vaibhav.jpg',
    initials: 'VM',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vbvmalhotra/' },
      { label: 'GitHub', href: 'https://github.com/vmal' },
    ],
    shortBio:
      'Principal engineer with production AI work across Meta, Amazon, McGraw Hill, Scrubs Co-Pilot, Stuf Storage, Springhouse, and MyMethod.',
    bio: 'Vaibhav founded ESARC to pair senior engineers with an in-house agent fleet. He has shipped pricing services, voice agents, RAG over EHR data, multi-agent eval loops, and production AI systems inside startups and frontier AI teams.',
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
    name: 'Bhimesh Chauhan',
    role: 'Partner, AI Engineering',
    location: 'AI systems and engineering leadership',
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
    bio: 'Bhimesh brings 10+ years across startups and scale-ups, with recent work leading AI data infrastructure at BenchSci and co-founding Scrubs Co-Pilot. His background spans RAG, LLM systems, real-time clinical documentation, IoT operations, personalization, and AutoML integrations.',
    companies: partnerCompanies,
  },
] as const
