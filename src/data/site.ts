import aliasShot from '~/assets/alias.png'

interface Project {
  name: string
  desc: string
  tags: string[]
  url: string
  flag?: string
  flagTone?: 'hot' | 'live'
}

export interface SkillGroup {
  category: string
  items: string[]
}

interface Ad {
  size: 'banner' | 'square'
  style: 'blink' | 'rainbow' | 'scroll' | 'cash'
  headline: string
  sub: string
  cta: string
  action?: 'scan' | 'ram'
}

export interface ScanAlert {
  title: string
  text: string
  image?: string
  alt?: string
  button?: string
}

export const SITE = {
  domain: 'smangrati.com',
  version: 'v1.2',
  title: 'Sanjok Mangrati — Fullstack Developer',
  description:
    'Sanjok Mangrati — a fullstack developer from India, building production systems with TypeScript, React, Node.js and PostgreSQL. Open to new projects.',
  copyrightYear: '2026',
} as const

export const PROFILE = {
  name: 'Sanjok Mangrati',
  role: 'Fullstack Developer',
} as const

const GITHUB = 'https://github.com/SanjokMangrati'
const LINKEDIN = 'https://linkedin.com/in/sanjok-mangrati-343277230'

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const LINKS = [
  { label: 'GitHub', href: GITHUB },
  { label: 'LinkedIn', href: LINKEDIN },
]

export const ABOUT_LINKS = [
  { label: '[ GitHub ]', href: GITHUB },
  { label: 'LinkedIn', href: LINKEDIN },
]

const gap = '\u00a0'.repeat(3)
const items = ['Open to work', 'Remote friendly', 'Contact below'].join(`${gap}|${gap}`)

export const TICKER_TEXT = gap + [items, items, items].join('\u00a0'.repeat(20))

export const COUNTER_DIGITS = 6

export const ABOUT_PARAGRAPHS = [
  "I'm a full-stack developer who likes building things and figuring out problems along the way. I don't always have the perfect approach from the start, and a lot of my work is basically tinkering, trying something, breaking it, fixing it, and slowly understanding what actually works and how.",
  "Over the past 3 years, I have been working with TypeScript, React and Node.js. I'm interested in building products where the software solves a real problem rather than just being technically interesting.",
  "I'm still learning a lot, still changing my mind about how things should be built, and probably will for a long time.",
]

export const SKILL_GROUPS: SkillGroup[] = [
  { category: 'Frontend', items: ['TypeScript', 'React.js', 'Next.js', 'Tailwind'] },
  {
    category: 'Backend',
    items: ['Node.js', 'NestJS', 'GraphQL', 'PostgreSQL', 'Redis', 'BullMQ'],
  },
  { category: 'Infrastructure', items: ['Docker', 'AWS', 'GCP', 'Vercel', 'Github Actions'] },
]

export const PROJECTS: Project[] = [
  {
    name: 'Alias',
    desc: 'Autonomous Job Application Pipeline for developers.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Dodo', 'Gmail API'],
    url: '/projects/alias',
    flag: 'LIVE',
    flagTone: 'live',
  },
  {
    name: 'Flow',
    desc: 'Self-hosted error tracker that groups app errors, llm traces, files them as GitHub issues, and hands the fixable ones to a coding agent.',
    tags: ['TypeScript', 'Hono', 'sqlite3', 'Github Actions'],
    url: '#',
    flag: 'COMING SOON!',
  },
]

export const ALIAS = {
  title: 'Alias',
  tagline: 'Autonomous job application pipeline for developers.',
  description: [
    'Alias runs the outbound side of a job search on its own. You sign in with Google, set your preferences, and upload your resume once. After that, it pulls jobs from company boards and aggregators. It scores each listing for two things: whether it looks like a real opening and how well it matches you. Then, it finds a hiring decision-maker and their email, tailors your resume to the specific job, renders it as an ATS-friendly PDF, writes a short outreach email, and sends it through your own Gmail so replies land directly in your inbox. You can let everything run automatically or approve each email before it goes out.',
  ],
  stack: [
    { category: 'Frontend', items: ['Next.js', 'TypeScript', 'Tailwind'] },
    {
      category: 'Backend',
      items: ['NestJS', 'PostgreSQL', 'Drizzle', 'Redis', 'BullMQ', 'Vercel AI SDK'],
    },
    { category: 'Integrations', items: ['Gmail API', 'Dodo Payments', 'Hunter'] },
    { category: 'Infrastructure', items: ['Cloudflare', 'AWS', 'Docker', 'Github Actions'] },
  ] as SkillGroup[],
  screenshot: {
    src: aliasShot,
    alt: 'The Alias pipeline screen: a list of applications with a match score, stage and status for each, and one row opened to show the contact, the dates and the activity log for that application.',
  },
  live: 'https://alias.smangrati.com',
}

export const QUICK_INFO = [
  { key: 'Status', value: 'Open to Work' },
  { key: 'Exp.', value: '3 years' },
  { key: 'Location', value: 'Darjeeling, India' },
  { key: 'Timezone', value: 'UTC+5:30' },
  { key: 'Stack', value: 'TS / React / PG' },
]

export const WORK_HISTORY = [
  { role: 'Senior Software Developer', company: 'Fleapo Co.', period: '2025-present' },
  { role: 'Fullstack Developer', company: 'Fleapo Co.', period: '2023–2025' },
]

export const ADS: Ad[] = [
  {
    size: 'banner',
    style: 'blink',
    headline: '★ YOU WON! ★',
    sub: 'You are visitor 1,000,000',
    cta: 'CLAIM PRIZE',
  },
  {
    size: 'square',
    style: 'rainbow',
    headline: 'DOWNLOAD MORE RAM',
    sub: 'Free. 100% safe.',
    cta: 'DOWNLOAD',
    action: 'ram',
  },
  {
    size: 'square',
    style: 'cash',
    headline: '$5,000 A WEEK',
    sub: 'From home. No experience.',
    cta: 'START NOW',
  },
  {
    size: 'banner',
    style: 'scroll',
    headline: '⚠ VIRUS ALERT',
    sub: 'Your computer is infected with 342 viruses',
    cta: 'CLEAN NOW',
    action: 'scan',
  },
]

export const SCAN_ALERTS: ScanAlert[] = [
  { title: 'Antivirus 2000', text: 'Scanning your computer. Do not turn it off.' },
  { title: 'Warning', text: 'Trojan.Win32 found in C:\\WINDOWS\\SYSTEM32' },
  { title: 'System Error', text: 'A fatal exception 0E has occurred at 0028:C0011E36.' },
  { title: 'Alert', text: '342 problems found. 341 of them are still here.' },
  { title: 'Notice', text: 'Your printer is also infected.' },
  { title: 'Disk Cleanup', text: 'Deleting SYSTEM32 to free up 2 MB of space.' },
  { title: 'Error', text: 'Error 404: error not found.' },
  { title: 'Antivirus 2000', text: 'Buy SuperClean 2000 now. Only $49.99 per week.' },
  { title: 'Memory', text: 'Not enough memory to show this message.' },
  { title: 'Modem', text: 'Somebody is downloading your hard drive.' },
  { title: 'Update', text: 'Your driver is out of date. Your other driver is out of date.' },
  { title: 'Warning', text: 'Do not press OK. Do not press Cancel. Do not press the X.' },
  {
    title: 'Antivirus 2000',
    text: 'You have been paw(ned)!! Send 1000 BTC to 4f2a9c7e1b3d8a06f5e2c94b7d1a3f8e to get your files back.',
    image: '/img/cat-gif.gif',
    alt: 'An animated cat, unimpressed by the mess on the screen.',
    button: 'Send',
  },
]

export const RAM_ALERT: ScanAlert = {
  title: 'Download Manager',
  text: 'Download 50 MB of extra RAM for this computer. Free, fast, and 100% safe.',
  button: 'Download',
}
