<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useResizeObserver, useScroll } from "@vueuse/core";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { useCollapsible } from "@/composables/useCollapsible";
import { useScrollTo } from "@/composables/useScrollTo";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseSection from "@/components/ui/BaseSection.vue";
import BaseTitle from "@/components/ui/BaseTitle.vue";
import BaseQrCard from "@/components/ui/BaseQrCard.vue";
import heroPhoto from "@/assets/hero.jpeg";
import BaseCarousel from "@/components/ui/BaseCarousel.vue";
import BaseTimeline from "@/components/base/BaseTimeline.vue";
import PhotoCard from "@/components/base/PhotoCard.vue";
import AdvertisingCard from "@/components/base/AdvertisingCard.vue";
import BaseEditorialViewer from "@/components/base/BaseEditorialViewer.vue";
import BaseExpandableGallery from "@/components/base/BaseExpandableGallery.vue";
import MenuCard from "@/components/base/MenuCard.vue";
import AppNavbar from "@/components/layout/AppNavbar.vue";
import { profile, services, featuredProjects } from "@/data/profile";
import { contactLinks } from "@/data/contact";
import { experienceEntries } from "@/data/experience";
import { tools } from "@/data/tools";
/* import { onMounted, onUnmounted, watch } from "vue"; */
/* import type { EditorialDocument } from "@/data/types"; */

import rinconConocimientoPdf from "@/assets/portfolio/editorial/El_rincon_del_conocimiento.pdf";
import coverRinconConocimiento from "@/assets/portfolio/editorial/cover_1.png";
/* import thissaPdf from "@/assets/portfolio/editorial/Presentacion_Thissa_Store.pdf";
import coverThissaPdf from "@/assets/portfolio/editorial/cover_2.png"; */
import catalogPdf from "@/assets/portfolio/editorial/Catalogo_don_josue.pdf";
import coverCatalogPdf from "@/assets/portfolio/editorial/cover_3.png";

import qr1 from "@/assets/portfolio/qrs/qr1.svg";
import qr2 from "@/assets/portfolio/qrs/qr2.svg";
import qr3 from "@/assets/portfolio/qrs/qr3.svg";
import qr4 from "@/assets/portfolio/qrs/qr4.svg";
import qr5 from "@/assets/portfolio/qrs/qr5.svg";
import qr6 from "@/assets/portfolio/qrs/qr6.svg";
import qr7 from "@/assets/portfolio/qrs/qr7.svg";
import qr8 from "@/assets/portfolio/qrs/qr8.svg";
import qr9 from "@/assets/portfolio/qrs/qr9.png";

const { scrollToSection } = useScrollTo();

type CarouselDirection = "left" | "right" | "up" | "down";

type PortfolioPanel = {
  id: string;
  title: string;
  description: string;
  folder: string;
  images: string[];
  direction: CarouselDirection;
};

type QrImage = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

type EditorialDocument = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  pdf: string;
  viewer: "flipbook" | "pdf";
};

const portfolioMedia = import.meta.glob("../assets/portfolio/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const supportedExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".jpe",
  ".jfif",
  ".webp",
  ".avif",
  ".svg",
  ".gif",
]);

const getImagesForFolder = (folder: string) => {
  const folderPath = `/portfolio/${folder.toLowerCase()}/`;

  return Object.entries(portfolioMedia)
    .filter(([path]) => {
      const normalized = path.toLowerCase();

      const extension = normalized.slice(normalized.lastIndexOf("."));

      return (
        normalized.includes(folderPath) && supportedExtensions.has(extension)
      );
    })
    .map(([, src]) => src)
    .sort();
};

const portfolioPanels: PortfolioPanel[] = [
  {
    id: "smartcultivo",
    title: "SmartCultivo",
    description:
      "Contenido enfocado en innovación, agricultura y tecnología para comunicar productos, procesos y novedades de la marca.",
    folder: "smartcultivo",
    images: getImagesForFolder("smartcultivo"),
    direction: "left",
  },
  {
    id: "thissa",
    title: "Thissa Store",
    description:
      "Publicaciones comerciales orientadas a promocionar productos, ofertas y campañas para redes sociales.",
    folder: "thissa",
    images: getImagesForFolder("thissa"),
    direction: "left",
  },
  {
    id: "osiris",
    title: "Bar Osiris",
    description:
      "Diseños promocionales para eventos, bebidas y campañas publicitarias del establecimiento.",
    folder: "osiris",
    images: getImagesForFolder("osiris"),
    direction: "left",
  },
];

const portfolioQrs: QrImage[] = [
  {
    id: "qr1",
    title: "",
    description: "",
    image: qr1,
    href: "https://smartcultivo.com/",
  },
  {
    id: "qr2",
    title: "",
    description: "",
    image: qr2,
    href: "https://thissa.store/quesichichacol",
  },
  {
    id: "qr3",
    title: "",
    description: "",
    image: qr3,
    href: "https://thissa.store/bubaluu_bq",
  },
  {
    id: "qr4",
    title: "",
    description: "",
    image: qr4,
    href: "https://thissa.store/ladeliciagourmet",
  },
  {
    id: "qr5",
    title: "",
    description: "",
    image: qr5,
    href: "https://thissa.store/charlabarra",
  },
  {
    id: "qr6",
    title: "",
    description: "",
    image: qr6,
    href: "https://thissa.store/oyebonitarestaurantebar",
  },
  {
    id: "qr7",
    title: "",
    description: "",
    image: qr7,
    href: "https://thissa.store/hotelelcisne",
  },
  {
    id: "qr8",
    title: "",
    description: "",
    image: qr8,
    href: "https://thissa.store/hotelelcisne",
  },
  {
    id: "qr9",
    title: "",
    description: "",
    image: qr9,
    href: "https://thissa.store/",
  },
];

const editorialDocuments: EditorialDocument[] = [
  {
    id: "book",
    title: "El Rincón del Conocimiento",
    subtitle: "Libro educativo",
    description:
      "Proyecto editorial diagramado en formato horizontal para una experiencia de lectura inmersiva.",
    cover: coverRinconConocimiento,
    pdf: rinconConocimientoPdf,
    viewer: "flipbook",
  },
/* 
  {
    id: "thissa",
    title: "Presentación Thissa Store",
    subtitle: "Presentación corporativa",
    description:
      "Presentación desarrollada para comunicar la identidad y propuesta de valor de la marca.",
    cover: coverThissaPdf,
    pdf: thissaPdf,
    viewer: "pdf",
  }, */

  {
    id: "don-josue",
    title: "Catálogo de Productos Don Josué",
    subtitle: "Catálogo comercial",
    description:
      "Catálogo diseñado para exhibir productos mediante una estructura clara y atractiva.",
    cover: coverCatalogPdf,
    pdf: catalogPdf,
    viewer: "flipbook",
  },
];

const currentYear = computed(() => new Date().getFullYear());
const heroNameFirst = computed(() => profile.name.split(" ")[0]);
const heroNameRest = computed(() =>
  profile.name.slice(heroNameFirst.value.length),
);
const brandingImages = getImagesForFolder("branding");
const advertisingImages = getImagesForFolder("advertising");
const digitalMenuImages = getImagesForFolder("digital-menus");
const physicalMenuImages = getImagesForFolder("physical-menus");
const photographyImages = getImagesForFolder("photography");

/* ================================
   QR: expandir / contraer
================================ */
const visibleQrCount = 3;

/* Espacio extra del grid para que el hover de las cards no se recorte */
const QR_GRID_PADDING = 20;

const qrGridRef = ref<HTMLElement | null>(null);
const qrToggleRef = ref<HTMLElement | null>(null);

const {
  expanded: qrExpanded,
  animating: qrAnimating,
  toggle: toggleQrs,
  applyCollapsed: applyQrCollapsed,
} = useCollapsible({
  content: qrGridRef,
  anchor: qrToggleRef,
  flip: qrToggleRef,
  collapsedHeight: () => {
    const grid = qrGridRef.value;
    const toggle = qrToggleRef.value;
    if (!grid || !toggle) return "";

    // Fondo más bajo entre los QR visibles y el toggle (pueden medir distinto).
    const visibleCells = Array.from(
      grid.querySelectorAll<HTMLElement>(".qr-grid__cell"),
    ).slice(0, visibleQrCount);
    const bottom = Math.max(
      ...[...visibleCells, toggle].map((el) => el.offsetTop + el.offsetHeight),
    );

    return `${bottom + QR_GRID_PADDING}px`;
  },
});

const syncQrHeight = () => {
  if (!qrAnimating.value) applyQrCollapsed();
};

onMounted(syncQrHeight);
useResizeObserver(qrToggleRef, syncQrHeight);

/* ================================
   Menús digitales: navegación
================================ */
const MENUS_GAP = 20;

const menusGalleryRef = ref<HTMLElement | null>(null);
const { arrivedState: menusArrived, measure: measureMenus } =
  useScroll(menusGalleryRef);

const scrollMenus = (direction: 1 | -1) => {
  const gallery = menusGalleryRef.value;
  if (!gallery) return;

  const card = gallery.firstElementChild as HTMLElement | null;
  const step = card ? card.offsetWidth + MENUS_GAP : gallery.clientWidth * 0.8;

  gallery.scrollBy({ left: direction * step * 2, behavior: "smooth" });
};

onMounted(measureMenus);
</script>

<template>
  <div class="site-shell">
    <AppNavbar />

    <main>
      <BaseSection id="hero" class="hero-section">
        <BaseContainer>
          <div class="hero">
            <div class="hero__blob hero__blob--a" aria-hidden="true" />
            <div class="hero__blob hero__blob--b" aria-hidden="true" />
            <div
              v-reveal="{ effect: 'fade-left', stagger: 110 }"
              class="hero__content"
            >
              <BaseBadge
                label="Diseño editorial y branding"
                :value="profile.specialty"
              />
              <h1 class="hero__title">
                <span class="hero__title-accent">{{ heroNameFirst }}</span
                >{{ heroNameRest }}
              </h1>
              <p class="hero__lead">{{ profile.description }}</p>
              <div class="hero__actions">
                <BaseButton
                  variant="primary"
                  @click="scrollToSection('portfolio')"
                  >Ver portafolio</BaseButton
                >
                <BaseButton
                  variant="secondary"
                  @click="scrollToSection('contact')"
                  >Contactar</BaseButton
                >
              </div>
            </div>
            <div v-reveal="{ effect: 'zoom', delay: 250 }" class="hero__media">
              <div class="hero__photo-backdrop" aria-hidden="true" />
              <div class="hero__photo">
                <img :src="heroPhoto" :alt="profile.name" class="hero__image" />
              </div>
              <div class="hero__bubble" aria-hidden="true" />
            </div>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="about">
        <BaseContainer>
          <div class="split-grid">
            <div>
              <BaseTitle tag="h2" eyebrow="Sobre mí" class="about__title"
                >Diseño con propósito, estrategia y creatividad.</BaseTitle
              >
              <p v-reveal="{ effect: 'fade-left', delay: 150 }" class="section-copy">
                {{ profile.about }}
              </p>
            </div>
            <div v-reveal="'fade-right'" class="stats-card">
              <div
                v-for="stat in profile.stats"
                :key="stat.label"
                class="stat-pill"
              >
                <strong class="stat-pill__value">{{ stat.value }}</strong>
                <span class="stat-pill__label">{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="services">
        <BaseContainer>
          <BaseTitle tag="h2" eyebrow="Qué hago">Servicios</BaseTitle>
          <div v-reveal="{ effect: 'zoom', stagger: 80 }" class="card-grid">
            <BaseCard
              v-for="service in services"
              :key="service.id"
              class="service-card"
              :title="service.title"
              :text="service.description"
            />
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="featured">
        <BaseContainer>
          <BaseTitle
            tag="h2"
            eyebrow="Portafolio"
            subtitle="Una selección de proyectos que reúnen diferentes áreas del diseño gráfico, donde cada propuesta fue desarrollada de acuerdo con las necesidades y objetivos de cada cliente."
            >Destacados</BaseTitle
          >
          <div
            v-reveal="{ effect: 'zoom', stagger: 120 }"
            class="card-grid featured-grid"
          >
            <BaseCard
              v-for="project in featuredProjects"
              :key="project.image"
              class="featured-card"
              :image="project.image"
              :title="project.name"
              :text="project.summary"
            >
              <a
                class="featured-card__link"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Visitar sitio de ${project.name}`"
                >Visitar sitio ↗</a
              >
            </BaseCard>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="portfolio">
        <BaseContainer>
          <BaseTitle
            tag="h2"
            eyebrow="Trabajo"
            subtitle="Diseño gráfico, identidad y contenidos"
            >Portafolio</BaseTitle
          >

          <BaseSection id="social-media" nested>
            <BaseTitle
              tag="h2"
              eyebrow="Portafolio · muestra"
              subtitle="Publicaciones desarrolladas para distintas marcas, adaptadas a cada estrategia de contenido y canal."
              >Redes sociales</BaseTitle
            >
            <div class="portfolio-stack">
              <div
                v-for="(panel, index) in portfolioPanels"
                :key="panel.id"
                v-reveal="index % 2 === 0 ? 'fade-left' : 'fade-right'"
                class="portfolio-panel"
              >
                <div class="portfolio-panel__header">
                  <h3>{{ panel.title }}</h3>
                  <p>{{ panel.description }}</p>
                  <span
                    v-if="panel.images.length"
                    class="portfolio-panel__count"
                    >{{ panel.images.length }} publicaciones</span
                  >
                </div>

                <div v-if="panel.images.length" class="portfolio-carousel">
                  <BaseCarousel
                    :images="panel.images"
                    :direction="panel.direction"
                    :autoplay-delay="4500"
                    :label="panel.title"
                    controls
                  />
                </div>

                <div v-else class="portfolio-carousel portfolio-carousel--empty">
                  <p>
                    Añade imágenes en la carpeta de {{ panel.folder }} para ver
                    el carrusel.
                  </p>
                </div>
              </div>
            </div>
          </BaseSection>

          <BaseSection id="branding" nested>
            <BaseTitle
              tag="h2"
              eyebrow="Portafolio"
              subtitle="Elementos corporativos desarrollados para fortalecer la identidad visual de diferentes marcas, incluyendo papelería, identificaciones y piezas institucionales."
              >Branding</BaseTitle
            >
            <div class="branding-grid">
              <img
                v-reveal="'fade-left'"
                :src="brandingImages[0]"
                alt="Pieza de branding"
                class="branding-image branding-image--vertical"
              />

              <img
                v-reveal="{ effect: 'fade-right', delay: 120 }"
                :src="brandingImages[1]"
                alt="Pieza de branding"
                class="branding-image branding-image--horizontal"
              />

              <img
                v-reveal="{ effect: 'fade-right', delay: 240 }"
                :src="brandingImages[2]"
                alt="Pieza de branding"
                class="branding-image branding-image--vertical"
              />
            </div>
          </BaseSection>

          <BaseSection id="qrs" nested>
            <BaseTitle
              tag="h2"
              eyebrow="Portafolio"
              subtitle="Códigos QR diseñados como herramientas de interacción que conectan materiales impresos con contenido digital, facilitando el acceso a menús, catálogos y recursos adicionales."
            >
              QR Interactivos
            </BaseTitle>
            <div v-reveal="'fade-up'">
              <div
                ref="qrGridRef"
                class="qr-grid"
                @load.capture="syncQrHeight"
              >
                <div
                  v-for="(qr, index) in portfolioQrs"
                  :key="qr.image"
                  class="qr-grid__cell"
                  :class="{
                    'is-hidden': !qrExpanded && index >= visibleQrCount,
                  }"
                  :style="{
                    order: index < visibleQrCount ? 0 : 2,
                    '--i': Math.max(index - visibleQrCount, 0),
                  }"
                  :aria-hidden="!qrExpanded && index >= visibleQrCount"
                >
                  <BaseQrCard
                    :image="qr.image"
                    :title="qr.title"
                    :description="qr.description"
                    :href="qr.href"
                  />
                </div>

                <div
                  v-if="portfolioQrs.length > visibleQrCount"
                  ref="qrToggleRef"
                  class="qr-grid__toggle"
                  :style="{ order: qrExpanded ? 3 : 1 }"
                >
                  <BaseQrCard
                    view-more
                    :title="qrExpanded ? 'Ver menos' : 'Ver más'"
                    :aria-expanded="qrExpanded"
                    @click="toggleQrs"
                  />
                </div>
              </div>
            </div>
          </BaseSection>

          <BaseSection id="advertising" nested>
            <BaseTitle
              tag="h2"
              eyebrow="Portafolio"
              subtitle="Material gráfico diseñado para campañas promocionales, comunicación comercial y difusión de productos o servicios mediante flyers y piezas publicitarias."
            >
              Publicidad
            </BaseTitle>
            <BaseExpandableGallery
              :total-items="advertisingImages.length"
              collapsed-height="500px"
            >
              <div
                v-reveal="{ effect: 'fade-up', stagger: 60 }"
                class="advertising-grid"
              >
                <AdvertisingCard
                  v-for="image in advertisingImages"
                  :key="image"
                  :image="image"
                />
              </div>
            </BaseExpandableGallery>
          </BaseSection>

          <BaseSection id="menus" nested>
            <BaseTitle
              tag="h2"
              eyebrow="Portafolio"
              subtitle="Diseño de menús digitales y físicos adaptados para dispositivos móviles e impresión, priorizando la organización de la información y una experiencia visual clara para el usuario."
            >
              Menús
            </BaseTitle>

            <!-- Menús digitales -->
            <div class="menus-section">
              <h3 class="menus-section__title">Menús Digitales</h3>
              <p class="menus-section__description">
                Diseños optimizados para visualizarse desde teléfonos móviles
                mediante códigos QR.
              </p>

              <div
                class="menus-carousel"
                :class="{
                  'is-at-start': menusArrived.left,
                  'is-at-end': menusArrived.right,
                }"
              >
                <button
                  type="button"
                  class="menus-carousel__arrow menus-carousel__arrow--prev"
                  aria-label="Menús anteriores"
                  :disabled="menusArrived.left"
                  @click="scrollMenus(-1)"
                >
                  <ChevronLeft :size="22" :stroke-width="2.25" aria-hidden="true" />
                </button>

                <div
                  ref="menusGalleryRef"
                  v-reveal="{ effect: 'fade-left', stagger: 70 }"
                  class="menus-gallery"
                  @load.capture="measureMenus"
                >
                  <MenuCard
                    v-for="digitalImage in digitalMenuImages"
                    :key="digitalImage"
                    :image="digitalImage"
                    :images="digitalMenuImages"
                    variant="mobile"
                  />
                </div>

                <button
                  type="button"
                  class="menus-carousel__arrow menus-carousel__arrow--next"
                  aria-label="Menús siguientes"
                  :disabled="menusArrived.right"
                  @click="scrollMenus(1)"
                >
                  <ChevronRight :size="22" :stroke-width="2.25" aria-hidden="true" />
                </button>
              </div>
            </div>

            <!-- Menús físicos -->
            <div class="menus-section">
              <h3 class="menus-section__title">Menús Impresos</h3>
              <p class="menus-section__description">
                Propuestas pensadas para impresión en distintos formatos,
                manteniendo la identidad visual y la organización del contenido.
              </p>

              <div
                v-reveal="{ effect: 'fade-up', stagger: 100 }"
                class="menus-grid"
              >
                <MenuCard
                  v-for="physicalImage in physicalMenuImages"
                  :key="physicalImage"
                  :image="physicalImage"
                  :images="physicalMenuImages"
                  variant="desktop"
                />
              </div>
            </div>
          </BaseSection>

          <BaseSection id="photos" nested>
            <BaseTitle
              tag="h2"
              eyebrow="Portafolio"
              subtitle="Registro fotográfico orientado a moda, productos y contenido comercial como complemento para campañas publicitarias e identidad visual."
            >
              Fotografía
            </BaseTitle>

            <BaseExpandableGallery
              :total-items="photographyImages.length"
              collapsed-height="550px"
            >
              <div
                v-reveal="{ effect: 'fade-up', stagger: 60 }"
                class="photo-grid"
              >
                <PhotoCard
                  v-for="photographyImage in photographyImages"
                  :key="photographyImage"
                  :image="photographyImage"
                />
              </div>
            </BaseExpandableGallery>
          </BaseSection>

          <BaseSection id="editorial" nested>
            <BaseTitle
              tag="h2"
              eyebrow="Portafolio"
              subtitle="Proyectos editoriales desarrollados para distintos formatos de comunicación visual."
            >
              Editorial
            </BaseTitle>
            <BaseEditorialViewer
              v-reveal="{ effect: 'fade-up', stagger: 150 }"
              :documents="editorialDocuments"
            />
          </BaseSection>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="experience">
        <BaseContainer>
          <BaseTitle
            tag="h2"
            eyebrow="Trayectoria"
            subtitle="Un recorrido por los proyectos y experiencias profesionales que han fortalecido mi enfoque creativo y mi desarrollo como diseñadora gráfica."
          >
            Experiencia
          </BaseTitle>

          <BaseTimeline :items="experienceEntries" />
        </BaseContainer>
      </BaseSection>

      <BaseSection id="tools">
        <BaseContainer>
          <BaseTitle tag="h2" eyebrow="Software">Herramientas</BaseTitle>
          <div v-reveal="{ effect: 'pop', stagger: 70 }" class="tool-list">
            <span v-for="tool in tools" :key="tool.name" class="tool-pill">
              <img :src="tool.src" :alt="tool.name" class="tool-pill__logo" />
            </span>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="contact">
        <BaseContainer>
          <BaseTitle tag="h2" eyebrow="Canales directos">Contacto</BaseTitle>
          <div v-reveal="{ effect: 'blur', stagger: 120 }" class="contact-grid">
            <a
              v-for="link in contactLinks"
              :key="link.label"
              class="contact-card"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>{{ link.label }}</strong>
              <span>{{
                link.type === "email" ? "Correo directo" : "Perfil profesional"
              }}</span>
            </a>
          </div>
        </BaseContainer>
      </BaseSection>
    </main>

    <footer class="footer">
      <BaseContainer>
        <div v-reveal="'blur'" class="footer__content">
          <span class="footer__line" aria-hidden="true" />
          <p>
            © {{ currentYear }} María Santiago. Diseño editorial y branding.
          </p>
          <span class="footer__tagline">Diseño con propósito</span>
        </div>
      </BaseContainer>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.site-shell {
  position: relative;
  overflow-x: clip;
  background: $color-bg;
}

/* ================================
   HERO
================================ */

.hero-section {
  padding-block: clamp(48px, 8vw, 88px) clamp(56px, 6vw, 80px);
  min-height: auto;
}

.hero {
  position: relative;
  display: grid;
  gap: clamp(32px, 5vw, 64px);
  align-items: center;

  @include breakpoint(lg) {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.hero__blob {
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  pointer-events: none;

  &--a {
    top: -60px;
    right: -90px;
    width: 420px;
    height: 420px;
    background: radial-gradient(circle at 30% 30%, $color-primary, transparent 70%);
    opacity: 0.55;
    animation: floatBlobA 9s ease-in-out infinite;

    @media (max-width: 600px) {
      right: -110px;
      width: 260px;
      height: 260px;
    }
  }

  &--b {
    bottom: -50px;
    left: -70px;
    width: 260px;
    height: 260px;
    background: $color-accent-soft;
    opacity: 0.9;
    animation: floatBlobB 11s ease-in-out infinite;

    @media (max-width: 600px) {
      width: 160px;
      height: 160px;
    }
  }
}

.hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.hero__title {
  margin: 0;
}

.hero__title-accent {
  font-style: italic;
  color: $color-accent;
}

.hero__lead {
  max-width: 560px;
  font-size: clamp(1rem, 1vw + 0.85rem, 1.15rem);
  line-height: 1.8;
  color: $color-text-lead;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: $space-4;
  margin-top: 6px;

  @media (max-width: 480px) {
    flex-direction: column;

    :deep(.btn) {
      width: 100%;
    }
  }
}

.hero__media {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  margin-inline: auto;
}

$hero-shape: 48% 52% 55% 45% / 45% 55% 45% 55%;

.hero__photo-backdrop {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 100%;
  height: 100%;
  border-radius: $hero-shape;
  background: $color-primary;
}

.hero__photo {
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: $hero-shape;
  box-shadow: $shadow-large;
  transition: transform 0.5s $ease-out;

  @media (hover: hover) {
    &:hover {
      transform: rotate(-1.5deg) scale(1.02);
    }
  }
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__bubble {
  position: absolute;
  top: -18px;
  right: 6%;
  z-index: 2;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(252, 185, 192, 0.7);
  animation: floatSlow 6s ease-in-out infinite;
}

/* ================================
   SOBRE MÍ
================================ */

.split-grid {
  display: grid;
  gap: $space-8;

  @include breakpoint(lg) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
}

.about__title {
  align-items: flex-start;
  text-align: left;
  margin: 0 0 $space-4;
}

.section-copy {
  font-size: 1rem;
  line-height: 1.8;
  color: $color-text-secondary;
}

.stats-card,
.contact-card {
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-card;
  box-shadow: $shadow-small;
  padding: 28px;
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $space-6;

  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
}

.stat-pill {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-pill__value {
  font-family: $font-heading;
  font-size: clamp(1.5rem, 2vw + 1rem, 2.1rem);
  line-height: 1.1;
  color: $color-accent;
}

.stat-pill__label {
  font-size: 13px;
  color: $color-text-secondary;
}

/* ================================
   SERVICIOS / DESTACADOS
================================ */

.card-grid {
  display: grid;
  gap: clamp(20px, 3vw, 28px);

  @include breakpoint(md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include breakpoint(lg) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.service-card :deep(.card__body)::before {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  margin-bottom: 14px;
  border-radius: 50%;
  background: $color-primary;
  transition:
    scale 0.4s $ease-out,
    background 0.4s ease;
}

@media (hover: hover) {
  .service-card:hover :deep(.card__body)::before {
    scale: 1.4;
    background: $color-accent;
  }

  .service-card:hover :deep(.card__title) {
    color: $color-accent;
  }
}

.service-card :deep(.card__title) {
  transition: color 0.3s ease;
}

.featured-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: $radius-featured;

  &:has(.featured-card__link:focus-visible) {
    outline: 2px solid $color-accent;
    outline-offset: 4px;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-14px);
      box-shadow: 0 26px 46px rgba(27, 27, 27, 0.14);
    }

    &:hover :deep(.card__image) {
      transform: scale(1.06);
    }
  }

  &.card :deep(.card__image) {
    height: 200px;
    aspect-ratio: auto;
    background: linear-gradient(135deg, #fff5f6, #ffe4e8);
    transition: transform 0.4s ease;
  }

  :deep(.card__title) {
    font-size: 20px;
  }
}

.featured-card__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: $space-4;
  color: $color-accent;
  font-weight: 600;
  font-size: 13px;
  outline: none;

  /* Toda la tarjeta es clicable */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  @media (hover: hover) {
    .featured-card:hover & {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
}

/* ================================
   REDES SOCIALES
================================ */

.portfolio-stack {
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 5vw, 56px);
}

.portfolio-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(28px, 4vw, 48px);
  align-items: center;
  padding: clamp(24px, 3vw, 40px);
  background: $color-surface;
  border: 1px solid rgba(252, 185, 192, 0.3);
  border-radius: $radius-panel;
  box-shadow: 0 16px 40px rgba(27, 27, 27, 0.06);

  &:nth-child(even) .portfolio-panel__header {
    order: 2;
  }

  h3 {
    margin: 0;
  }
}

.portfolio-panel__header {
  display: flex;
  flex-direction: column;
  gap: 14px;

  p {
    font-size: 15px;
    line-height: 1.8;
  }
}

.portfolio-panel__count {
  display: inline-block;
  width: fit-content;
  padding: 6px 14px;
  border-radius: $radius-pill;
  background: $color-accent-soft;
  color: $color-accent;
  font-size: 12px;
  font-weight: 600;
}

.portfolio-carousel {
  width: 100%;
  max-width: 460px;
  margin-inline: auto;
}

.portfolio-carousel--empty {
  padding: $space-6;
  border: 1px dashed $color-primary;
  border-radius: $radius-card;
  background: repeating-linear-gradient(
    45deg,
    $color-accent-soft 0 10px,
    $color-stripe 10px 20px
  );
  color: $color-accent;
  text-align: center;
}

/* ================================
   BRANDING
================================ */

.branding-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-auto-rows: 220px;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 240px;
  }
}

.branding-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: $color-surface;
  border: 1px solid rgba(252, 185, 192, 0.3);
  border-radius: $radius-image;
  padding: 18px;
  box-shadow: 0 12px 28px rgba(27, 27, 27, 0.08);
  transition: transform 0.4s $ease-out;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-8px);
    }
  }
}

@media (min-width: 601px) {
  .branding-image--vertical:first-child {
    grid-row: 1 / 3;
  }

  .branding-image--horizontal {
    grid-column: 2;
    grid-row: 1;
  }

  .branding-image--vertical:last-child {
    grid-column: 2;
    grid-row: 2;
  }
}

/* ================================
   QR
================================ */

.qr-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
  /* espacio para el hover y la sombra de las cards sin que overflow las recorte */
  padding: 20px;
  margin: -20px;
  overflow: hidden;
  /* duración y curva las fija useCollapsible */
  transition-property: height;
}

/* Opción "Ver más/Ver menos": al final de la lista, misma altura que su fila */
.qr-grid__toggle {
  position: relative;
  z-index: 1;
  display: flex;
  align-self: stretch;
  min-width: 0;

  > .qr-card {
    flex: 1;
  }
}

.qr-grid__cell {
  min-width: 0;
  transition:
    opacity 0.65s ease,
    translate 0.65s $ease-out,
    scale 0.65s $ease-out,
    visibility 0s;
  transition-delay: calc(var(--i, 0) * 90ms);

  &.is-hidden {
    opacity: 0;
    translate: 0 20px;
    scale: 0.96;
    visibility: hidden;
    pointer-events: none;
    transition-duration: 0.35s, 0.35s, 0.35s, 0s;
    transition-delay: 0s, 0s, 0s, 0.35s;
  }
}

@media (max-width: 1200px) {
  .qr-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .qr-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .qr-grid {
    grid-template-columns: 1fr;
  }
}

/* ================================
   PUBLICIDAD
================================ */

.advertising-grid {
  columns: 3 300px;
  column-gap: 20px;
}

@media (max-width: 1200px) {
  .advertising-grid {
    columns: 2 260px;
  }
}

@media (max-width: 700px) {
  .advertising-grid {
    columns: 1;
  }
}

/* ================================
   MENÚS
================================ */

.menus-section {
  margin-top: 36px;
}

.menus-section:first-of-type {
  margin-top: 0;
}

.menus-section__title {
  font-size: 20px;
  margin-bottom: 6px;
}

.menus-section__description {
  font-size: $text-small;
  margin-bottom: 20px;
  color: $color-text-secondary;
}

/* galeria horizontal (menus digitales) */
.menus-carousel {
  position: relative;

  /* desvanecido en los bordes para indicar que hay más contenido */
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 12px;
    z-index: 1;
    width: 48px;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, $color-bg, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(-90deg, $color-bg, transparent);
  }

  &.is-at-start::before,
  &.is-at-end::after {
    opacity: 0;
  }
}

.menus-carousel__arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(252, 185, 192, 0.5);
  color: $color-text-primary;
  box-shadow: 0 6px 16px rgba(27, 27, 27, 0.15);
  translate: 0 -50%;
  transition:
    scale 0.25s ease,
    opacity 0.25s ease,
    background 0.25s ease;
  @include focus-ring;

  &--prev {
    left: -8px;
  }

  &--next {
    right: -8px;
  }

  &:disabled {
    opacity: 0;
    pointer-events: none;
  }

  @media (hover: hover) {
    &:hover {
      background: #ffffff;
      scale: 1.1;
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
}

.menus-gallery {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 4px 4px 12px;
  scroll-snap-type: x proximity;
  scrollbar-color: $color-primary transparent;
  scroll-behavior: smooth;
}

.menus-gallery > * {
  scroll-snap-align: start;
}

/* grid (menus fisicos) */
.menus-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 24px;
}

/* ================================
   FOTOGRAFÍA
================================ */

.photo-grid {
  columns: 4 260px;
  column-gap: 20px;
}

@media (max-width: 1200px) {
  .photo-grid {
    columns: 3 240px;
  }
}

@media (max-width: 900px) {
  .photo-grid {
    columns: 2 220px;
  }
}

@media (max-width: 600px) {
  .photo-grid {
    columns: 1;
  }
}

/* ================================
   HERRAMIENTAS
================================ */

.tool-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.tool-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $space-4 28px;
  border-radius: $radius-pill;
  background: $color-surface;
  border: 1px solid rgba(252, 185, 192, 0.3);
  box-shadow: 0 8px 20px rgba(27, 27, 27, 0.06);
  transition: transform 0.3s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-6px);
    }
  }
}

.tool-pill__logo {
  height: 34px;
  width: auto;
  object-fit: contain;
}

/* ================================
   CONTACTO
================================ */

.contact-grid {
  display: grid;
  gap: 20px;
  max-width: 640px;
  margin-inline: auto;

  @include breakpoint(md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: $space-6;
  border-radius: $radius-image;
  color: $color-text-primary;
  text-decoration: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  @include focus-ring;

  strong {
    font-family: $font-heading;
    font-size: 17px;
  }

  span {
    font-size: 13px;
    font-weight: 600;
    color: $color-accent;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 18px 34px rgba(27, 27, 27, 0.13);
    }
  }
}

/* ================================
   FOOTER
================================ */

.footer {
  padding-block: clamp(48px, 7vw, 72px);
  background: $color-surface;
  border-top: none;
}

.footer__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-4;
  max-width: 640px;
  margin-inline: auto;
  text-align: center;

  p {
    font-size: 15px;
    line-height: 1.8;
    color: $color-text-secondary;
  }
}

.footer__line {
  width: 48px;
  height: 2px;
  border-radius: $radius-pill;
  background: $color-primary;
}

.footer__tagline {
  font-family: $font-heading;
  font-style: italic;
  font-size: $text-small;
  color: $color-accent;
}
</style>
