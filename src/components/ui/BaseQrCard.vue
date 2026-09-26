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

  border-radius: 22px;

  border: 1px solid var(--color-border);

  background: var(--color-surface);

  box-shadow: 0 10px 24px rgba(27, 27, 27, 0.06);

  transition:
    transform 0.35s var(--ease-out),
    box-shadow 0.35s ease;

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

  background: rgba(27, 27, 27, 0.5);

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

  background: rgba(27, 27, 27, 0.35);

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

  /* el contenido ocupa toda la altura de la fila del grid */
  align-items: stretch;
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

  background: var(--color-accent-soft);

  transition: background 0.25s ease;
}

.qr-card--view-more:hover .qr-card__view-more {
  background: #ffe0e4;
}

.qr-card__view-more-icon {
  width: 48px;

  height: 48px;

  display: grid;

  place-items: center;

  border: 2px solid var(--color-primary);

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

  background: var(--color-text-primary);

  border-color: var(--color-text-primary);

  color: white;
}

.qr-card__view-more-text {
  font-size: 0.9rem;

  font-weight: 600;

  color: var(--color-accent);
}
</style>
