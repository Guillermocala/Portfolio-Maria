<script setup lang="ts">
defineProps<{
  image: string;
}>();
console.log("componente")
</script>

<template>
  <figure class="photo-card">
    <img :src="image" :alt="image" class="photo-card__image" loading="lazy" />
  </figure>
</template>

<style>
.photo-card {
  overflow: hidden;

  border-radius: 18px;

  background: white;

  box-shadow: var(--shadow-small);

  transition: 0.25s;

  break-inside: avoid;

  margin-bottom: 1.5rem;

  display: inline-block;
  width: 100%;
}

.photo-card:hover {
  transform: translateY(-6px);

  box-shadow: var(--shadow-medium);
}

.photo-card__image {
  display: block;

  width: 100%;

  height: auto;

  object-fit: cover;
}
</style>
