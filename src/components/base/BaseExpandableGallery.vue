<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useCollapsible } from "@/composables/useCollapsible";

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

const contentRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);

const hasMoreItems = computed(
  () => props.totalItems > props.collapsedItems,
);

const { expanded, animating, toggle, applyCollapsed } = useCollapsible({
  content: contentRef,
  anchor: buttonRef,
  collapsedHeight: () => (hasMoreItems.value ? props.collapsedHeight : ""),
});

onMounted(applyCollapsed);
watch(hasMoreItems, applyCollapsed);
</script>

<template>
  <div
    class="expandable-gallery"
    :class="{
      'expandable-gallery--expanded': expanded,
    }"
  >
    <!-- ========================================= -->
    <!-- CONTENIDO -->
    <!-- ========================================= -->

    <div
      ref="contentRef"
      class="expandable-gallery__content"
      :class="{
        'expandable-gallery__content--collapsed':
          (!expanded || animating) && hasMoreItems,
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
      :class="{
        'expandable-gallery__control--floating': expanded || animating,
      }"
    >
      <button
        ref="buttonRef"
        type="button"
        class="expandable-gallery__button"
        :aria-expanded="expanded"
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

  /* duración y curva las fija useCollapsible */
  transition-property: height;
}

/*
 * Estado contraído: degradado inferior para indicar
 * que existe más contenido.
 */
.expandable-gallery__content--collapsed {
  mask-image: linear-gradient(
    to bottom,
    black 0%,
    black 80%,
    transparent 100%
  );
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

/*
 * Móvil/tablet con la galería abierta: "Ver menos" queda pegado al borde
 * inferior mientras la galería está en pantalla, para poder colapsarla sin
 * recorrer todas las imágenes. Se mantiene mientras dura el colapso para que
 * el anclaje de scroll parta de la posición visible del botón.
 */
@media (max-width: 1023px) {
  .expandable-gallery__control--floating {
    position: sticky;
    bottom: calc(16px + env(safe-area-inset-bottom));
    z-index: 5;
    pointer-events: none;

    .expandable-gallery__button {
      pointer-events: auto;
      background: var(--color-surface);
      box-shadow: 0 12px 28px rgba(27, 27, 27, 0.18);
    }
  }
}

.expandable-gallery__button {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 0.6rem;

  min-width: 140px;

  padding: 0.8rem 1.6rem;

  border: 2px solid var(--color-primary);

  border-radius: 999px;

  background: var(--color-surface, #fff);

  color: var(--color-text-primary, #222);

  font: inherit;

  font-size: 0.85rem;

  font-weight: 600;

  cursor: pointer;

  box-shadow: var(--shadow-small);

  transition:
    transform 0.35s var(--ease-out),
    box-shadow 0.35s ease,
    background 0.35s ease,
    border-color 0.35s ease;
}

.expandable-gallery__button:hover {
  transform: translateY(-2px);

  box-shadow: var(--shadow-medium);

  background: var(--color-accent-soft);

  border-color: var(--color-accent);
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