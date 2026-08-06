<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

const toggleVisibility = () => {
  visible.value = window.scrollY > 320
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility, { passive: true })
  toggleVisibility()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>

<template>
  <button v-if="visible" class="scroll-top" type="button" @click="scrollTop" aria-label="Volver arriba">
    ↑
  </button>
</template>

<style scoped lang="scss">
.scroll-top {
  position: fixed;
  right: $space-4;
  bottom: $space-4;
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 999px;
  background: $color-text-primary;
  color: $color-surface;
  box-shadow: $shadow-large;
  cursor: pointer;
  z-index: 30;
}
</style>
