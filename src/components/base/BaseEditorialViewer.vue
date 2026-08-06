<script setup lang="ts">
import { computed, ref, watch } from "vue";
import VuePdfEmbed from "vue-pdf-embed";

import type { EditorialDocument } from "src/data/types.ts";

const props = defineProps<{
  documents: EditorialDocument[];
}>();

const selected = ref<EditorialDocument | null>(null);

watch(
  () => props.documents,
  (docs) => {
    if (docs.length && !selected.value) {
      selected.value = docs[0];
    }
  },
  {
    immediate: true,
  },
);

const currentPdf = computed(() => selected.value?.pdf);
</script>

<template>
  <section class="editorial">
    <aside class="editorial__sidebar">
      <button
        v-for="document in documents"
        :key="document.id"
        class="editorial-card"
        :class="{ active: selected?.id === document.id }"
        @click="selected = document"
      >
        <img
          v-if="document.cover"
          :src="document.cover"
          :alt="document.title"
          class="editorial-card__cover"
        />

        <div>
          <span class="editorial-card__subtitle">
            {{ document.subtitle }}
          </span>

          <h3>
            {{ document.title }}
          </h3>

          <p>
            {{ document.description }}
          </p>
        </div>
      </button>
    </aside>

    <main class="editorial__viewer">
      <div class="editorial__viewer-scroll">
        <VuePdfEmbed v-if="currentPdf" :source="currentPdf" />
      </div>
    </main>
  </section>
</template>

<style>
.editorial {
  display: grid;

  grid-template-columns: 340px 1fr;

  gap: 2rem;
}

.editorial__sidebar {
  display: flex;

  flex-direction: column;

  gap: 1rem;
}

.editorial-card {
  display: flex;

  gap: 1rem;

  text-align: left;

  cursor: pointer;

  border: none;

  border-radius: 18px;

  background: white;

  padding: 1rem;

  transition: 0.25s;
}

.editorial-card:hover {
  transform: translateY(-3px);
}

.editorial-card.active {
  outline: 2px solid var(--color-primary);
}

.editorial-card__cover {
  width: 70px;

  height: 95px;

  object-fit: contain;

  border-radius: 10px;

  flex-shrink: 0;
}

.editorial-card__subtitle {
  font-size: 0.8rem;

  color: var(--color-primary);

  font-weight: 600;
}

.editorial-card h3 {
  margin: 0.35rem 0;
}

.editorial-card p {
  font-size: 0.9rem;

  color: var(--text-secondary);
}

.editorial__viewer {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;

  height: 80vh;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}

.editorial__viewer-scroll {
  flex: 1;

  overflow-y: auto;
  overflow-x: hidden;

  padding-right: 0.75rem;
}

.editorial__viewer-scroll :deep(canvas),
.editorial__viewer-scroll :deep(.vue-pdf-embed) {
  width: 100% !important;
  max-width: 100%;
}
</style>
