<script setup lang="ts">
import { computed } from "vue";
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
/* import BaseEditorialViewer from "@/components/base/BaseEditorialViewer.vue"; */
import MenuCard from "@/components/base/MenuCard.vue";
import { navLinks } from "@/data/navigation";
import { profile, services, featuredProjects } from "@/data/profile";
import { contactLinks } from "@/data/contact";
import { experienceEntries } from "@/data/experience";
import { tools } from "@/data/tools";
/* import { onMounted, onUnmounted, watch } from "vue"; */
/* import type { EditorialDocument } from "@/data/types"; */

/* import bookPdf from "@/assets/portfolio/editorial/El_rincon_del_conocimiento.pdf";
import thissaPdf from "@/assets/portfolio/editorial/Presentacion_Thissa_Store.pdf";
import catalogPdf from "@/assets/portfolio/editorial/Catalogo_don_josue.pdf"; */

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

/* type EditorialDocument = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  pdf: string;
  viewer: 'flipbook' | 'pdf';
} */

const portfolioMedia = import.meta.glob("../assets/portfolio/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

console.log(Object.keys(portfolioMedia));

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
        normalized.includes(folderPath) &&
        supportedExtensions.has(extension)
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

/* const editorialDocuments: EditorialDocument[] = [
  {
    id: "book",
    title: "El Rincón del Conocimiento",
    subtitle: "Libro educativo",
    description:
      "Proyecto editorial diagramado en formato horizontal para una experiencia de lectura inmersiva.",
    cover: "/src/assets/portfolio/editorial/cover_1.png",
    pdf: bookPdf,
    viewer: "flipbook",
  },

  {
    id: "thissa",
    title: "Presentación Thissa Store",
    subtitle: "Presentación corporativa",
    description:
      "Presentación desarrollada para comunicar la identidad y propuesta de valor de la marca.",
    cover: "/src/assets/portfolio/editorial/cover_2.png",
    pdf: thissaPdf,
    viewer: "pdf",
  },

  {
    id: "don-josue",
    title: "Catálogo de Productos Don Josué",
    subtitle: "Catálogo comercial",
    description:
      "Catálogo diseñado para exhibir productos mediante una estructura clara y atractiva.",
    cover: "/src/assets/portfolio/editorial/cover_3.png",
    pdf: catalogPdf,
    viewer: "flipbook",
  },
]; */

const currentYear = computed(() => new Date().getFullYear());
const brandingImages = getImagesForFolder("branding");
const advertisingImages = getImagesForFolder("advertising");
const digitalMenuImages = getImagesForFolder("digital-menus");
const physicalMenuImages = getImagesForFolder("physical-menus");
const photographyImages = getImagesForFolder("photography");
console.log(photographyImages);
</script>

<template>
  <div class="site-shell">
    <header class="topbar">
      <BaseContainer>
        <nav class="topbar__nav" aria-label="Navegación principal">
          <a href="#hero" class="topbar__brand">María Santiago</a>
          <div class="topbar__links">
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              class="topbar__link"
            >
              {{ link.label }}
            </a>
          </div>
        </nav>
      </BaseContainer>
    </header>

    <main>
      <BaseSection id="hero" class="hero-section">
        <BaseContainer>
          <div class="hero">
            <div class="hero__content">
              <BaseBadge
                label="Diseño editorial y branding"
                :value="profile.specialty"
              />
              <BaseTitle tag="h1" class="hero__title">{{
                profile.name
              }}</BaseTitle>
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
            <div class="hero__media">
              <img :src="heroPhoto" :alt="profile.name" class="hero__image" />
            </div>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="about">
        <BaseContainer>
          <div class="split-grid">
            <div>
              <BaseTitle tag="h2" subtitle="Sobre mí"
                >Diseño con propósito, estrategia y creatividad.</BaseTitle
              >
              <p class="section-copy">{{ profile.about }}</p>
            </div>
            <div class="stats-card">
              <div
                v-for="stat in profile.stats"
                :key="stat.label"
                class="stat-pill"
              >
                <strong>{{ stat.value }} {{ stat.label }}</strong>
              </div>
            </div>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="services">
        <BaseContainer>
          <BaseTitle tag="h2">Servicios</BaseTitle>
          <div class="card-grid">
            <BaseCard
              v-for="service in services"
              :key="service.id"
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
            subtitle="Una selección de proyectos que reúnen diferentes áreas del diseño gráfico, donde cada propuesta fue desarrollada de acuerdo con las necesidades y objetivos de cada cliente."
            >Destacados</BaseTitle
          >
          <div class="card-grid featured-grid">
            <BaseCard
              v-for="project in featuredProjects"
              :key="project.image"
              :image="project.image"
              :title="project.name"
              :text="project.summary"
            />
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="portfolio">
        <BaseContainer>
          <BaseTitle tag="h2" subtitle="Diseño gráfico, identidad y contenidos"
            >Portafolio</BaseTitle
          >
          <div>
            <BaseSection id="social-media">
              <BaseContainer>
                <BaseTitle tag="h2">Redes sociales</BaseTitle>
                <div class="portfolio-stack">
                  <div
                    v-for="panel in portfolioPanels"
                    :key="panel.id"
                    class="portfolio-panel"
                  >
                    <div class="portfolio-panel__header">
                      <h3>{{ panel.title }}</h3>
                      <p>{{ panel.description }}</p>
                    </div>

                    <div v-if="panel.images.length" class="portfolio-carousel">
                      <BaseCarousel
                        :images="panel.images"
                        :direction="panel.direction"
                      />
                    </div>

                    <div
                      v-else
                      class="portfolio-carousel portfolio-carousel--empty"
                    >
                      <p>
                        Añade imágenes en la carpeta de {{ panel.folder }} para
                        ver el carrusel.
                      </p>
                    </div>
                  </div>
                </div>
              </BaseContainer>
            </BaseSection>
            <BaseSection id="branding">
              <BaseContainer>
                <BaseTitle tag="h2">BRANDING</BaseTitle>
                <div class="">
                  <div class="portfolio-panel">
                    <div class="portfolio-panel__header">
                      <p class="branding-description">
                        Elementos corporativos desarrollados para fortalecer la
                        identidad visual de diferentes marcas, incluyendo
                        papelería, identificaciones y piezas institucionales.
                      </p>
                      <div class="branding-grid">
                        <img
                          :src="brandingImages[0]"
                          alt=""
                          class="branding-image branding-image--vertical"
                        />

                        <img
                          :src="brandingImages[1]"
                          alt=""
                          class="branding-image branding-image--horizontal"
                        />

                        <img
                          :src="brandingImages[2]"
                          alt=""
                          class="branding-image branding-image--vertical"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </BaseContainer>
            </BaseSection>

            <BaseSection id="qrs">
              <BaseContainer>
                <BaseTitle
                  tag="h2"
                  subtitle="Códigos QR diseñados como herramientas de interacción que conectan materiales impresos con contenido digital, facilitando el acceso a menús, catálogos y recursos adicionales."
                >
                  QR Interactivos
                </BaseTitle>
                <div class="qr-grid">
                  <BaseQrCard
                    v-for="qr in portfolioQrs"
                    :key="qr.image"
                    :image="qr.image"
                    :title="qr.title"
                    :description="qr.description"
                    :href="qr.href"
                  />
                </div>
              </BaseContainer>
            </BaseSection>

            <BaseSection id="advertising">
              <BaseContainer>
                <BaseTitle
                  tag="h2"
                  subtitle="Material gráfico diseñado para campañas promocionales, comunicación comercial y difusión de productos o servicios mediante flyers y piezas publicitarias."
                >
                  Publicidad
                </BaseTitle>
                <div class="advertising-grid">
                  <AdvertisingCard
                    v-for="image in advertisingImages"
                    :key="image"
                    :image="image"
                  />
                </div>
              </BaseContainer>
            </BaseSection>

            <BaseSection id="menus">
              <BaseContainer>
                <BaseTitle
                  tag="h2"
                  subtitle="Diseño de menús digitales y físicos adaptados para dispositivos móviles e impresión, priorizando la organización de la información y una experiencia visual clara para el usuario."
                >
                  Menús
                </BaseTitle>

                <!-- Menús digitales -->
                <div class="menus-section">
                  <h3 class="menus-section__title">Menús Digitales</h3>
                  <p class="menus-section__description">
                    Diseños optimizados para visualizarse desde teléfonos
                    móviles mediante códigos QR.
                  </p>

                  <div class="menus-gallery">
                    <MenuCard
                      v-for="digitalImage in digitalMenuImages"
                      :key="digitalImage"
                      :image="digitalImage"
                      variant="mobile"
                    />
                  </div>
                </div>

                <!-- Menús físicos -->
                <div class="menus-section">
                  <h3 class="menus-section__title">Menús Impresos</h3>
                  <p class="menus-section__description">
                    Propuestas pensadas para impresión en distintos formatos,
                    manteniendo la identidad visual y la organización del
                    contenido.
                  </p>

                  <div class="menus-grid">
                    <MenuCard
                      v-for="physicalImage in physicalMenuImages"
                      :key="physicalImage"
                      :image="physicalImage"
                      variant="desktop"
                    />
                  </div>
                </div>
              </BaseContainer>
            </BaseSection>

            <BaseSection id="photos">
              <BaseContainer>
                <BaseTitle
                  tag="h2"
                  subtitle="Registro fotográfico orientado a moda, productos y contenido comercial como complemento para campañas publicitarias e identidad visual."
                >
                  Fotografía
                </BaseTitle>

                <div class="photo-grid">
                  <PhotoCard
                    v-for="photographyImage in photographyImages"
                    :key="photographyImage"
                    :image="photographyImage"
                  />
                </div>
              </BaseContainer>
            </BaseSection>

            <BaseSection id="editorial">
              <BaseContainer>
                <h2>Contruyendo seccion de editorial...</h2>
                <!-- <BaseTitle
                  tag="h2"
                  subtitle="Proyectos editoriales desarrollados para distintos formatos de comunicación visual."
                >
                  Editorial
                </BaseTitle>
                <div>
                  <p>building...</p>
                </div>
                 <div>

                  <BaseEditorialViewer :documents="editorialDocuments" />
                </div> -->
              </BaseContainer>
            </BaseSection>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="experience">
        <BaseContainer>
          <BaseTitle
            tag="h2"
            subtitle="Un recorrido por los proyectos y experiencias profesionales que han fortalecido mi enfoque creativo y mi desarrollo como diseñadora gráfica."
          >
            Experiencia
          </BaseTitle>

          <BaseTimeline :items="experienceEntries" />
        </BaseContainer>
      </BaseSection>

      <BaseSection id="tools">
        <BaseContainer>
          <BaseTitle tag="h2">Herramientas</BaseTitle>
          <div class="tool-list">
            <span v-for="tool in tools" :key="tool.name" class="tool-pill">
              <img
                :width="100"
                :height="100"
                :src="tool.src"
                :alt="tool.name"
              />
            </span>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="contact">
        <BaseContainer>
          <BaseTitle tag="h2" subtitle="Canales directos">Contacto</BaseTitle>
          <div class="contact-grid">
            <a
              v-for="link in contactLinks"
              :key="link.label"
              class="contact-card"
              :href="link.href"
              target="_blank"
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
        <div class="footer__content">
          <p>
            © {{ currentYear }} María Santiago. Diseño editorial y branding.
          </p>
        </div>
      </BaseContainer>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.hero-section {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}

.site-shell {
  background: linear-gradient(180deg, #fff 0%, #fafafa 100%);
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(10px);
  background: rgba(250, 250, 250, 0.9);
  border-bottom: 1px solid $color-border;
}

.topbar__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: $space-4;
}

.topbar__brand {
  font-family: $font-heading;
  font-size: 1.25rem;
  font-weight: 700;
  color: $color-text-primary;
  text-decoration: none;
}

.topbar__links {
  display: flex;
  gap: $space-4;
  flex-wrap: wrap;
}

.topbar__link {
  color: $color-text-secondary;
  text-decoration: none;
  font-size: $text-small;
}

.hero {
  display: grid;
  gap: $space-12;
  align-items: center;

  @include breakpoint(lg) {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.hero__content {
  display: grid;
  gap: $space-4;
}

.hero__title {
  margin: 0;
}

.hero__lead {
  max-width: 680px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: $color-text-secondary;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
}

.hero__media {
  display: flex;
  justify-content: center;
}

.hero__image {
  width: min(100%, 420px);
  border-radius: $radius-image;
  box-shadow: $shadow-large;
}

.split-grid {
  display: grid;
  gap: $space-8;

  @include breakpoint(lg) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
  }
}

.branding-description {
  max-width: 700px;
  margin: 0 0 2rem;
}

.branding-grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  grid-template-rows: repeat(2, 18rem);
  gap: 1.5rem;
}

.branding-image {
  width: 100%;
  height: 100%;

  object-fit: contain;

  background: #fff;
  border-radius: 16px;
  padding: 1rem;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

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

.section-copy {
  font-size: 1rem;
  line-height: 1.8;
  color: $color-text-secondary;
}

.stats-card,
.portfolio-panel,
.contact-card {
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-card;
  box-shadow: $shadow-small;
  padding: $space-6;
}

.stats-card {
  display: grid;
  gap: $space-4;
}

.stat-pill {
  display: flex;
  flex-direction: column;
  gap: $space-1;
}

.card-grid {
  display: grid;
  gap: $space-6;

  @include breakpoint(md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include breakpoint(lg) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.featured-grid {
  margin-top: $space-6;
}

.section-actions {
  margin-top: $space-6;
}

.portfolio-stack {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .portfolio-stack {
    grid-template-columns: 1fr;
  }
}

.portfolio-panel {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.portfolio-panel__header {
  min-height: 90px;
  gap: $space-2;
}

.portfolio-carousel {
  display: grid;
  gap: $space-3;
}

.portfolio-carousel__frame {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  max-height: 360px;
  overflow: hidden;
  border-radius: $radius-card;
  border: 1px solid $color-border;
  background: linear-gradient(135deg, #f9f9f9 0%, #f2f2f2 100%);
}

.portfolio-carousel__image {
  width: 100%;
  height: 100%;
  max-height: 360px;
  object-fit: contain;
  display: block;
  background: transparent;
}

.portfolio-carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-3;
}

.portfolio-carousel__button {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid $color-border;
  border-radius: 999px;
  background: $color-surface;
  color: $color-text-primary;
  cursor: pointer;
}

.portfolio-carousel__counter {
  font-size: $text-small;
  color: $color-text-secondary;
}

.portfolio-carousel--empty {
  padding: $space-6;
  border: 1px dashed $color-border;
  border-radius: $radius-card;
  background: $color-surface;
  color: $color-text-secondary;
  text-align: center;
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  align-items: stretch;
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

.portfolio-panel h3,
.timeline__item h3 {
  font-family: $font-heading;
  margin-bottom: $space-2;
}

.timeline {
  display: grid;
  gap: $space-4;
}

.timeline__item {
  display: grid;
  gap: $space-2;
  padding: $space-6;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-card;
}

.timeline__year {
  display: inline-block;
  font-weight: 700;
  color: $color-accent;
}

.timeline__company {
  color: $color-text-secondary;
  margin-bottom: $space-2;
}

.tool-list {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
}

.tool-pill {
  padding: $space-3 $space-4;
  border-radius: $radius-button;
  background: $color-surface;
  border: 1px solid $color-border;
  color: $color-text-primary;
}

.contact-grid {
  display: grid;
  gap: $space-4;

  @include breakpoint(md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  color: $color-text-primary;
  text-decoration: none;
}

.footer {
  padding-bottom: $space-12;
}

.footer__content {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  color: $color-text-secondary;
}

/* seccion para publicidad */
.advertising-grid {
  columns: 3 320px;

  column-gap: 1.5rem;
}

.advertising-card {
  width: 100%;

  margin-bottom: 1.5rem;

  break-inside: avoid;
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

/* seccion para menus */

.menus-section {
  margin-top: 3rem;
}

.menus-section:first-of-type {
  margin-top: 0;
}

.menus-section__title {
  margin-bottom: 0.5rem;
}

.menus-section__description {
  margin-bottom: 1.5rem;

  color: var(--text-secondary);
}

/* galeria horizontal (menus digitales) */
.menus-gallery {
  display: flex;

  gap: 1.5rem;

  overflow-x: auto;

  padding: 0.5rem 0.25rem 1rem;

  scroll-snap-type: x proximity;
}

.menus-gallery > * {
  scroll-snap-align: start;
}

/* grid (menus fisicos) */

.menus-grid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

  gap: 2rem;
}

/* seccion de fotos */

.photo-grid {
  columns: 4 280px;

  column-gap: 1.5rem;
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
</style>
