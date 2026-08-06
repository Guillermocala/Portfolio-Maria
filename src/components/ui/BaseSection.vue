<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

defineOptions({ name: 'BaseSection' })

const props = withDefaults(
  defineProps<{
    id?: string
    animate?: boolean
  }>(),
  { animate: true },
)

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(!props.animate)

if (props.animate) {
  useIntersectionObserver(
    sectionRef,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
      }
    },
    { threshold: 0.1 },
  )
}
</script>

<template>
  <section
    :id="id"
    ref="sectionRef"
    class="section"
    :class="{ 'section-fade': animate, 'is-visible': isVisible }"
  >
    <slot />
  </section>
</template>
