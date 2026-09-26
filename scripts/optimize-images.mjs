/**
 * Convierte las imágenes del portafolio a WebP redimensionado y mueve los
 * originales a /originales (ignorado por git).
 *
 * Uso: node scripts/optimize-images.mjs
 *
 * - Los SVG que sólo envuelven un PNG en base64 (exportados desde Inkscape,
 *   p. ej. QR y menús digitales) se tratan como raster.
 * - Los SVG vectoriales reales se dejan tal cual.
 * - Es seguro volver a ejecutarlo: los .webp existentes se ignoran.
 */
import { mkdir, readdir, readFile, rename, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const ASSETS = path.join(ROOT, 'src', 'assets')
const ORIGINALS = path.join(ROOT, 'originales')

const RASTER = new Set(['.png', '.jpg', '.jpeg', '.jfif', '.webp'])

/* Ancho máximo por carpeta (px). Los menús se ven ampliados en el visor. */
const MAX_WIDTH = {
  qrs: 800,
  'digital-menus': 1200,
  'physical-menus': 1800,
  branding: 1200,
  default: 1400,
}
const HERO_WIDTH = 1000

/* Carpetas que ya no se usan en el sitio: se mueven completas. */
const UNUSED_FOLDERS = ['portfolio/social-media']

sharp.cache(false)

const produced = new Set()

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

async function moveToOriginals(file) {
  const target = path.join(ORIGINALS, path.relative(ASSETS, file))
  await mkdir(path.dirname(target), { recursive: true })
  await rename(file, target)
}

/**
 * SVG exportados con una imagen raster incrustada (p. ej. QR y menús de
 * Inkscape/Canva). La imagen suele estar recortada con clipPath y
 * transformada, así que se rasteriza el SVG completo, no el PNG interno.
 */
async function isRasterWrapper(svgFile) {
  const svg = await readFile(svgFile, 'utf8')
  return /data:image\/(png|jpeg);base64,/.test(svg)
}

/** Densidad (dpi) para que el SVG se rasterice al menos al ancho objetivo. */
async function svgDensity(svgFile, targetWidth) {
  const { width } = await sharp(svgFile).metadata()
  return Math.min(1200, Math.ceil((72 * targetWidth) / (width ?? targetWidth)))
}

function maxWidthFor(file) {
  if (path.basename(file).startsWith('hero.')) return HERO_WIDTH
  const folder = path.basename(path.dirname(file))
  return MAX_WIDTH[folder] ?? MAX_WIDTH.default
}

async function convert(file, input, inputOptions = {}) {
  // Evita colisiones como Osiris.PNG y Osiris.jpg -> Osiris.webp
  let output = file.replace(/\.[^.]+$/, '.webp')
  for (let n = 2; produced.has(output.toLowerCase()); n++) {
    output = file.replace(/\.[^.]+$/, `-${n}.webp`)
  }
  produced.add(output.toLowerCase())

  const info = await sharp(input, inputOptions)
    .rotate()
    .resize({ width: maxWidthFor(file), withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(output)

  return { output, size: info.size }
}

const rows = []

for (const folder of UNUSED_FOLDERS) {
  const dir = path.join(ASSETS, folder)
  const exists = await stat(dir).catch(() => null)
  if (!exists) continue
  for await (const file of walk(dir)) await moveToOriginals(file)
  rows.push([folder + '/ (sin uso)', '-', 'movida a originales', '-'])
}

const hero = path.join(ASSETS, 'hero.jpeg')
const targets = (await stat(hero).catch(() => null)) ? [hero] : []
for await (const file of walk(path.join(ASSETS, 'portfolio'))) targets.push(file)

let totalBefore = 0
let totalAfter = 0

for (const file of targets) {
  const ext = path.extname(file).toLowerCase()
  if (ext === '.webp') continue

  let inputOptions = {}
  if (ext === '.svg') {
    if (!(await isRasterWrapper(file))) continue
    inputOptions = { density: await svgDensity(file, maxWidthFor(file)), limitInputPixels: false }
  } else if (!RASTER.has(ext)) {
    continue
  }

  const before = (await stat(file)).size
  const { output, size } = await convert(file, file, inputOptions)
  await moveToOriginals(file)

  totalBefore += before
  totalAfter += size
  rows.push([path.relative(ASSETS, file), kb(before), path.basename(output), kb(size)])
}

console.table(rows.map(([archivo, antes, nuevo, despues]) => ({ archivo, antes, nuevo, despues })))
console.log(`Total: ${kb(totalBefore)} -> ${kb(totalAfter)}`)
