<script setup lang="ts">
defineOptions({ name: 'BaseTitle' })

withDefaults(
  defineProps<{
    tag?: 'h1' | 'h2' | 'h3' | 'h4'
    subtitle?: string
    eyebrow?: string
  }>(),
  { tag: 'h2' },
)
</script>

<template>
  <div v-reveal="{ effect: 'fade-up', stagger: 100 }" class="section__header">
    <span v-if="eyebrow" class="section__eyebrow">{{ eyebrow }}</span>
    <component :is="tag">
      <slot />
    </component>
    <p v-if="subtitle" class="section__subtitle">{{ subtitle }}</p>
  </div>
</template>
