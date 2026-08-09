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

/* =========================================================
 * DEBUG
 * ========================================================= */

console.log("[Editorial] Documentos recibidos:", props.documents);

props.documents.forEach((document) => {
  console.log("[Editorial] Documento:", {
    id: document.id,
    title: document.title,
    pdf: document.pdf,
    cover: document.cover,
  });
});

/* =========================================================
 * SELECCIONAR DOCUMENTO
 * ========================================================= */

const selectDocument = async (document: EditorialDocument) => {
  console.log("[Editorial] Seleccionando:", document.title);
  console.log("[Editorial] PDF original:", document.pdf);

  selected.value = document;

  await preloadDocument(document);

  console.log(" pdfsources: ");
  console.log(pdfSources.value);
  console.log("[Editorial] Blob URL:", pdfSources.value[document.id]);
};

/* =========================================================
 * CARGAR PDF
 * ========================================================= */

const preloadDocument = async (document: EditorialDocument): Promise<void> => {
  console.log("[Editorial] preloadDocument() ->", document.title);

  /*
   * Ya tenemos el PDF cargado.
   */
  if (pdfSources.value[document.id]) {
    console.log("[Editorial] Ya estaba cargado:", document.title);

    return;
  }

  /*
   * Ya se está descargando.
   */
  if (loadingDocuments.value[document.id]) {
    console.log("[Editorial] Ya se está cargando:", document.title);

    return;
  }

  loadingDocuments.value[document.id] = true;
  failedDocuments.value[document.id] = false;

  try {
    console.log("[Editorial] Fetch:", document.pdf);

    const response = await fetch(document.pdf);

    console.log("[Editorial] Response:", {
      url: response.url,
      status: response.status,
      ok: response.ok,
      type: response.type,
      contentType: response.headers.get("content-type"),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();

    console.log("[Editorial] Blob:", {
      size: blob.size,
      type: blob.type,
    });

    if (!blob.size) {
      throw new Error("El PDF fue descargado pero el Blob está vacío.");
    }

    const blobUrl = URL.createObjectURL(blob);

    console.log("[Editorial] Blob URL generado:", blobUrl);

    pdfSources.value[document.id] = blobUrl;

    console.log("[Editorial] PDF listo:", document.title);
  } catch (error) {
    console.error("[Editorial] ERROR:", document.title, error);

    failedDocuments.value[document.id] = true;
  } finally {
    loadingDocuments.value[document.id] = false;
  }
};

/* =========================================================
 * MOUNT
 * ========================================================= */

onMounted(async () => {
  console.log("[Editorial] Componente montado.");

  console.log("[Editorial] Total documentos:", props.documents.length);

  if (!selected.value) {
    console.warn("[Editorial] No existe documento seleccionado.");

    return;
  }

  console.log("[Editorial] Documento inicial:", selected.value.title);

  await preloadDocument(selected.value);

  console.log("[Editorial] Estado final inicial:", {
    selected: selected.value,
    source: pdfSources.value[selected.value.id],
    loading: loadingDocuments.value[selected.value.id],
    failed: failedDocuments.value[selected.value.id],
  });
});

/* =========================================================
 * CLEANUP
 * ========================================================= */

onUnmounted(() => {
  console.log("[Editorial] Desmontando componente.");

  Object.values(pdfSources.value).forEach((source) => {
    if (source.startsWith("blob:")) {
      URL.revokeObjectURL(source);

      console.log("[Editorial] Blob liberado:", source);
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
          v-for="(document, __) in documents"
          :key="document.id"
          type="button"
          class="editorial-card"
          :class="{
            'editorial-card--active': selected?.id === document.id,
          }"
          @click="selectDocument(document)"
        >
          <img
            v-if="document.cover"
            :src="document.cover"
            :alt="document.title"
            class="editorial-card__cover"
          />

          <div class="editorial-card__content">
            <h3>
              {{ document.title }}
            </h3>

            <p>
              {{ document.description }}
            </p>            
          </div>
        </button>
      </div>
    </aside>

    <!-- ============================================== -->
    <!-- VISUALIZADOR -->
    <!-- ============================================== -->

    <main class="editorial__viewer">
      <div
        v-if="selected && pdfSources[selected.id]"
        class="editorial__viewer-container"
      >
        <PDFViewer
          :key="pdfSources[selected.id]"
          :config="{
            src: pdfSources[selected.id],
            disabledCategories: ['annotation', 'redaction', 'tools', 'shapes'],
            theme: {
              preference: 'light',
            },
          }"
          class="editorial__pdf"
        />
      </div>

      <div
        v-else-if="selected && loadingDocuments[selected.id]"
        class="editorial__empty"
      >
        Cargando documento...
      </div>

      <div
        v-else-if="selected && failedDocuments[selected.id]"
        class="editorial__empty"
      >
        No se pudo cargar el documento.
      </div>

      <div v-else class="editorial__empty">No hay documentos disponibles.</div>
    </main>
  </section>
</template>

<style scoped lang="scss">
.editorial {
  display: grid;

  grid-template-columns: 320px minmax(0, 1fr);

  gap: 1.5rem;

  width: 100%;
  max-width: 1400px;

  min-width: 0;

  margin-inline: auto;
}

/* ============================================= */
/* SIDEBAR */
/* ============================================= */

.editorial__sidebar {
  min-width: 0;
  min-height: 0;

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
  display: grid;

  grid-template-columns: 78px minmax(0, 1fr);

  gap: 0.9rem;

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

.editorial-card__cover {
  width: 78px;

  height: 100px;

  object-fit: scale-down;

  border-radius: 8px;

  background: #f3f3f3;

  transition: transform 0.3s ease;
}

.editorial-card:hover .editorial-card__cover {
  transform: scale(1.04);
}
.editorial-card__content {
  min-width: 0;

  display: flex;

  flex-direction: column;

  justify-content: center;
}

.editorial-card h3 {
  margin: 0 0 0.35rem;

  font-size: 0.9rem;

  line-height: 1.25;

  display: -webkit-box;

  overflow: hidden;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;
}

.editorial-card p {
  margin: 0;

  font-size: 0.75rem;

  line-height: 1.45;

  color: var(--color-text-secondary, #777);

  display: -webkit-box;

  overflow: hidden;

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
  min-height: 0;

  height: 760px;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: 1px solid var(--color-border, #e5e5e5);
  border-radius: 20px;

  background: #f4f4f4;

  box-shadow: var(--shadow-small);
}

.editorial__viewer-container {
  position: relative;

  flex: 1 1 auto;

  width: 100%;
  height: 100%;

  min-width: 0;
  min-height: 0;

  overflow: hidden;
}

.editorial__pdf {
  display: block;

  width: 100%;
  height: 100%;

  min-width: 0;
  min-height: 0;
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
