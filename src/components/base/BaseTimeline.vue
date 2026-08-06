<script setup lang="ts">
import type { TimelineEntry } from "@/data/types";

defineProps<{
  items: TimelineEntry[];
}>();
</script>

<template>
  <div class="timeline">
    <article
      v-for="item in items"
      :key="`${item.year}-${item.title}`"
      class="timeline__item"
    >
      <div class="timeline__marker">
        <span class="timeline__dot" />
        <span class="timeline__line" />
      </div>

      <div class="timeline__content">
        <span class="timeline__year">
          {{ item.year }}
        </span>

        <h3>{{ item.title }}</h3>

        <p class="timeline__company">
          {{ item.company }}
        </p>

        <p>
          {{ item.description }}
        </p>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.timeline__item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 1.5rem;
}

.timeline__marker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline__dot {
  width: 14px;
  height: 14px;

  border-radius: 50%;

  background: var(--color-primary);
}

.timeline__line {
  flex: 1;
  width: 2px;

  margin-top: .5rem;

  background: rgba(0,0,0,.12);
}

.timeline__item:last-child .timeline__line {
  display: none;
}

.timeline__year {
  display: inline-block;

  margin-bottom: .5rem;

  color: var(--color-primary);
  font-weight: 700;
}

.timeline__company {
  margin-bottom: .75rem;

  color: var(--color-text-light);
}
</style>