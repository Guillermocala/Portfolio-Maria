<script setup lang="ts">
import { contactLinks } from "@/data/contact";

defineOptions({ name: "LinkedInBubble" });

/* LinkedIn es el canal de contacto principal: siempre a un toque. */
const linkedinUrl = contactLinks.find((link) => link.type === "linkedin")?.href;
</script>

<template>
  <a
    v-if="linkedinUrl"
    :href="linkedinUrl"
    class="linkedin-bubble"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por LinkedIn"
  >
    <span class="linkedin-bubble__label" aria-hidden="true">
      Hablemos en LinkedIn
    </span>
    <span class="linkedin-bubble__circle">
      <!-- Glifo "in" de LinkedIn (lucide ya no incluye íconos de marca) -->
      <svg
        class="linkedin-bubble__icon"
        viewBox="2.5 2.5 19 19"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
        />
      </svg>
    </span>
  </a>
</template>

<style scoped lang="scss">
$size: 56px;
$size-mobile: 52px;

.linkedin-bubble {
  position: fixed;
  right: calc(20px + env(safe-area-inset-right));
  bottom: calc(20px + env(safe-area-inset-bottom));
  /* por debajo del topbar y su menú móvil (40), encima del contenido */
  z-index: 30;
  display: flex;
  align-items: center;
  gap: $space-3;
  @include focus-ring;
  border-radius: $radius-pill;

  @media (max-width: 600px) {
    right: calc(16px + env(safe-area-inset-right));
    bottom: calc(16px + env(safe-area-inset-bottom));
  }
}

.linkedin-bubble__circle {
  position: relative;
  display: grid;
  place-items: center;
  width: $size;
  height: $size;
  border-radius: 50%;
  background: $color-accent;
  color: #ffffff;
  box-shadow:
    0 0 0 3px $color-primary,
    0 12px 28px rgba(168, 57, 90, 0.35);
  transition:
    transform 0.35s $ease-out,
    box-shadow 0.35s ease;

  /* Pulso sutil al cargar para llamar la atención una sola vez */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid $color-primary;
    opacity: 0;
    animation: bubble-pulse 1.8s ease-out 1.5s 2;
  }

  @media (max-width: 600px) {
    width: $size-mobile;
    height: $size-mobile;
  }
}

.linkedin-bubble__icon {
  width: 24px;
  height: 24px;
}

.linkedin-bubble__label {
  padding: 8px 14px;
  border-radius: $radius-pill;
  background: $color-surface;
  border: 1px solid $color-border-strong;
  box-shadow: $shadow-small;
  color: $color-accent;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  translate: 8px 0;
  pointer-events: none;
  transition:
    opacity 0.3s ease,
    translate 0.35s $ease-out;
}

@media (hover: hover) {
  .linkedin-bubble:hover {
    .linkedin-bubble__circle {
      transform: translateY(-4px) scale(1.06);
      box-shadow:
        0 0 0 3px $color-primary,
        0 18px 34px rgba(168, 57, 90, 0.4);
    }

    .linkedin-bubble__label {
      opacity: 1;
      translate: 0 0;
    }
  }
}

/* En táctil no hay hover: la etiqueta no se muestra */
@media (hover: none) {
  .linkedin-bubble__label {
    display: none;
  }
}

@keyframes bubble-pulse {
  0% {
    opacity: 0.9;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1.6);
  }
}
</style>
