import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-reveal: anima la entrada (y salida) de elementos al hacer scroll.
 *
 * Uso:
 *   v-reveal="'fade-up'"
 *   v-reveal="{ effect: 'fade-left', delay: 120 }"
 *   v-reveal="{ effect: 'zoom', stagger: 80 }"   // anima los hijos en cascada
 *
 * Los estilos viven en src/styles/animations/_reveal.scss.
 */

export type RevealEffect = 'fade-up' | 'fade-left' | 'fade-right' | 'zoom' | 'pop' | 'blur'

export interface RevealOptions {
  effect?: RevealEffect
  /** Retraso inicial en ms. */
  delay?: number
  /** Si se define, anima cada hijo directo con este intervalo (ms). */
  stagger?: number
  /** Si es true, sólo anima la primera vez que entra en pantalla. */
  once?: boolean
}

type RevealValue = RevealEffect | RevealOptions | undefined

interface RevealState {
  options: RevealOptions
  revealed: boolean
}

/** Factor global de ritmo para retrasos y cascadas (1 = original). */
const TIMING_SCALE = 1.3

const states = new WeakMap<HTMLElement, RevealState>()

const normalize = (value: RevealValue): RevealOptions =>
  typeof value === 'string' ? { effect: value } : { ...value }

const getTargets = (el: HTMLElement, options: RevealOptions): HTMLElement[] =>
  options.stagger !== undefined ? (Array.from(el.children) as HTMLElement[]) : [el]

const prepareTargets = (el: HTMLElement, options: RevealOptions) => {
  const delay = (options.delay ?? 0) * TIMING_SCALE
  const stagger = (options.stagger ?? 0) * TIMING_SCALE

  getTargets(el, options).forEach((target, index) => {
    target.classList.add('reveal-item')
    target.style.setProperty('--reveal-delay', `${Math.round(delay + index * stagger)}ms`)
  })
}

const setRevealed = (el: HTMLElement, revealed: boolean) => {
  const state = states.get(el)
  if (!state || state.revealed === revealed) return

  state.revealed = revealed

  getTargets(el, state.options).forEach((target) => {
    target.classList.toggle('is-revealed', revealed)
    target.classList.toggle('is-concealed', !revealed)
  })
}

/*
 * Dos observers con umbrales distintos (histéresis): se revela al entrar un
 * 10% en pantalla y sólo se oculta cuando sale por completo. Así un elemento
 * justo en el borde no parpadea con cada micro-scroll.
 */
let enterObserver: IntersectionObserver | null = null
let exitObserver: IntersectionObserver | null = null

/*
 * En pantallas táctiles sólo se anima la entrada: evita re-animar todo al
 * hacer scroll en ambos sentidos, que es lo que más pesa en móviles.
 */
const isTouch = () => window.matchMedia('(pointer: coarse)').matches

const stopObserving = (el: HTMLElement) => {
  enterObserver?.unobserve(el)
  exitObserver?.unobserve(el)
}

const observe = (el: HTMLElement) => {
  enterObserver ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const state = states.get(el)
        if (!state) return

        setRevealed(el, true)
        if (state.options.once || isTouch()) stopObserving(el)
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  )

  exitObserver ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) return
        setRevealed(entry.target as HTMLElement, false)
      })
    },
    { threshold: 0 },
  )

  enterObserver.observe(el)
  exitObserver.observe(el)
}

export const reveal: Directive<HTMLElement, RevealValue> = {
  mounted(el, binding: DirectiveBinding<RevealValue>) {
    const options = normalize(binding.value)

    el.classList.add('reveal', `reveal--${options.effect ?? 'fade-up'}`)
    states.set(el, { options, revealed: false })
    prepareTargets(el, options)

    observe(el)
  },

  updated(el) {
    const state = states.get(el)
    if (!state || state.options.stagger === undefined) return

    // Nuevos hijos (p. ej. listas dinámicas) heredan el estado actual.
    prepareTargets(el, state.options)
    getTargets(el, state.options).forEach((target) => {
      target.classList.toggle('is-revealed', state.revealed)
    })
  },

  unmounted(el) {
    stopObserving(el)
    states.delete(el)
  },
}

declare module 'vue' {
  export interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
