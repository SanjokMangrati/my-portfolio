import aliasShot from '~/assets/alias.png'

export type Status = 'open' | 'live' | 'progress'

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Project {
  name: string
  kind: string
  desc: string
  stack: string[]
  status: Exclude<Status, 'open'>
  href?: string
}

export const SITE = {
  domain: 'smangrati.com',
  version: 'v2.0',
  title: 'Sanjok Mangrati — Fullstack Developer',
  description:
    'Sanjok Mangrati — a fullstack developer from Darjeeling, India, building production systems with TypeScript, React, Node.js and PostgreSQL. Open to work.',
  copyrightYear: '2026',
} as const

export const PROFILE = {
  name: 'Sanjok Mangrati',
  firstName: 'Sanjok',
  lastName: 'Mangrati',
  role: 'Fullstack developer building production systems with TypeScript, React, Node.js and PostgreSQL.',
  openToWork: true,
} as const

export const PLACE = {
  name: 'Darjeeling, India',
  coordinates: '27°02′ N 88°16′ E',
  elevation: '2,042 m',
  timeZone: 'Asia/Kolkata',
  offset: 'UTC+5:30',
  experience: '3 years shipping',
} as const

export const GITHUB = 'https://github.com/SanjokMangrati'
export const LINKEDIN = 'https://linkedin.com/in/sanjok-mangrati-343277230'

export const NAV = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
] as const

export const CONTACT_LINES = [
  { label: 'LinkedIn', hint: '/in/sanjok-mangrati', href: LINKEDIN },
  { label: 'GitHub', hint: '@SanjokMangrati', href: GITHUB },
  { label: 'Write to me', hint: 'The form below', href: '#contact-form' },
]

export const CONTACT_INTRO =
  'Open to full-time roles, and interesting side projects. If you have a problem worth solving, reach out.'

export const ABOUT_PARAGRAPHS = [
  "I'm a full-stack developer who likes building things and figuring out problems along the way.",
  "I don't always have the perfect approach from the start, and a lot of my work is basically tinkering, trying something, breaking it, fixing it, and slowly understanding what actually works and how.",
  "Over the past 3 years, I have been working with TypeScript, React and Node.js. I'm interested in building products where the software solves a real problem rather than just being technically interesting.",
  "I'm still learning a lot, still changing my mind about how things should be built, and probably will for a long time.",
]

export const SKILL_GROUPS: SkillGroup[] = [
  { category: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Tailwind'] },
  { category: 'Backend', items: ['Node.js', 'NestJS', 'GraphQL', 'PostgreSQL', 'Redis', 'BullMQ'] },
  { category: 'Infrastructure', items: ['Docker', 'AWS', 'GCP', 'Vercel', 'GitHub Actions'] },
]

export const PROJECTS: Project[] = [
  {
    name: 'Alias',
    kind: 'SaaS',
    desc: 'Autonomous job application pipeline for developers. It finds roles, tailors your resume, writes the outreach and sends it from your own Gmail.',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Dodo', 'Gmail API'],
    status: 'live',
    href: '/projects/alias/',
  },
  {
    name: 'Flow',
    kind: 'Dev tool',
    desc: 'Self-hosted error tracker that groups app errors and LLM traces, files them as GitHub issues, and hands the fixable ones to a coding agent.',
    stack: ['TypeScript', 'Hono', 'SQLite', 'GitHub Actions'],
    status: 'progress',
  },
]

export const WORK_HISTORY = [
  { role: 'Senior Software Developer', company: 'Fleapo Co.', start: '2025', end: null },
  { role: 'Fullstack Developer', company: 'Fleapo Co.', start: '2023', end: '2025' },
]

export const ALIAS = {
  title: 'Alias',
  tagline: 'Autonomous job application pipeline for developers.',
  description: [
    'Alias runs the outbound side of a job search on its own. You sign in with Google, set your preferences, and upload your resume once.',
    'After that, it pulls jobs from company boards and aggregators. It scores each listing for two things: whether it looks like a real opening and how well it matches you.',
    'Then, it finds a hiring decision-maker and their email, tailors your resume to the specific job, renders it as an ATS-friendly PDF, writes a short outreach email, and sends it through your own Gmail so replies land directly in your inbox.',
    'You can let everything run automatically or approve each email before it goes out.',
  ],
  stack: [
    { category: 'Frontend', items: ['Next.js', 'TypeScript', 'Tailwind'] },
    { category: 'Backend', items: ['NestJS', 'PostgreSQL', 'Drizzle', 'Redis', 'BullMQ', 'Vercel AI SDK'] },
    { category: 'Integrations', items: ['Gmail API', 'Dodo Payments', 'Hunter'] },
    { category: 'Infrastructure', items: ['Cloudflare', 'AWS', 'Docker', 'GitHub Actions'] },
  ] as SkillGroup[],
  integrations: ['Gmail API', 'Dodo Payments', 'Hunter'],
  screenshot: {
    src: aliasShot,
    alt: 'The Alias pipeline screen: a list of applications with a match score, stage and status for each, and one row opened to show the contact, the dates and the activity log for that application.',
  },
  live: 'https://alias.smangrati.com',
}
