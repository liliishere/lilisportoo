import modest1 from './assets/projects/modest-1.jpg'
import modest2 from './assets/projects/modest-2.jpg'
import lms1 from './assets/projects/lms-1.jpg'
import medimeet1 from './assets/projects/medimeet-1.jpg'
import vs1 from './assets/projects/vstravel-1.jpg'
import vs2 from './assets/projects/vstravel-2.jpg'
import vs3 from './assets/projects/vstravel-3.jpg'
import vs4 from './assets/projects/vstravel-4.jpg'

export const profile = {
  name: 'Rebecca Jielian',
  role: 'UI/UX designer & front-end developer',
  school: 'BINUS University Alam Sutera',
  study: 'Computer Science',
  semester: 'Semester 4',
  about:
    'I am a Computer Science student at BINUS University with interests in UI/UX design, front-end development, and digital product innovation. I enjoy creating user-centered solutions that combine technology, functionality, and accessibility.',
  about2:
    'Through academic and personal projects, I have designed web and mobile interfaces across healthcare, education, travel, and AI-powered applications, while collaborating in multidisciplinary teams.',
}

export const contacts = [
  { id: 'email', label: 'Email', handle: 'rjielian@gmail.com', href: 'mailto:rjielian@gmail.com', color: 'pink', note: 'for hellos & opportunities' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'in/rebecca-jielian', href: 'https://www.linkedin.com/in/rebecca-jielian', color: 'azure', note: "let's connect" },
  { id: 'github', label: 'GitHub', handle: '@liliishere', href: 'https://github.com/liliishere', color: 'citron', note: 'peek at my code' },
  { id: 'instagram', label: 'Instagram', handle: '@rjielian', href: 'https://www.instagram.com/rjielian', color: 'blush', note: 'little bits of life' },
]

export const projects = [
  {
    id: 'modest',
    title: 'Modest Uni Fits',
    tagline: 'AI-based university outfit appropriateness checker',
    year: 2026,
    kind: 'Team project',
    role: 'UI Designer',
    category: 'ai',
    color: 'pink',
    cover: modest1,
    images: [modest1, modest2],
    problem:
      'University students may be unsure whether their outfits meet campus dress expectations. Existing fashion apps focus on style rather than appropriateness.',
    solution:
      'An AI-powered application that lets users upload or capture photos of their outfits and receive feedback on whether the outfit is appropriate for university environments.',
    contributions: [
      "Designed the application's user interface",
      'Created screens for image upload and camera capture',
      'Designed result and feedback pages',
      'Ensured simple and user-friendly navigation',
      'Collaborated with teammates during development and testing',
    ],
    considerations: [
      'Minimize the steps required for outfit evaluation',
      'Present AI feedback in a clear, understandable format',
      'Keep a clean and approachable visual design',
      'Support users with varying levels of technical experience',
    ],
    link: { label: 'View on GitHub', href: 'https://github.com/catherine1265/Modest-uni-fits' },
  },
  {
    id: 'lms',
    title: 'BNCC Learning Platform',
    tagline: 'Learning management system website for BNCC members',
    year: 2026,
    kind: 'Personal design project',
    role: 'UI/UX Designer',
    category: 'web',
    color: 'azure',
    cover: lms1,
    images: [lms1],
    problem:
      'Organization members need a centralized platform to register for classes, view schedules, and track learning activities.',
    solution: 'A web-based Learning Management System (LMS) concept designed specifically for BNCC members.',
    contributions: [
      'Designed dashboard and registration pages',
      'Created class catalog interfaces',
      'Designed learning schedule views',
      'Developed user flows for enrollment and course management',
      'Focused on usability and information organization',
    ],
    considerations: [
      'Easy access to learning information and schedules',
      'Streamlined class registration process',
      'Consistent visual design across all pages',
      'Efficient navigation for new and returning members',
    ],
    link: {
      label: 'View in Figma',
      href: 'https://www.figma.com/design/NgLb2YQExkqyYeFtX7k24Z/TPM-Week-3?node-id=23-143&t=IitK5vkvEtUlired-1',
    },
  },
  {
    id: 'medimeet',
    title: 'Medimeet',
    tagline: 'Doctor appointment mobile app',
    year: 2025,
    kind: 'Academic project',
    role: 'UI Designer',
    category: 'mobile',
    color: 'citron',
    cover: medimeet1,
    images: [medimeet1],
    problem: 'Patients often experience difficulties scheduling appointments and managing healthcare visits.',
    solution: 'A mobile application that streamlines doctor appointment booking and management.',
    contributions: [
      'Designed appointment booking flows',
      'Created payment and scheduling interfaces',
      'Designed digital queueing screens',
      'Focused on accessibility and ease of use',
    ],
    considerations: [
      'Reduce friction in appointment scheduling',
      'Improve visibility of healthcare information',
      'Intuitive navigation for users of all ages',
      'Efficient patient management through digital features',
    ],
    link: {
      label: 'View prototype in Figma',
      href: 'https://www.figma.com/design/7MKzAOkDoxAu2oUuYI3wsz/MediMeet---Prototype?t=IitK5vkvEtUlired-1',
    },
  },
  {
    id: 'vstravel',
    title: 'VSTravel',
    tagline: 'Tour booking website',
    year: 2025,
    kind: 'Personal project',
    role: 'Front-End Developer & UI Designer',
    category: 'web',
    color: 'blush',
    cover: vs1,
    images: [vs1, vs2, vs3, vs4],
    problem: 'Travelers need a convenient platform to explore destinations and access booking information in one place.',
    solution:
      'A responsive travel website featuring destination information, travel packages, and booking functionality.',
    contributions: [
      'Designed and developed the website with HTML, CSS, and JavaScript',
      'Implemented responsive layouts for desktop and mobile',
      'Created destination pages and booking interfaces',
      'Published and maintained the project on GitHub',
    ],
    considerations: [
      'Mobile-friendly experience',
      'Clear presentation of destination information',
      'Easy navigation and booking process',
      'A visually appealing, travel-focused interface',
    ],
    link: null,
  },
]

/* "used" lists which projects each skill shows up in. 'site' = this portfolio itself. */
export const skillGroups = [
  {
    id: 'design',
    title: 'Design',
    note: 'making things feel lovely',
    color: 'pink',
    items: [
      { name: 'Figma', used: ['lms', 'medimeet'] },
      { name: 'UI Design', used: ['modest', 'lms', 'medimeet', 'vstravel', 'site'] },
      { name: 'UX Design', used: ['modest', 'lms', 'medimeet'] },
      { name: 'Wireframing', used: ['lms', 'medimeet'] },
      { name: 'Prototyping', used: ['lms', 'medimeet'] },
      { name: 'User Flow Design', used: ['lms', 'medimeet'] },
      { name: 'Design Systems', used: ['lms', 'site'] },
    ],
  },
  {
    id: 'tech',
    title: 'Technical',
    note: 'making things actually work',
    color: 'azure',
    items: [
      { name: 'React.js', used: ['site'], isNew: true },
      { name: 'HTML', used: ['vstravel', 'site'] },
      { name: 'CSS', used: ['vstravel', 'site'] },
      { name: 'JavaScript', used: ['vstravel', 'site'] },
      { name: 'Git & GitHub', used: ['vstravel', 'modest', 'site'] },
      { name: 'Python', used: [] },
      { name: 'Java', used: [] },
    ],
  },
  {
    id: 'soft',
    title: 'Soft skills',
    note: 'making things together',
    color: 'citron',
    items: [
      { name: 'Collaboration', used: ['modest', 'medimeet'] },
      { name: 'Communication', used: ['modest', 'medimeet'] },
      { name: 'Problem Solving', used: ['modest', 'lms', 'medimeet', 'vstravel'] },
      { name: 'Team Leadership', used: [] },
      { name: 'Project Management', used: ['lms', 'vstravel'] },
    ],
  },
]

export const siteCard = { id: 'site', title: 'This website!', tagline: 'Built with React.js', year: 2026, color: 'citron' }
