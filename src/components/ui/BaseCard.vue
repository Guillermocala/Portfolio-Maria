<script setup lang="ts">
defineOptions({ name: 'BaseCard' })

defineProps<{
  title?: string
  text?: string
  image?: string
  imageAlt?: string
  hover?: boolean
}>()
</script>

<template>
  <article class="card" :class="{ 'card--no-hover': hover === false }">
    <img v-if="image" :src="image" :alt="imageAlt ?? title ?? ''" class="card__image" />
    <div v-if="title || text || $slots.default" class="card__body">
      <h3 v-if="title" class="card__title">{{ title }}</h3>
      <p v-if="text" class="card__text">{{ text }}</p>
      <slot />
    </div>
  </article>
</template>

<style scoped lang="scss">
.card--no-hover {
  &:hover {
    transform: none;
    box-shadow: $shadow-small;
  }
}
</style>
