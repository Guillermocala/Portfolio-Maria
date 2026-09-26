<script setup lang="ts">
export interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
}

defineProps<{
  items: TimelineItem[]
}>()
</script>

<template>
  <section v-reveal="{ effect: 'fade-left', stagger: 140 }" class="timeline">
    <article
      v-for="item in items"
      :key="`${item.year}-${item.title}`"
      class="timeline__item"
    >
      <div class="timeline__dot" />

      <div class="timeline__content">
        <span class="timeline__year">
          {{ item.year }}
        </span>

        <h3>
          {{ item.title }}
        </h3>

        <p class="timeline__company">
          {{ item.company }}
        </p>

        <p>
          {{ item.description }}
        </p>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
.timeline {
  position: relative;
}

.timeline__dot {
  position: absolute;
  z-index: 2;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: $color-accent;
  border: 3px solid $color-surface;
  box-shadow: 0 0 0 2px $color-primary;
}

.timeline__content {
  background: $color-surface;
  border: 1px solid rgba(252, 185, 192, 0.3);
  border-radius: $radius-image;
  padding: 22px;
  box-shadow: 0 10px 24px rgba(27, 27, 27, 0.07);
  transition:
    transform 0.4s $ease-out,
    box-shadow 0.4s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-8px);
      box-shadow: $shadow-medium;
    }
  }

  p {
    font-size: 13px;
    line-height: 1.65;
  }
}

/* ===========================
   Desktop
=========================== */

@media (min-width: 992px) {
  .timeline {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
  }

  .timeline::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 6px;
    height: 2px;
    background: rgba(252, 185, 192, 0.5);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1.56s $ease-out;
  }

  .timeline:has(.is-revealed)::before {
    transform: scaleX(1);
  }

  .timeline__item {
    position: relative;
    padding-top: 24px;
  }

  .timeline__dot {
    top: 0;
    left: 0;
  }
}

/* ===========================
   Mobile
=========================== */

@media (max-width: 991px) {
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-left: 32px;
  }

  .timeline::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6px;
    width: 2px;
    background: rgba(252, 185, 192, 0.5);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 1.56s $ease-out;
  }

  .timeline:has(.is-revealed)::before {
    transform: scaleY(1);
  }

  .timeline__item {
    position: relative;
  }

  .timeline__dot {
    left: -32px;
    top: 22px;
  }
}

.timeline__year {
  display: inline-flex;
  font-family: $font-heading;
  font-size: 15px;
  font-weight: 700;
  color: $color-accent;
}

.timeline h3 {
  margin: 6px 0 2px;
  font-size: 17px;
}

.timeline .timeline__company {
  margin: 0 0 10px;
  font-weight: 600;
  color: $color-text-secondary;
}
</style>
