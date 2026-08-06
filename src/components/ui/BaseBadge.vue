<script setup lang="ts">
defineOptions({ name: 'BaseBadge' })

defineProps<{
  label: string
  value: string
}>()
</script>

<template>
  <span class="badge">
    <span class="badge__value">{{ value }}</span>
    {{ label }}
  </span>
</template>
