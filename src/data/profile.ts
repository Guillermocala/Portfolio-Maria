import type { ContactLink, FeaturedProject, Profile, Service, TimelineEntry, Tool } from './types'

export const profile: Profile = {
  name: 'María Alejandra Santiago',
  specialty: 'Diseñadora Gráfica · Community Manager · Marketing Digital',
  description:
    'Diseño piezas visuales que fortalecen la identidad de marca y mejoran la comunicación entre las empresas y sus clientes. Mi trabajo combina creatividad, estrategia y atención al detalle para desarrollar soluciones gráficas funcionales, atractivas y alineadas con cada proyecto.',
  photo: '/src/assets/hero.jpeg',
  about:
    'Soy diseñadora gráfica con experiencia en branding, diseño editorial, publicidad y contenido para redes sociales. Me apasiona crear piezas visuales que comuniquen con claridad, transmitan la personalidad de cada marca y generen una conexión auténtica con su audiencia. Cada proyecto representa una oportunidad para combinar creatividad, organización y pensamiento estratégico, cuidando cada detalle desde el concepto hasta la entrega final.',
  stats: [
    { label: 'Años de experiencia', value: '5+' },
    { label: 'Marcas destacadas', value: '3' },
    { label: 'Piezas gráficas', value: '100+' },
    { label: 'Áreas de especialidad', value: '6' },
  ],
}

export const services: Service[] = [
  {
    id: 'branding',
    title: 'Branding',
    description: 'Construcción de identidad visual, papelería corporativa y elementos gráficos que fortalecen el reconocimiento de marca.',
  },
  {
    id: 'social',
    title: 'Social Media',
    description: 'Diseño de publicaciones para redes sociales, campañas visuales y contenido digital con identidad consistente.',
  },
  {
    id: 'advertising',
    title: 'Publicidad',
    description: 'Flyers, piezas promocionales, material POP-UP y recursos visuales para campañas comerciales.',
  },
  {
    id: 'editorial',
    title: 'Editorial',
    description: 'Catálogos, libros, presentaciones y documentos con una estructura visual clara y profesional.',
  },
  {
    id: 'photography',
    title: 'Fotografía',
    description: 'Fotografía de productos, moda y contenido visual para complementar la identidad de las marcas.',
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description: 'Diseño de recursos gráficos para campañas digitales y estrategias de comunicación.',
  },
]

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'smartcultivo',
    name: 'SmartCultivo',
    image: '/src/assets/featuredprojects/smartcultivo.svg',
    summary:
      'Desarrollo de contenido para redes sociales, branding corporativo y piezas publicitarias para el sector agrícola.',
  },
  {
    id: 'thissa',
    name: 'Thissa Store',
    image: '/src/assets/featuredprojects/thissa.svg',
    summary:
      'Diseño gráfico y marketing digital enfocado en contenido comercial, menús digitales, publicidad y comunicación visual.',
  },
  {
    id: 'osiris',
    name: 'Bar Osiris',
    image: '/src/assets/featuredprojects/osiris.svg',
    summary:
      'Diseño de contenido para redes sociales y material promocional para fortalecer la identidad visual del establecimiento.',
  },
]

export const experienceEntries: TimelineEntry[] = [
  {
    year: '2022',
    title: 'Diseñadora Gráfica',
    company: 'SmartCultivo',
    description:
      'Diseño de publicaciones para redes sociales, branding corporativo, piezas publicitarias y comunicación visual.',
  },
  {
    year: '2025',
    title: 'Diseñadora Gráfica y Marketing Digital',
    company: 'Thissa Store',
    description:
      'Creación de contenido digital, menús físicos y digitales, material POP-UPS, fotografía y campañas para redes sociales.',
  },
  {
    year: 'Actualidad',
    title: 'Diseñadora Freelance',
    company: 'Proyectos Independientes',
    description:
      'Desarrollo de identidad visual, contenido para redes sociales y soluciones gráficas para diferentes marcas y emprendimientos.',
  },
]

export const tools: Tool[] = [
  { name: 'Adobe Illustrator', src: '/src/assets/tools/adobe-illustrator-logo.svg' },
  { name: 'Adobe Photoshop', src: '/src/assets/tools/adobe-photoshop-logo.svg' },
  { name: 'Canva', src: '/src/assets/tools/canva-logo.svg' },
  { name: 'CapCut', src: '/src/assets/tools/capcut-logo.svg' },
  { name: 'Microsoft Office', src: '/src/assets/tools/office-logo.svg' },
]

export const contactLinks: ContactLink[] = [
  { type: 'email', label: 'Correo electrónico', href: 'mailto:maria@example.com' },
  { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mar%C3%ADa-alejandra-santiago-4967b2257/' },
]