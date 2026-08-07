<script setup lang="ts">
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

defineOptions({
  name: "BaseSection",
});

const props = withDefaults(
  defineProps<{
    id?: string;
    animate?: boolean;
  }>(),
  {
    animate: true,
  },
);

const sectionRef = ref<HTMLElement | null>(null);

const isVisible = ref(!props.animate);

useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true;
    }
  },
  {
    threshold: 0.05,
  },
);
</script>

<template>
  <section
    ref="sectionRef"
    :id="id"
    class="section"
    :class="{
      'section-fade': animate,
      'is-visible': isVisible,
    }"
  >
    <slot />
  </section>
</template>