import { nextTick, ref, type Ref } from 'vue'

/** Curva ease-in-out: acelera y desacelera sin salto inicial. */
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)'

/** Duración proporcional a la distancia recorrida (ms). */
const durationFor = (distance: number) =>
  Math.round(Math.min(1400, Math.max(700, 450 + Math.abs(distance) * 0.35)))

/**
 * Mantiene un elemento en la misma posición de la pantalla mientras el
 * contenido que lo rodea cambia de altura (p. ej. al colapsar una galería).
 */
export function keepAnchorInPlace(anchor: HTMLElement, duration: number) {
  const initialTop = anchor.getBoundingClientRect().top
  const start = performance.now()

  const step = (now: number) => {
    const delta = anchor.getBoundingClientRect().top - initialTop

    if (Math.abs(delta) > 0.5) {
      window.scrollBy({ top: delta, behavior: 'instant' })
    }

    if (now - start < duration + 100) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

const onHeightTransitionEnd = (el: HTMLElement, duration: number, callback: () => void) => {
  let done = false

  const finish = () => {
    if (done) return
    done = true
    el.removeEventListener('transitionend', handler)
    callback()
  }

  const handler = (event: TransitionEvent) => {
    if (event.target === el && event.propertyName === 'height') finish()
  }

  el.addEventListener('transitionend', handler)
  window.setTimeout(finish, duration + 150)
}

/**
 * Anima un elemento desde su posición previa a la nueva (técnica FLIP).
 * `first` es el rect medido antes del cambio de layout.
 */
const playFlip = (el: HTMLElement, first: DOMRect, duration: number) => {
  const last = el.getBoundingClientRect()
  const dx = first.left - last.left
  const dy = first.top - last.top

  if (!dx && !dy) return

  el.style.transition = 'none'
  el.style.translate = `${dx}px ${dy}px`
  void el.offsetHeight

  el.style.transition = `translate ${duration}ms ${EASING}`
  el.style.translate = '0 0'

  window.setTimeout(() => {
    el.style.transition = ''
    el.style.translate = ''
  }, duration + 50)
}

const setHeight = (el: HTMLElement, height: string, duration: number) => {
  el.style.transitionDuration = `${duration}ms`
  el.style.transitionTimingFunction = EASING
  el.style.height = height
}

/**
 * Expande/colapsa un contenedor animando su altura real (en px) y
 * conserva la posición del ancla en pantalla al colapsar.
 *
 * El contenedor debe tener `overflow: hidden` y `transition: height`
 * (la duración y la curva las fija este composable).
 */
export function useCollapsible(options: {
  content: Ref<HTMLElement | null>
  anchor?: Ref<HTMLElement | null>
  /** Elemento que cambia de posición con el estado y se anima con FLIP. */
  flip?: Ref<HTMLElement | null>
  /** Altura en estado contraído (valor CSS, p. ej. "500px"). */
  collapsedHeight: () => string
}) {
  const expanded = ref(false)
  const animating = ref(false)

  const applyCollapsed = () => {
    const el = options.content.value
    if (el && !expanded.value) el.style.height = options.collapsedHeight()
  }

  const measurePx = (el: HTMLElement, height: string) => {
    if (height.endsWith('px')) return parseFloat(height)
    // Sin transición para leer el valor final y no el inicial interpolado.
    const previous = el.style.height
    el.style.transition = 'none'
    el.style.height = height
    const px = el.getBoundingClientRect().height
    el.style.height = previous
    void el.offsetHeight
    el.style.transition = ''
    return px
  }

  const expand = async () => {
    const el = options.content.value
    if (!el) return

    const from = el.getBoundingClientRect().height
    const flipFirst = options.flip?.value?.getBoundingClientRect()

    expanded.value = true
    animating.value = true
    await nextTick()

    const to = el.scrollHeight
    const duration = durationFor(to - from)

    el.style.height = `${from}px`
    void el.offsetHeight

    if (options.flip?.value && flipFirst) playFlip(options.flip.value, flipFirst, duration)
    setHeight(el, `${to}px`, duration)

    onHeightTransitionEnd(el, duration, () => {
      if (expanded.value) el.style.height = ''
      animating.value = false
    })
  }

  const collapse = async () => {
    const el = options.content.value
    if (!el) return

    const from = el.getBoundingClientRect().height
    const flipFirst = options.flip?.value?.getBoundingClientRect()

    el.style.height = `${from}px`
    void el.offsetHeight

    expanded.value = false
    animating.value = true
    await nextTick()

    const target = options.collapsedHeight()
    const duration = durationFor(from - measurePx(el, target))

    // FLIP antes del anclaje: el ancla parte de la posición visual previa.
    if (options.flip?.value && flipFirst) playFlip(options.flip.value, flipFirst, duration)
    setHeight(el, target, duration)

    if (options.anchor?.value) keepAnchorInPlace(options.anchor.value, duration)

    onHeightTransitionEnd(el, duration, () => {
      animating.value = false
    })
  }

  const toggle = () => (expanded.value ? collapse() : expand())

  return { expanded, animating, toggle, applyCollapsed }
}
