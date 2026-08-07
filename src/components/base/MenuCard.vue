<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  image: string;
  images?: string[];
  variant?: "mobile" | "desktop";
}>();

const isOpen = ref(false);
const scale = ref(1);

const images = computed(() => props.images ?? [props.image]);

const currentIndex = ref(
  Math.max(
    0,
    images.value.findIndex((image) => image === props.image),
  ),
);

const currentImage = computed(() => {
  return images.value[currentIndex.value] ?? props.image;
});

const openViewer = () => {
  currentIndex.value = Math.max(
    0,
    images.value.findIndex((image) => image === props.image),
  );

  scale.value = 1;
  isOpen.value = true;

  document.body.style.overflow = "hidden";
};

const closeViewer = () => {
  isOpen.value = false;
  scale.value = 1;

  document.body.style.overflow = "";
};

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.25, 3);
};

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.25, 0.5);
};

const resetZoom = () => {
  scale.value = 1;
};

const previousImage = () => {
  if (images.value.length <= 1) return;

  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;

  scale.value = 1;
};

const nextImage = () => {
  if (images.value.length <= 1) return;

  currentIndex.value = (currentIndex.value + 1) % images.value.length;

  scale.value = 1;
};

const handleKeyboard = (event: KeyboardEvent) => {
  if (!isOpen.value) return;

  switch (event.key) {
    case "Escape":
      closeViewer();
      break;

    case "ArrowLeft":
      previousImage();
      break;

    case "ArrowRight":
      nextImage();
      break;

    case "+":
    case "=":
      zoomIn();
      break;

    case "-":
      zoomOut();
      break;

    case "0":
      resetZoom();
      break;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyboard);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyboard);
  document.body.style.overflow = "";
});
</script>

<template>
  <!-- ========================================= -->
  <!-- CARD -->
  <!-- ========================================= -->

  <article
    class="menu-card"
    :class="`menu-card--${variant ?? 'mobile'}`"
    @click="openViewer"
  >
    <img
      :src="image"
      :alt="variant === 'desktop' ? 'Menú físico' : 'Menú digital'"
      class="menu-card__image"
      loading="lazy"
    />
    <div class="menu-card__overlay">
      <span>Ver detalle</span>
    </div>
  </article>

  <!-- ========================================= -->
  <!-- MODAL -->
  <!-- ========================================= -->

  <Teleport to="body">
    <Transition name="menu-viewer">
      <div v-if="isOpen" class="menu-viewer" @click.self="closeViewer">
        <!-- HEADER -->

        <header class="menu-viewer__header">
          <div class="menu-viewer__counter">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>

          <div class="menu-viewer__actions">
            <button
              type="button"
              title="Alejar"
              aria-label="Alejar"
              @click="zoomOut"
            >
              −
            </button>

            <button
              type="button"
              class="menu-viewer__zoom"
              title="Restablecer zoom"
              @click="resetZoom"
            >
              {{ Math.round(scale * 100) }}%
            </button>

            <button
              type="button"
              title="Acercar"
              aria-label="Acercar"
              @click="zoomIn"
            >
              +
            </button>

            <button
              type="button"
              title="Cerrar"
              aria-label="Cerrar"
              @click="closeViewer"
            >
              ×
            </button>
          </div>
        </header>

        <!-- PREVIOUS -->

        <button
          v-if="images.length > 1"
          type="button"
          class="menu-viewer__navigation menu-viewer__navigation--prev"
          title="Imagen anterior"
          aria-label="Imagen anterior"
          @click="previousImage"
        >
          ‹
        </button>

        <!-- IMAGE -->

        <div class="menu-viewer__content">
          <div class="menu-viewer__image-wrapper">
            <img
              :src="currentImage"
              alt="Vista ampliada del menú"
              class="menu-viewer__image"
              :style="{
                transform: `scale(${scale})`,
              }"
              draggable="false"
            />
          </div>
        </div>

        <!-- NEXT -->

        <button
          v-if="images.length > 1"
          type="button"
          class="menu-viewer__navigation menu-viewer__navigation--next"
          title="Imagen siguiente"
          aria-label="Imagen siguiente"
          @click="nextImage"
        >
          ›
        </button>

        <!-- FOOTER -->

        <div class="menu-viewer__hint">
          <span v-if="images.length > 1"> ← → navegar </span>

          <span> + − zoom </span>

          <span> ESC cerrar </span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
/* =========================================
   CARD
========================================= */

.menu-card {
  position: relative;
  flex: 0 0 250px;

  border-radius: 28px;

  overflow: hidden;

  background: white;

  box-shadow: var(--shadow-small);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  cursor: zoom-in;
}

.menu-card:hover {
  transform: translateY(-8px);

  box-shadow: var(--shadow-medium);
}

.menu-card__overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.45);

  opacity: 0;

  transition: opacity 0.25s ease;

  pointer-events: none;
}

.menu-card__overlay span {
  padding: 0.65rem 1rem;

  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.35);

  color: white;

  font-size: 0.85rem;
  font-weight: 600;

  backdrop-filter: blur(4px);
}

.menu-card:hover .menu-card__overlay {
  opacity: 1;
}

.menu-card__image {
  width: 100%;

  display: block;

  object-fit: cover;
}

/* Digitales: comportamiento original */

.menu-card--mobile {
  width: 240px;
}

/* Físicos: nunca forzar proporción */

.menu-card--desktop {
  width: 100%;

  height: fit-content;
}

.menu-card--desktop .menu-card__image {
  width: 100%;

  height: auto;

  object-fit: contain;
}

/* =========================================
   VIEWER
========================================= */

.menu-viewer {
  position: fixed;

  inset: 0;

  z-index: 9999;

  display: flex;

  align-items: center;

  justify-content: center;

  background: rgba(0, 0, 0, 0.88);

  backdrop-filter: blur(8px);
}

/* =========================================
   HEADER
========================================= */

.menu-viewer__header {
  position: absolute;

  top: 0;
  left: 0;
  right: 0;

  z-index: 2;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 1rem 1.5rem;

  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.65), transparent);
}

.menu-viewer__counter {
  color: white;

  font-size: 0.85rem;

  font-weight: 600;
}

.menu-viewer__actions {
  display: flex;

  align-items: center;

  gap: 0.5rem;
}

.menu-viewer__actions button {
  width: 42px;

  height: 42px;

  display: grid;

  place-items: center;

  border: 1px solid rgba(255, 255, 255, 0.25);

  border-radius: 10px;

  background: rgba(255, 255, 255, 0.1);

  color: white;

  font-size: 1.4rem;

  cursor: pointer;

  transition: background 0.2s ease;
}

.menu-viewer__actions button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.menu-viewer__actions .menu-viewer__zoom {
  width: auto;

  min-width: 60px;

  padding-inline: 0.75rem;

  font-size: 0.8rem;
}

/* =========================================
   CONTENT
========================================= */

.menu-viewer__content {
  width: 100%;

  height: 100%;

  padding: 5rem 6rem;

  overflow: auto;

  display: flex;

  align-items: center;

  justify-content: center;
}

.menu-viewer__image-wrapper {
  display: flex;

  align-items: center;

  justify-content: center;

  min-width: min-content;

  min-height: min-content;
}

.menu-viewer__image {
  display: block;

  max-width: 85vw;

  max-height: 80vh;

  width: auto;

  height: auto;

  object-fit: contain;

  transform-origin: center center;

  transition: transform 0.2s ease;

  user-select: none;
}

/* =========================================
   NAVIGATION
========================================= */

.menu-viewer__navigation {
  position: absolute;

  top: 50%;

  z-index: 3;

  transform: translateY(-50%);

  width: 52px;

  height: 52px;

  display: grid;

  place-items: center;

  border: 1px solid rgba(255, 255, 255, 0.25);

  border-radius: 50%;

  background: rgba(0, 0, 0, 0.4);

  color: white;

  font-size: 2.5rem;

  line-height: 1;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.menu-viewer__navigation:hover {
  background: rgba(0, 0, 0, 0.7);

  transform: translateY(-50%) scale(1.05);
}

.menu-viewer__navigation--prev {
  left: 1.25rem;
}

.menu-viewer__navigation--next {
  right: 1.25rem;
}

/* =========================================
   HINT
========================================= */

.menu-viewer__hint {
  position: absolute;

  bottom: 1rem;

  left: 50%;

  transform: translateX(-50%);

  display: flex;

  gap: 1rem;

  color: rgba(255, 255, 255, 0.65);

  font-size: 0.7rem;

  white-space: nowrap;
}

/* =========================================
   TRANSITION
========================================= */

.menu-viewer-enter-active,
.menu-viewer-leave-active {
  transition: opacity 0.2s ease;
}

.menu-viewer-enter-from,
.menu-viewer-leave-to {
  opacity: 0;
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 700px) {
  .menu-viewer__content {
    padding: 4.5rem 3rem;
  }

  .menu-viewer__image {
    max-width: 92vw;

    max-height: 78vh;
  }

  .menu-viewer__navigation {
    width: 42px;

    height: 42px;

    font-size: 2rem;
  }

  .menu-viewer__navigation--prev {
    left: 0.5rem;
  }

  .menu-viewer__navigation--next {
    right: 0.5rem;
  }

  .menu-viewer__hint {
    gap: 0.5rem;

    font-size: 0.6rem;
  }
}
</style>
