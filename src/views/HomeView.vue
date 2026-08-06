<script setup lang="ts">
import { computed } from "vue";
import { useScrollTo } from "@/composables/useScrollTo";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseSection from "@/components/ui/BaseSection.vue";
import BaseTitle from "@/components/ui/BaseTitle.vue";
import heroPhoto from "@/assets/hero.jpeg";
import BaseCarousel from "@/components/ui/BaseCarousel.vue";
import { navLinks } from "@/data/navigation";
import { profile, services, featuredProjects } from "@/data/profile";
import { contactLinks } from "@/data/contact";
import { experienceEntries } from "@/data/experience";
import { tools } from "@/data/tools";

const { scrollToSection } = useScrollTo();

type PortfolioPanel = {
  id: string;
  title: string;
  description: string;
  folder: string;
  images: string[];
};

const portfolioMedia = import.meta.glob(
  "../assets/portfolio/*/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const getImagesForFolder = (folder: string) =>
  Object.entries(portfolioMedia)
    .filter(([path]) => path.includes(`/${folder}/`))
    .map(([, src]) => src);

const portfolioPanels: PortfolioPanel[] = [
  {
    id: "social-media",
    title: "Redes sociales",
    description:
      "Contenido visual para marcas que necesitan consistencia, claridad y una presencia atractiva.",
    folder: "social-media",
    images: getImagesForFolder("social-media"),
  },
  {
    id: "branding",
    title: "Branding",
    description:
      "Identidad visual, papelería y piezas que traducen la personalidad de la marca.",
    folder: "branding",
    images: getImagesForFolder("branding"),
  },
  {
    id: "qrs",
    title: "QRs e interacción",
    description:
      "Materiales pensados para cerrar la experiencia de marca desde lo físico al digital.",
    folder: "qrs",
    images: getImagesForFolder("qrs"),
  },
  {
    id: "publicidad",
    title: "Publicidad y editorial",
    description:
      "Flyers, POP-UPS, menús y piezas editoriales de alto impacto visual.",
    folder: "publicidad",
    images: getImagesForFolder("publicidad"),
  },
];

const currentYear = computed(() => new Date().getFullYear());
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
                >Una práctica cercana, estratégica y visual</BaseTitle
              >
              <p class="section-copy">{{ profile.about }}</p>
            </div>
            <div class="stats-card">
              <div
                v-for="stat in profile.stats"
                :key="stat.label"
                class="stat-pill"
              >
                <strong>{{ stat.value }}</strong>
                <span>{{ stat.label }}</span>
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
          <BaseTitle tag="h2" subtitle="Proyectos recientes"
            >Destacados</BaseTitle
          >
          <div class="card-grid featured-grid">
            <BaseCard
              v-for="project in featuredProjects"
              :key="project.id"
              :image="project.image"
              :title="project.name"
              :text="project.summary"
            />
          </div>
          <div class="section-actions">
            <BaseButton
              variant="secondary"
              @click="scrollToSection('portfolio')"
              >Explorar portafolio</BaseButton
            >
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="portfolio">
        <BaseContainer>
          <BaseTitle tag="h2" subtitle="Diseño gráfico, identidad y contenidos"
            >Portafolio</BaseTitle
          >
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
                <BaseCarousel :images="panel.images" />
              </div>

              <div v-else class="portfolio-carousel portfolio-carousel--empty">
                <p>
                  Añade imágenes en la carpeta de {{ panel.folder }} para ver el
                  carrusel.
                </p>
              </div>
            </div>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="experience">
        <BaseContainer>
          <BaseTitle tag="h2" subtitle="Trayectoria profesional"
            >Experiencia</BaseTitle
          >
          <div class="timeline">
            <article
              v-for="entry in experienceEntries"
              :key="entry.title"
              class="timeline__item"
            >
              <span class="timeline__year">{{ entry.year }}</span>
              <div>
                <h3>{{ entry.title }}</h3>
                <p class="timeline__company">{{ entry.company }}</p>
                <p>{{ entry.description }}</p>
              </div>
            </article>
          </div>
        </BaseContainer>
      </BaseSection>

      <BaseSection id="tools">
        <BaseContainer>
          <BaseTitle tag="h2">Herramientas</BaseTitle>
          <div class="tool-list">
            <span v-for="tool in tools" :key="tool.name" class="tool-pill"
              ><img :width="100" :height="100" :src="tool.src" :alt="tool.name"
            /></span>
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
  min-height:90px;
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
</style>
