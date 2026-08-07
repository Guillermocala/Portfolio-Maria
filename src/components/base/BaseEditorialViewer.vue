<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { PDFViewer } from "@embedpdf/vue-pdf-viewer";

import type { EditorialDocument } from "@/data/types";

const props = defineProps<{
  documents: EditorialDocument[];
}>();

const selected = ref<EditorialDocument | null>(props.documents[0] ?? null);

const pdfSources = ref<Record<string, string>>({});
const loadingDocuments = ref<Record<string, boolean>>({});
const failedDocuments = ref<Record<string, boolean>>({});

/*
 * Props que serán enviadas a VPdfViewer.
 *
 * VPVBaseProps nos permite mantener la configuración
 * compatible con la librería.
 */

/* const selectedIndex = computed(() => {
  if (!selected.value) return 0;

  return props.documents.findIndex(
    (document) => document.id === selected.value?.id,
  );
});

const currentPdf = computed(() => {
  if (!selected.value) return "";

  return pdfSources.value[selected.value.id] ?? "";
}); */

const selectDocument = (document: EditorialDocument) => {
  selected.value = document;
};

const preloadDocument = async (document: EditorialDocument) => {
  if (pdfSources.value[document.id]) return;

  if (loadingDocuments.value[document.id]) return;

  loadingDocuments.value[document.id] = true;

  try {
    /*
     * El PDF viene importado desde /src/assets.
     *
     * Vite transforma ese import en una URL válida
     * durante el build.
     */
    const response = await fetch(document.pdf);

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${document.pdf}`);
    }

    const blob = await response.blob();

    pdfSources.value[document.id] = URL.createObjectURL(blob);

    console.debug(`[Editorial] PDF cargado: ${document.title}`);
  } catch (error) {
    console.error(`[Editorial] Error cargando PDF: ${document.title}`, error);

    failedDocuments.value[document.id] = true;
  } finally {
    loadingDocuments.value[document.id] = false;
  }
};

const preloadDocuments = async () => {
  /*
   * Secuencial para evitar descargar los 3 PDFs
   * simultáneamente.
   */
  for (const document of props.documents) {
    await preloadDocument(document);
  }
};

onMounted(() => {
  void preloadDocuments();
});

onUnmounted(() => {
  Object.values(pdfSources.value).forEach((source) => {
    if (source.startsWith("blob:")) {
      URL.revokeObjectURL(source);
    }
  });
});
</script>

<template>
  <section class="editorial">
    <!-- ============================================== -->
    <!-- DOCUMENTOS -->
    <!-- ============================================== -->

    <aside class="editorial__sidebar">
      <div class="editorial__sidebar-header">
        <span class="editorial__legend"> Documentos </span>

        <span class="editorial__count">
          {{ documents.length }}
        </span>
      </div>

      <p class="editorial__instruction">
        Selecciona un proyecto para visualizarlo.
      </p>

      <div class="editorial__documents">
        <button
          v-for="(document, index) in documents"
          :key="document.id"
          type="button"
          class="editorial-card"
          :class="{
            'editorial-card--active': selected?.id === document.id,
          }"
          @click="selectDocument(document)"
        >
          <span class="editorial-card__number">
            {{ String(index + 1).padStart(2, "0") }}
          </span>

          <img
            v-if="document.cover"
            :src="document.cover"
            :alt="document.title"
            class="editorial-card__cover"
          />

          <div class="editorial-card__content">
            <span class="editorial-card__subtitle">
              {{ document.subtitle }}
            </span>

            <h3>
              {{ document.title }}
            </h3>

            <p>
              {{ document.description }}
            </p>

            <span
              v-if="loadingDocuments[document.id]"
              class="editorial-card__status"
            >
              Preparando...
            </span>

            <span
              v-else-if="failedDocuments[document.id]"
              class="editorial-card__status editorial-card__status--error"
            >
              No disponible
            </span>

            <span v-else class="editorial-card__status"> Ver documento → </span>
          </div>
        </button>
      </div>
    </aside>

    <!-- ============================================== -->
    <!-- VISUALIZADOR -->
    <!-- ============================================== -->

    <main class="editorial__viewer">
      <div v-if="selected" class="editorial__viewer-container">
        <PDFViewer
          :key="selected.id"
          :config="{
            src: selected.pdf,
            disabledCategories: ['annotation'],
            theme: {
              preference: 'light',
            },
          }"
          class="editorial__pdf"
        />
      </div>

      <div v-else class="editorial__empty">No hay documentos disponibles.</div>
    </main>
  </section>
</template>

<style scoped lang="scss">
.editorial {
  display: grid;

  grid-template-columns:
    320px
    minmax(0, 1fr);

  gap: 1.5rem;

  width: 100%;

  max-width: 1400px;

  margin-inline: auto;
}

/* ============================================= */
/* SIDEBAR */
/* ============================================= */

.editorial__sidebar {
  min-width: 0;

  height: 760px;

  display: flex;

  flex-direction: column;

  padding: 1.25rem;

  background: var(--color-surface, #fff);

  border: 1px solid var(--color-border, #e5e5e5);

  border-radius: 20px;

  box-shadow: var(--shadow-small);

  overflow: hidden;
}

.editorial__sidebar-header {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 0.35rem;
}

.editorial__legend {
  font-size: 0.85rem;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.08em;
}

.editorial__count {
  display: grid;

  place-items: center;

  min-width: 28px;

  height: 28px;

  padding-inline: 0.4rem;

  border-radius: 999px;

  background: #f2f2f2;

  font-size: 0.75rem;
}

.editorial__instruction {
  margin: 0 0 1rem;

  font-size: 0.85rem;

  line-height: 1.5;

  color: var(--color-text-secondary, #777);
}

.editorial__documents {
  display: flex;

  flex-direction: column;

  gap: 0.75rem;

  min-height: 0;

  overflow-y: auto;

  padding-right: 0.35rem;
}

/* ============================================= */
/* CARD */
/* ============================================= */

.editorial-card {
  position: relative;

  display: grid;

  grid-template-columns:
    28px
    70px
    minmax(0, 1fr);

  gap: 0.75rem;

  width: 100%;

  padding: 0.75rem;

  border: 1px solid transparent;

  border-radius: 14px;

  background: transparent;

  text-align: left;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.editorial-card:hover {
  transform: translateY(-2px);

  background: #fafafa;

  border-color: var(--color-border, #e5e5e5);
}

.editorial-card--active {
  background: #f7f7f7;

  border-color: var(--color-accent, #222);
}

.editorial-card__number {
  padding-top: 0.15rem;

  font-size: 0.7rem;

  font-weight: 700;

  color: var(--color-text-secondary, #888);
}

.editorial-card__cover {
  width: 70px;

  height: 90px;

  object-fit: cover;

  border-radius: 8px;

  background: #f3f3f3;
}

.editorial-card__content {
  min-width: 0;
}

.editorial-card__subtitle {
  font-size: 0.7rem;

  font-weight: 700;

  text-transform: uppercase;

  color: var(--color-accent, #555);
}

.editorial-card h3 {
  margin: 0.25rem 0;

  font-size: 0.9rem;

  line-height: 1.25;
}

.editorial-card p {
  display: -webkit-box;

  margin: 0;

  overflow: hidden;

  font-size: 0.75rem;

  line-height: 1.4;

  color: var(--color-text-secondary, #777);

  -webkit-line-clamp: 3;

  -webkit-box-orient: vertical;
}

.editorial-card__status {
  display: block;

  margin-top: 0.5rem;

  font-size: 0.7rem;

  font-weight: 600;
}

.editorial-card__status--error {
  color: #b42318;
}

/* ============================================= */
/* VIEWER */
/* ============================================= */

.editorial__viewer {
  min-width: 0;

  height: 760px;

  display: flex;

  flex-direction: column;

  overflow: hidden;

  border: 1px solid var(--color-border, #e5e5e5);

  border-radius: 20px;

  background: #f4f4f4;

  box-shadow: var(--shadow-small);
}

.editorial__viewer-header {
  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 1rem 1.25rem;

  background: #fff;

  border-bottom: 1px solid var(--color-border, #e5e5e5);
}

.editorial__viewer-label {
  display: block;

  margin-bottom: 0.2rem;

  font-size: 0.7rem;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.08em;

  color: var(--color-text-secondary, #777);
}

.editorial__viewer-header h3 {
  margin: 0;

  font-size: 1rem;
}

.editorial__viewer-position {
  display: block;

  margin-top: 0.2rem;

  font-size: 0.7rem;

  color: var(--color-text-secondary, #777);
}

/* ============================================= */
/* PDF */
/* ============================================= */

.editorial__viewer-content {
  position: relative;

  flex: 1;

  min-height: 0;

  overflow: hidden;

  background: #e9e9e9;
}

.editorial__pdf-viewer {
  width: 100%;

  height: 100%;

  min-height: 0;
}

/*
 * MUY IMPORTANTE:
 *
 * VPdfViewer necesita ocupar todo el espacio
 * disponible.
 */

.editorial__pdf-viewer :deep(> *) {
  width: 100%;

  height: 100%;
}

/* ============================================= */
/* STATES */
/* ============================================= */

.editorial__state {
  width: 100%;

  height: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 0.5rem;

  text-align: center;

  color: var(--color-text-secondary, #777);
}

.editorial__state strong {
  color: var(--color-text-primary, #222);
}

.editorial__loader {
  width: 32px;

  height: 32px;

  margin-bottom: 0.75rem;

  border: 3px solid #ddd;

  border-top-color: var(--color-accent, #222);

  border-radius: 50%;

  animation: editorial-spin 0.8s linear infinite;
}

@keyframes editorial-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ============================================= */
/* MOBILE */
/* ============================================= */

@media (max-width: 900px) {
  .editorial {
    grid-template-columns: 1fr;
  }

  .editorial__sidebar {
    height: auto;

    max-height: 300px;
  }

  .editorial__documents {
    flex-direction: row;

    overflow-x: auto;

    overflow-y: hidden;
  }

  .editorial-card {
    flex: 0 0 280px;
  }

  .editorial__viewer {
    height: 700px;
  }
}

@media (max-width: 900px) {
  .editorial__viewer {
    height: 650px;
  }
}

@media (max-width: 600px) {
  .editorial__viewer {
    height: 600px;
    border-radius: 14px;
  }
}
</style>
