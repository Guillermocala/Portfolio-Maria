<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  onClickOutside,
  onKeyStroke,
  useResizeObserver,
  useWindowScroll,
  useWindowSize,
} from "@vueuse/core";
import { Menu, X } from "@lucide/vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import { navLinks, sectionIds } from "@/data/navigation";
import { useScrollSpy } from "@/composables/useScrollSpy";

defineOptions({ name: "AppNavbar" });

const SCROLL_THRESHOLD = 24;

const { y } = useWindowScroll();
const { height: viewportHeight } = useWindowSize();
const { activeSection } = useScrollSpy(sectionIds);

const headerRef = ref<HTMLElement | null>(null);
const isMenuOpen = ref(false);

const isScrolled = computed(() => y.value > SCROLL_THRESHOLD);

/*
 * La altura del documento se mide sólo cuando cambia de tamaño, no en cada
 * evento de scroll (leer scrollHeight ahí fuerza un layout por frame).
 */
const documentHeight = ref(document.documentElement.scrollHeight);
useResizeObserver(document.body, () => {
  documentHeight.value = document.documentElement.scrollHeight;
});

const progress = computed(() => {
  const scrollable = documentHeight.value - viewportHeight.value;
  return scrollable > 0 ? Math.min(y.value / scrollable, 1) : 0;
});

const closeMenu = () => {
  isMenuOpen.value = false;
};

onClickOutside(headerRef, closeMenu);
onKeyStroke("Escape", closeMenu);

watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});
</script>

<template>
  <header
    ref="headerRef"
    class="topbar"
    :class="{ 'topbar--scrolled': isScrolled, 'topbar--open': isMenuOpen }"
  >
    <BaseContainer>
      <nav class="topbar__nav" aria-label="Navegación principal">
        <a href="#hero" class="topbar__brand" @click="closeMenu">María Santiago</a>

        <div class="topbar__links">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            class="topbar__link"
            :class="{ 'is-active': activeSection === link.id }"
          >
            {{ link.label }}
          </a>
        </div>

        <button
          type="button"
          class="topbar__toggle"
          :aria-expanded="isMenuOpen"
          aria-controls="topbar-mobile-menu"
          :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <X v-if="isMenuOpen" :size="22" :stroke-width="2.25" />
          <Menu v-else :size="22" :stroke-width="2.25" />
        </button>
      </nav>
    </BaseContainer>

    <Transition name="mobile-menu">
      <div v-if="isMenuOpen" id="topbar-mobile-menu" class="topbar__mobile">
        <a
          v-for="(link, index) in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="topbar__mobile-link"
          :class="{ 'is-active': activeSection === link.id }"
          :style="{ '--i': index }"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </div>
    </Transition>

    <span
      class="topbar__progress"
      :style="{ transform: `scaleX(${progress})` }"
      aria-hidden="true"
    />
  </header>
</template>

<style scoped lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(252, 185, 192, 0.4);
  transition:
    background 0.4s ease,
    box-shadow 0.4s ease,
    backdrop-filter 0.4s ease;

  &--scrolled {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 8px 24px rgba(27, 27, 27, 0.06);
  }

  &--open {
    background: rgba(255, 255, 255, 0.96);
  }

  /* Móvil: sin backdrop-filter (muy costoso al hacer scroll en Android) */
  @media (max-width: 1023px) {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;

    &--scrolled {
      background: rgba(255, 255, 255, 0.94);
    }
  }
}

.topbar__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: $space-4;
  padding-block: $space-4;
  transition: padding 0.4s $ease-out;

  .topbar--scrolled & {
    padding-block: 10px;
  }
}

.topbar__brand {
  font-family: $font-heading;
  font-style: italic;
  font-size: 21px;
  font-weight: 600;
  color: $color-text-primary;
  white-space: nowrap;
  transition: font-size 0.4s $ease-out;
  @include focus-ring;

  .topbar--scrolled & {
    font-size: 18px;
  }
}

.topbar__links {
  display: none;
  gap: $space-6;

  @include breakpoint(lg) {
    display: flex;
  }
}

.topbar__link {
  position: relative;
  padding-block: 4px;
  color: $color-text-secondary;
  font-size: $text-small;
  font-weight: 600;
  transition: color 0.25s ease;
  @include focus-ring;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    border-radius: $radius-pill;
    background: $color-accent;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s $ease-out;
  }

  &:hover,
  &.is-active {
    color: $color-accent;
  }

  &.is-active::after {
    transform: scaleX(1);
  }
}

.topbar__toggle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: $color-text-primary;
  background: $color-accent-soft;
  transition: background 0.25s ease;
  @include focus-ring;

  &:hover {
    background: #ffe0e4;
  }

  @include breakpoint(lg) {
    display: none;
  }
}

.topbar__mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: calc(100dvh - 100%);
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: $space-6 5%;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.98);
  border-top: 1px solid rgba(252, 185, 192, 0.4);

  @include breakpoint(lg) {
    display: none;
  }
}

.topbar__mobile-link {
  display: flex;
  align-items: center;
  min-height: 52px;
  padding-inline: $space-4;
  border-radius: $radius-card;
  font-family: $font-heading;
  font-size: 1.5rem;
  color: $color-text-primary;
  transition:
    background 0.25s ease,
    color 0.25s ease;
  @include focus-ring;

  &:hover,
  &.is-active {
    background: $color-accent-soft;
    color: $color-accent;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;

  .topbar__mobile-link {
    transition:
      opacity 0.4s $ease-out,
      transform 0.4s $ease-out;
    transition-delay: calc(var(--i) * 40ms);
  }
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;

  .topbar__mobile-link {
    opacity: 0;
    transform: translateY(12px);
  }
}

.topbar__progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: linear-gradient(90deg, $color-primary, $color-accent);
  transform-origin: left;
  pointer-events: none;
  will-change: transform;
}
</style>
