<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue'
import { navLinks } from '@/data/navigation'
</script>

<template>
  <header class="topbar">
    <BaseContainer>
      <nav class="topbar__nav" aria-label="Navegación principal">
        <a href="#hero" class="topbar__brand">María</a>
        <div class="topbar__links">
          <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" class="topbar__link">
            {{ link.label }}
          </a>
        </div>
      </nav>
    </BaseContainer>
  </header>
</template>

<style scoped lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(10px);
  background: rgba(250, 250, 250, 0.9);
  border-bottom: 1px solid $color-border;
}

.topbar__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: $space-4;
}

.topbar__brand {
  font-family: $font-heading;
  font-size: 1.25rem;
  font-weight: 700;
  color: $color-text-primary;
  text-decoration: none;
}

.topbar__links {
  display: flex;
  gap: $space-4;
  flex-wrap: wrap;
}

.topbar__link {
  color: $color-text-secondary;
  text-decoration: none;
  font-size: $text-small;
}
</style>
