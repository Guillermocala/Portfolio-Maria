<script setup lang="ts">
defineOptions({ name: 'BaseTitle' })

withDefaults(
  defineProps<{
    tag?: 'h1' | 'h2' | 'h3' | 'h4'
    subtitle?: string
  }>(),
  { tag: 'h2' },
)
</script>

<template>
  <div class="section__header">
    <component :is="tag">
      <slot />
    </component>
    <p v-if="subtitle" class="section__subtitle">{{ subtitle }}</p>
  </div>
</template>
