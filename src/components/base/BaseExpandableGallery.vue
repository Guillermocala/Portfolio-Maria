<script setup lang="ts">
import { computed, ref } from "vue";

defineOptions({
  name: "BaseExpandableGallery",
});

const props = withDefaults(
  defineProps<{
    totalItems: number;

    /**
     * Cantidad máxima de elementos que se consideran
     * visibles en estado contraído.
     */
    collapsedItems?: number;

    /**
     * Altura máxima del contenido cuando está contraído.
     * Ejemplo: "700px", "50rem", etc.
     */
    collapsedHeight?: string;

    labelMore?: string;
    labelLess?: string;
  }>(),
  {
    collapsedItems: 6,
    collapsedHeight: "700px",
    labelMore: "Ver más",
    labelLess: "Ver menos",
  },
);

const expanded = ref(false);

const hasMoreItems = computed(
  () => props.totalItems > props.collapsedItems,
);

const toggle = () => {
  expanded.value = !expanded.value;
};

const collapsedStyle = computed(() => ({
  "--collapsed-height": props.collapsedHeight,
}));
</script>

<template>
  <div
    class="expandable-gallery"
    :class="{
      'expandable-gallery--expanded': expanded,
    }"
    :style="collapsedStyle"
  >
    <!-- ========================================= -->
    <!-- CONTENIDO -->
    <!-- ========================================= -->

    <div
      class="expandable-gallery__content"
      :class="{
        'expandable-gallery__content--collapsed':
          !expanded && hasMoreItems,
      }"
    >
      <slot />
    </div>

    <!-- ========================================= -->
    <!-- CONTROL -->
    <!-- ========================================= -->

    <div
      v-if="hasMoreItems"
      class="expandable-gallery__control"
    >
      <button
        type="button"
        class="expandable-gallery__button"
        @click="toggle"
      >
        <span>
          {{ expanded ? labelLess : labelMore }}
        </span>

        <span
          class="expandable-gallery__icon"
          :class="{
            'expandable-gallery__icon--expanded': expanded,
          }"
          aria-hidden="true"
        >
          ↓
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.expandable-gallery {
  width: 100%;
}

/* =========================================
   CONTENIDO
========================================= */

.expandable-gallery__content {
  position: relative;

  width: 100%;

  overflow: hidden;
  padding: $space-4;

  transition:
    max-height 0.6s ease,
    mask-image 0.4s ease;
}

/*
 * Estado contraído
 */
.expandable-gallery__content--collapsed {
  max-height: var(--collapsed-height);

  /*
   * Degradado inferior para indicar que
   * existe más contenido.
   */
  mask-image: linear-gradient(
    to bottom,
    black 0%,
    black 88%,
    transparent 100%
  );
}

/*
 * Estado expandido
 */
.expandable-gallery--expanded
  .expandable-gallery__content {
  max-height: 10000px;

  mask-image: none;
}

/* =========================================
   CONTROL
========================================= */

.expandable-gallery__control {
  display: flex;

  justify-content: center;

  align-items: center;

  margin-top: 1.5rem;
}

.expandable-gallery__button {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 0.6rem;

  min-width: 140px;

  padding: 0.7rem 1.25rem;

  border: 1px solid var(--color-border, #e5e5e5);

  border-radius: 999px;

  background: var(--color-surface, #fff);

  color: var(--color-text-primary, #222);

  font: inherit;

  font-size: 0.85rem;

  font-weight: 600;

  cursor: pointer;

  box-shadow: var(--shadow-small);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.expandable-gallery__button:hover {
  transform: translateY(-2px);

  box-shadow: var(--shadow-medium);

  background: #fafafa;
}

/* =========================================
   ICONO
========================================= */

.expandable-gallery__icon {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  transition: transform 0.3s ease;
}

.expandable-gallery__icon--expanded {
  transform: rotate(180deg);
}
</style>