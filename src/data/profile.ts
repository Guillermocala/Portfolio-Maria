import type { ContactLink, FeaturedProject, Profile, Service, TimelineEntry, Tool } from './types'

export const profile: Profile = {
  name: 'María Santiago',
  specialty: 'Diseñadora Gráfica · Branding · Social Media',
  description:
    'Ayudo a empresas y emprendimientos a comunicar su identidad mediante soluciones visuales creativas, contenido para redes sociales y material gráfico que conecta con las personas.',
  photo: '/src/assets/hero.jpeg',
  about:
    'Soy una diseñadora gráfica apasionada por construir identidades visuales sólidas y desarrollar piezas que transmitan el valor de cada marca. Mi trabajo combina creatividad, estrategia y atención al detalle para ofrecer soluciones visuales funcionales y memorables.',
  stats: [
    { label: 'Años de experiencia', value: '5+' },
    { label: 'Marcas destacadas', value: '3' },
    { label: 'Piezas gráficas', value: '100+' },
  ],
}

export const services: Service[] = [
  {
    id: 'branding',
    title: 'Branding',
    description: 'Diseño de identidad visual, papelería corporativa y piezas que fortalecen la imagen de una marca.',
  },
  {
    id: 'social',
    title: 'Social Media',
    description: 'Diseño de publicaciones para redes sociales, campañas visuales y contenido digital con identidad consistente.',
  },
  {
    id: 'advertising',
    title: 'Publicidad',
    description: 'Diseño de flyers, material POP-UPS y piezas promocionales para medios digitales e impresos.',
  },
  {
    id: 'editorial',
    title: 'Editorial',
    description: 'Diseño de catálogos, presentaciones, libros y documentos con una composición visual clara y profesional.',
  },
  {
    id: 'photography',
    title: 'Fotografía',
    description: 'Fotografía para productos, moda y contenido visual destinado a fortalecer la presencia de marca.',
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description: 'Apoyo visual para campañas digitales orientadas al posicionamiento y crecimiento de marcas.',
  },
]

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'smartcultivo',
    name: 'SmartCultivo',
    image: '/src/assets/featuredprojects/smartcultivo.jpg',
    summary:
      'Desarrollo de contenido para redes sociales, branding corporativo y piezas publicitarias para el sector agrícola.',
  },
  {
    id: 'thissa',
    name: 'Thissa Store',
    image: '/src/assets/featuredprojects/thissa.png',
    summary:
      'Diseño gráfico y marketing digital enfocado en contenido comercial, menús digitales, publicidad y comunicación visual.',
  },
  {
    id: 'osiris',
    name: 'Bar Osiris',
    image: '/src/assets/featuredprojects/osiris.png',
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