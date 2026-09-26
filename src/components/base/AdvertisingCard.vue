<script setup lang="ts">
defineOptions({
  name: "AdvertisingCard",
});

defineProps<{
  image: string;
  title?: string;
}>();
</script>

<template>
  <article class="advertising-card">
    <img :src="image" :alt="title" class="advertising-card__image" />
  </article>
</template>

<style scoped lang="scss">
.advertising-card {
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
  break-inside: avoid;
  overflow: hidden;
  border-radius: 18px;
  background: $color-surface;
  box-shadow: 0 10px 24px rgba(27, 27, 27, 0.07);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 18px 34px rgba(27, 27, 27, 0.14);
    }
  }
}

.advertising-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
