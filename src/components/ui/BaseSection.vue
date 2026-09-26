<script setup lang="ts">
defineOptions({
  name: "BaseSection",
});

defineProps<{
  id?: string;
  nested?: boolean;
}>();
</script>

<template>
  <section :id="id" class="section" :class="{ 'section--nested': nested }">
    <slot />
  </section>
</template>
