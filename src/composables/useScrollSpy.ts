import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollSpy(sectionIds: string[]) {
  const activeSection = ref(sectionIds[0] ?? '')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const visibleSections = new Map<string, number>()

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            if (entry.isIntersecting) {
              visibleSections.set(entry.target.id, entry.intersectionRatio)
            } else {
              visibleSections.delete(entry.target.id)
            }
          }
        })

        let maxRatio = 0
        let current = activeSection.value

        visibleSections.forEach((ratio, id) => {
          if (ratio >= maxRatio) {
            maxRatio = ratio
            current = id
          }
        })

        if (current) {
          activeSection.value = current
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer?.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeSection }
}
