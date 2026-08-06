<script setup lang="ts">
import { computed } from 'vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import BaseDivider from '@/components/ui/BaseDivider.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <BaseContainer>
      <div class="footer__content">
        <p>© {{ currentYear }} María Santiago. Diseño editorial y branding.</p>
        <BaseDivider />
      </div>
    </BaseContainer>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding-bottom: $space-12;
}

.footer__content {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  color: $color-text-secondary;
}
</style>
