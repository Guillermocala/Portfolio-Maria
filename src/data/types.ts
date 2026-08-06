export interface Profile {
  name: string
  specialty: string
  description: string
  photo: string
  about: string
  stats: { label: string; value: string }[]
}

export interface Service {
  id: string
  title: string
  description: string
}

export interface FeaturedProject {
  id: string
  name: string
  image: string
  summary: string
}

export interface PortfolioImage {
  src: string
  alt: string
}

export interface BrandBlock {
  id: string
  brand: string
  intro: string
  items: PortfolioImage[]
}

export interface BrandingItem {
  name: string
  image: string
  alt: string
}

export interface QrItem {
  id: string
  image: string
  name: string
  description: string
  url: string
}

export interface FlyerItem {
  id: string
  image: string
  alt: string
  title?: string
}

export interface MenuItem {
  id: string
  mockup: string
  name: string
  description: string
  onlineUrl?: string
}

export interface TimelineEntry {
  year: string
  title: string
  company: string
  description: string
}

export interface Tool {
  name: string
  src: string
}

export interface ContactLink {
  type: 'email' | 'linkedin'
  label: string
  href: string
}

export interface EditorialItem {
  id: string
  title: string
  pdf: string
  cover: string
}

export interface NavLink {
  id: string
  label: string
}

export interface EditorialDocument {
  id: string
  title: string
  subtitle: string
  description: string
  cover: string
  pdf: string
  viewer: 'flipbook' | 'pdf'
}