<script setup lang="ts">
defineOptions({
  name: "BaseQrCard",
});

defineProps<{
  image?: string;
  title: string;
  description?: string;
  href?: string;
  viewMore?: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <article
    class="qr-card"
    :class="{ 'qr-card--view-more': viewMore }"
    @click="viewMore ? emit('click') : undefined"
  >
    <template v-if="viewMore">
      <div class="qr-card__view-more">
        <span class="qr-card__view-more-icon">
          {{ title === "Ver menos" ? "−" : "+" }}
        </span>

        <span class="qr-card__view-more-text"> {{ title }} </span>
      </div>
    </template>

    <template v-else>
      <img :src="image" :alt="title" class="qr-card__image" loading="lazy" />

      <div class="qr-card__overlay">
        <h3>{{ title }}</h3>

        <p v-if="description">
          {{ description }}
        </p>

        <a
          v-if="href"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          class="qr-card__button"
          @click.stop
        >
          Abrir Link
        </a>
      </div>
    </template>
  </article>
</template>

<style scoped lang="scss">
.qr-card {
  position: relative;

  overflow: hidden;

  border-radius: 28px;

  background: white;

  box-shadow: var(--shadow-small);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  cursor: pointer;
}

.qr-card:hover {
  transform: translateY(-8px);

  box-shadow: var(--shadow-medium);
}

/* ==========================================
   IMAGE
========================================== */

.qr-card__image {
  display: block;

  width: 100%;

  height: 100%;

  object-fit: cover;
}

/* ==========================================
   OVERLAY
========================================== */

.qr-card__overlay {
  position: absolute;

  inset: 0;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 0.75rem;

  padding: 1.5rem;

  text-align: center;

  background: rgba(0, 0, 0, 0.45);

  opacity: 0;

  transition: opacity 0.25s ease;

  pointer-events: none;
}

.qr-card:hover .qr-card__overlay {
  opacity: 1;
}

/* ==========================================
   TITLE
========================================== */

.qr-card__overlay h3 {
  margin: 0;

  color: white;

  font-size: 1.1rem;

  line-height: 1.3;
}

/* ==========================================
   DESCRIPTION
========================================== */

.qr-card__overlay p {
  margin: 0;

  max-width: 280px;

  color: rgba(255, 255, 255, 0.9);

  font-size: 0.85rem;

  line-height: 1.5;
}

/* ==========================================
   BUTTON
========================================== */

.qr-card__button {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding: 0.65rem 1rem;

  border: 1px solid rgba(255, 255, 255, 0.5);

  border-radius: 999px;

  background: rgba(0, 0, 0, 0.35);

  color: white;

  font-size: 0.8rem;

  font-weight: 600;

  text-decoration: none;

  backdrop-filter: blur(4px);

  pointer-events: auto;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.qr-card__button:hover {
  background: rgba(255, 255, 255, 0.2);

  transform: scale(1.04);
}

.qr-card--view-more {
  min-height: 260px;

  display: flex;

  align-items: center;
  justify-content: center;

  cursor: pointer;
}

.qr-card--view-more:hover {
  transform: translateY(-8px);

  box-shadow: var(--shadow-medium);
}

.qr-card__view-more {
  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 0.75rem;

  width: 100%;
  height: 100%;

  min-height: 260px;

  background: #f7f7f7;

  transition: background 0.25s ease;
}

.qr-card--view-more:hover .qr-card__view-more {
  background: #eeeeee;
}

.qr-card__view-more-icon {
  width: 48px;

  height: 48px;

  display: grid;

  place-items: center;

  border: 1px solid var(--color-border, #ddd);

  border-radius: 50%;

  background: white;

  color: var(--color-text-primary, #222);

  font-size: 1.5rem;

  transition:
    transform 0.25s ease,
    background 0.25s ease;
}

.qr-card--view-more:hover .qr-card__view-more-icon {
  transform: scale(1.08);

  background: #222;

  color: white;
}

.qr-card__view-more-text {
  font-size: 0.9rem;

  font-weight: 600;

  color: var(--color-text-primary, #222);
}
</style>
