<script setup lang="ts">
defineOptions({
  name: "BaseQrCard",
});

defineProps<{
  image: string;
  title: string;
  href: string;
  description?: string;
}>();
</script>

<template>
  <a class="qr-card" :href="href" target="_blank" rel="noopener noreferrer">
    <img :src="image" :alt="title" class="qr-card__image" />

    <div class="qr-card__overlay">
      <h3>{{ title }}</h3>

      <p v-if="description">
        {{ description }}
      </p>

      <span class="qr-card__button"> Abrir Link </span>
    </div>
  </a>
</template>

<style scoped lang="scss">
.qr-card {
  position: relative;

  overflow: hidden;

  border-radius: 16px;

  background: white;

  display: block;

  aspect-ratio: 1;

  box-shadow: $shadow-small;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: $shadow-small;
  }
}

.qr-card__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: $space-3;
}

.qr-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: $space-3;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  opacity: 0;
  transition: 0.25s;
}

.qr-card__overlay h3, p {
  color: white;
}

.qr-card:hover .qr-card__overlay {
  opacity: 1;
}

.qr-card__button {
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
}
</style>
