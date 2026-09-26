/**
 * Genera la imagen de vista previa al compartir el link (Open Graph) y los
 * íconos del sitio, con la paleta y tipografías del portafolio.
 *
 * Uso: node scripts/generate-og-image.mjs
 *
 * Salida (en /public):
 * - og-image.jpg          1200×630, la que muestran WhatsApp, LinkedIn, etc.
 * - apple-touch-icon.png  180×180
 * - favicon.ico           16/32/48 (lo que piden navegadores y buscadores)
 * - favicon-16.png        16×16
 * - favicon-32.png        32×32
 * - favicon-192.png       192×192
 *
 * Las fuentes se descargan del repo de Google Fonts a una caché temporal.
 */
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const HERO = path.join(ROOT, 'src', 'assets', 'hero.webp')
const SITE_URL = 'portfolio-maria-santiago.pages.dev'

const COLORS = {
  primary: '#fcb9c0',
  accent: '#a8395a',
  accentSoft: '#fff1f3',
  text: '#1b1b1b',
  muted: '#6b6b6b',
}

const FONT_SOURCES = {
  playfairItalic:
    'https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay-Italic%5Bwght%5D.ttf',
  playfair:
    'https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf',
  quicksand: 'https://github.com/google/fonts/raw/main/ofl/quicksand/Quicksand%5Bwght%5D.ttf',
}

async function loadFonts() {
  const dir = path.join(os.tmpdir(), 'portfolio-og-fonts')
  await mkdir(dir, { recursive: true })

  const fonts = {}
  for (const [name, url] of Object.entries(FONT_SOURCES)) {
    const file = path.join(dir, `${name}.ttf`)
    if (!existsSync(file)) {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`No se pudo descargar ${url}: ${response.status}`)
      await writeFile(file, Buffer.from(await response.arrayBuffer()))
    }
    fonts[name] = file
  }
  return fonts
}

/** Capa de texto con una fuente propia (sharp/pango con `fontfile`). */
async function text(content, { font, fontfile, color, size, width, weight = 'normal' }) {
  const { data, info } = await sharp({
    text: {
      text: `<span foreground="${color}" weight="${weight}">${content}</span>`,
      font: `${font} ${size}`,
      fontfile,
      rgba: true,
      dpi: 72,
      width,
      wrap: 'word',
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true })

  return { input: data, width: info.width, height: info.height }
}

/**
 * Forma orgánica del hero: equivalente al CSS
 * border-radius: 48% 52% 55% 45% / 45% 55% 45% 55%.
 */
function organicPath(w, h) {
  const [tl, tr, br, bl] = [0.48, 0.52, 0.55, 0.45].map((r) => r * w)
  const [tly, try_, bry, bly] = [0.45, 0.55, 0.45, 0.55].map((r) => r * h)
  return [
    `M ${tl} 0`,
    `L ${w - tr} 0`,
    `A ${tr} ${try_} 0 0 1 ${w} ${try_}`,
    `L ${w} ${h - bry}`,
    `A ${br} ${bry} 0 0 1 ${w - br} ${h}`,
    `L ${bl} ${h}`,
    `A ${bl} ${bly} 0 0 1 0 ${h - bly}`,
    `L 0 ${tly}`,
    `A ${tl} ${tly} 0 0 1 ${tl} 0`,
    'Z',
  ].join(' ')
}

async function heroPhoto(w, h) {
  const mask = Buffer.from(
    `<svg width="${w}" height="${h}"><path d="${organicPath(w, h)}" fill="#fff"/></svg>`,
  )
  return sharp(HERO)
    .resize(w, h, { fit: 'cover', position: 'top' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer()
}

async function ogImage(fonts) {
  const W = 1200
  const H = 630
  const photo = { w: 380, h: 475, x: 740, y: 70 }

  const background = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="blobA" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${COLORS.primary}" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="${COLORS.primary}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#ffffff"/>
      <circle cx="1080" cy="90" r="260" fill="url(#blobA)"/>
      <circle cx="40" cy="620" r="170" fill="${COLORS.accentSoft}"/>
      <g transform="translate(${photo.x + 16} ${photo.y + 16})">
        <path d="${organicPath(photo.w, photo.h)}" fill="${COLORS.primary}"/>
      </g>
      <circle cx="${photo.x + photo.w - 40}" cy="${photo.y - 4}" r="17" fill="${COLORS.primary}" fill-opacity="0.8"/>
      <rect x="80" y="520" width="56" height="3" rx="1.5" fill="${COLORS.primary}"/>
    </svg>`)

  const left = 80
  const roles = await text('Diseñadora Gráfica  ·  Community Manager  ·  Marketing Digital', {
    font: 'Quicksand',
    fontfile: fonts.quicksand,
    color: COLORS.accent,
    size: 22,
  })
  const first = await text('María', {
    font: 'Playfair Display Italic',
    fontfile: fonts.playfairItalic,
    color: COLORS.accent,
    size: 104,
  })
  const rest = await text('Alejandra Santiago', {
    font: 'Playfair Display',
    fontfile: fonts.playfair,
    color: COLORS.text,
    size: 64,
  })
  const tagline = await text('Branding, redes sociales, publicidad y fotografía', {
    font: 'Quicksand',
    fontfile: fonts.quicksand,
    color: COLORS.muted,
    size: 26,
    width: 620,
  })
  const url = await text(SITE_URL, {
    font: 'Quicksand',
    fontfile: fonts.quicksand,
    color: COLORS.accent,
    size: 22,
  })

  const layers = [
    { input: await heroPhoto(photo.w, photo.h), left: photo.x, top: photo.y },
    { input: roles.input, left, top: 110 },
    { input: first.input, left, top: 165 },
    { input: rest.input, left, top: 165 + first.height + 4 },
    { input: tagline.input, left, top: 165 + first.height + rest.height + 30 },
    { input: url.input, left, top: 545 },
  ]

  await sharp(background)
    .composite(layers)
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'og-image.jpg'))
}

/**
 * Contenedor ICO con entradas PNG (formato admitido desde Windows Vista y por
 * todos los navegadores). sharp no exporta .ico, así que se arma a mano.
 */
function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reservado
  header.writeUInt16LE(1, 2) // tipo: ícono
  header.writeUInt16LE(pngs.length, 4)

  let offset = 6 + 16 * pngs.length
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // ancho
    entry.writeUInt8(size >= 256 ? 0 : size, 1) // alto
    entry.writeUInt8(0, 2) // paleta
    entry.writeUInt8(0, 3) // reservado
    entry.writeUInt16LE(1, 4) // planos
    entry.writeUInt16LE(32, 6) // bits por píxel
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

/**
 * Monograma "M" en Playfair itálica, blanco y en negrita sobre círculo rosa
 * profundo: es la combinación que sigue legible a 16 px en una pestaña.
 */
async function icons(fonts) {
  const S = 512
  const circle = Buffer.from(
    `<svg width="${S}" height="${S}"><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}" fill="${COLORS.accent}"/></svg>`,
  )
  const letter = await text('M', {
    font: 'Playfair Display Italic',
    fontfile: fonts.playfairItalic,
    color: '#ffffff',
    size: 380,
    weight: 'bold',
  })

  const master = await sharp(circle)
    .composite([
      {
        input: letter.input,
        left: Math.round((S - letter.width) / 2),
        top: Math.round((S - letter.height) / 2),
      },
    ])
    .png()
    .toBuffer()

  // El ícono de iOS no admite transparencia: fondo blanco.
  await sharp(master)
    .resize(180, 180)
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(path.join(PUBLIC, 'apple-touch-icon.png'))
  await sharp(master).resize(192, 192).png().toFile(path.join(PUBLIC, 'favicon-192.png'))
  await sharp(master).resize(32, 32).png().toFile(path.join(PUBLIC, 'favicon-32.png'))
  await sharp(master).resize(16, 16).png().toFile(path.join(PUBLIC, 'favicon-16.png'))

  const icoSizes = await Promise.all(
    [16, 32, 48].map(async (size) => ({
      size,
      data: await sharp(master).resize(size, size).png().toBuffer(),
    })),
  )
  await writeFile(path.join(PUBLIC, 'favicon.ico'), buildIco(icoSizes))
}

const fonts = await loadFonts()
await ogImage(fonts)
await icons(fonts)
console.log(
  'Generados en /public: og-image.jpg, apple-touch-icon.png, favicon.ico, favicon-16.png, favicon-32.png, favicon-192.png',
)
