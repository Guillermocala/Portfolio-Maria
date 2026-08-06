<script setup lang="ts">
import { watch, ref } from "vue";
import emblaCarouselVue from "embla-carousel-vue";

type CarouselDirection = "left" | "right" | "up" | "down";

const props = withDefaults(
  defineProps<{
    images: string[];
    autoplayDelay?: number;
    direction?: CarouselDirection;
  }>(),
  {
    autoplayDelay: 3500,
    direction: "left",
  },
);

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  axis: props.direction === "up" || props.direction === "down" ? "y" : "x",
});

void emblaRef;

const timer = ref<ReturnType<typeof setInterval> | null>(null);

const scroll = () => {
  const api = emblaApi.value;
  if (!api) return;

  switch (props.direction) {
    case "left":
    case "down":
      api.scrollNext();
      break;

    case "right":
    case "up":
      api.scrollPrev();
      break;
  }
};

const stopAutoplay = () => {
  if (timer.value !== null) {
    clearInterval(timer.value);
    timer.value = null;
  }
};

const startAutoplay = () => {
  stopAutoplay();

  if (!emblaApi.value) return;

  timer.value = window.setInterval(scroll, props.autoplayDelay);
};

watch(
  emblaApi,
  (api) => {
    if (!api) return;

    startAutoplay();
  },
  { immediate: true },
);
</script>

<template>
  <div :class="['embla', `embla--${direction}`]" ref="emblaRef">
    <div class="embla__container">
      <div v-for="image in images" :key="image" class="embla__slide">
        <div class="embla__media">
          <img :src="image" :alt="image" class="embla__img" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.embla {
  overflow: hidden;
  width: 100%;
  height: 22rem;
}

.embla--down,
.embla--up {
  height: 22rem;
}

.embla--left,
.embla--right {
  height: 22rem;
}

.embla__container {
  display: flex;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
  min-height: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.embla--down .embla__slide,
.embla--up .embla__slide {
  flex: 0 0 100%;
  min-height: 0;
}

.embla__media {
  width: 100%;
  height: 22rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #f8f8f8;
  border-radius: 12px;
  overflow: hidden;
}

.embla__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
