<script setup lang="ts">
defineOptions({ name: 'BaseCard' })

withDefaults(
  defineProps<{
    title?: string
    text?: string
    image?: string
    imageAlt?: string
    hover?: boolean
  }>(),
  { hover: true },
)
</script>

<template>
  <article class="card" :class="{ 'card--no-hover': !hover }">
    <img v-if="image" :src="image" :alt="image ?? title ?? ''" class="card__image" loading="lazy" decoding="async" />
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
    box-shadow: var(--shadow-small);
  }
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: $space-6;
}
</style>
