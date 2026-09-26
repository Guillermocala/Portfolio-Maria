<script setup lang="ts">
defineProps<{
  image: string;
}>();
</script>

<template>
  <figure class="photo-card">
    <img :src="image" :alt="image" class="photo-card__image" loading="lazy" decoding="async" />
  </figure>
</template>

<style>
.photo-card {
  overflow: hidden;

  border-radius: 18px;

  background: var(--color-surface);

  box-shadow: 0 10px 24px rgba(27, 27, 27, 0.07);

  transition: transform 0.3s ease, box-shadow 0.3s ease;

  break-inside: avoid;

  margin-bottom: 20px;

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
