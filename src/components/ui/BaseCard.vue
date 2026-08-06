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
    <img v-if="image" :src="image" :alt="image ?? title ?? ''" class="card__image" />
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

.qr-grid{

    display:grid;

    grid-template-columns:repeat(4,minmax(0,1fr));

    gap:1.5rem;

}

@media (max-width:1200px){

.qr-grid{

    grid-template-columns:repeat(3,1fr);

}

}

@media (max-width:768px){

.qr-grid{

    grid-template-columns:repeat(2,1fr);

}

}

@media (max-width:500px){

.qr-grid{

    grid-template-columns:1fr;

}

}
</style>
