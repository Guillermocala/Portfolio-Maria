import type { NavLink } from './types'

export const navLinks: NavLink[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'services', label: 'Servicios' },
  { id: 'featured', label: 'Destacados' },
  { id: 'portfolio', label: 'Portafolio' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'tools', label: 'Herramientas' },
  { id: 'contact', label: 'Contacto' },
]

export const sectionIds = navLinks.map((link) => link.id)
