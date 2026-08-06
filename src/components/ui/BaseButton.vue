<script setup lang="ts">
import type { Component } from 'vue'

defineOptions({ name: 'BaseButton' })

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'md' | 'sm'
    href?: string
    type?: 'button' | 'submit'
    icon?: Component
    external?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    external: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : type"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="btn"
    :class="[`btn--${variant}`, size === 'sm' ? 'btn--sm' : '']"
    @click="handleClick"
  >
    <component :is="icon" v-if="icon" :size="18" />
    <slot />
  </component>
</template>
