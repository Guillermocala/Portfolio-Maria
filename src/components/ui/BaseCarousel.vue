<script setup lang="ts">
import { watch, ref, nextTick, onMounted, onUnmounted } from "vue";
import emblaCarouselVue from "embla-carousel-vue";
import { ChevronLeft, ChevronRight } from "@lucide/vue";

type CarouselDirection = "left" | "right" | "up" | "down";

const props = withDefaults(
  defineProps<{
    images: string[];
    autoplayDelay?: number;
    direction?: CarouselDirection;
    controls?: boolean;
    label?: string;
  }>(),
  {
    autoplayDelay: 3500,
    direction: "left",
    controls: false,
    label: "",
  },
);

const options = {
  loop: true,
  axis:
    props.direction === "up" || props.direction === "down"
      ? "y"
      : "x",
} as const;

const [emblaRef, emblaApi] = emblaCarouselVue(options);
const timer = ref<ReturnType<typeof setInterval> | null>(null);
const selectedIndex = ref(0);
const isPaused = ref(false);
void emblaRef;

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

const reInit = async () => {
  await nextTick();

  emblaApi.value?.reInit();
};

const stopAutoplay = () => {
  if (timer.value !== null) {
    clearInterval(timer.value);
    timer.value = null;
  }
};

const startAutoplay = () => {
  stopAutoplay();

  if (!emblaApi.value || isPaused.value) return;

  timer.value = window.setInterval(scroll, props.autoplayDelay);
};

const pause = () => {
  isPaused.value = true;
  stopAutoplay();
};

const resume = () => {
  isPaused.value = false;
  startAutoplay();
};

const goTo = (index: number) => {
  emblaApi.value?.scrollTo(index);
  if (!isPaused.value) startAutoplay();
};

const goPrev = () => {
  emblaApi.value?.scrollPrev();
  if (!isPaused.value) startAutoplay();
};

const goNext = () => {
  emblaApi.value?.scrollNext();
  if (!isPaused.value) startAutoplay();
};

const syncSelected = () => {
  selectedIndex.value = emblaApi.value?.selectedScrollSnap() ?? 0;
};

const handleResize = () => {
  emblaApi.value?.reInit();
};

onMounted(async () => {
  window.addEventListener("resize", handleResize);

  await nextTick();

  requestAnimationFrame(() => {
    emblaApi.value?.reInit();
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  stopAutoplay();
});

watch(
  emblaApi,
  async (api) => {
    if (!api) return;

    await reInit();

    api.on("select", syncSelected);
    api.on("reInit", syncSelected);
    syncSelected();

    startAutoplay();
  },
  {
    immediate: true,
  },
);

watch(
  () => props.images,
  async () => {
    await reInit();
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<template>
  <div
    class="carousel"
    :class="{ 'carousel--controls': controls }"
    @mouseenter="controls && pause()"
    @mouseleave="controls && resume()"
    @focusin="controls && pause()"
    @focusout="controls && resume()"
  >
    <div class="carousel__frame">
      <div :class="['embla', `embla--${direction}`]" ref="emblaRef">
        <div class="embla__container">
          <div v-for="image in images" :key="image" class="embla__slide">
            <div class="embla__media">
              <img
                :src="image"
                :alt="label || image"
                class="embla__img"
                @load="handleResize"
              />
            </div>
          </div>
        </div>
      </div>

      <template v-if="controls && images.length > 1">
        <span class="carousel__counter">
          {{ selectedIndex + 1 }} / {{ images.length }}
        </span>
        <button
          type="button"
          class="carousel__arrow carousel__arrow--prev"
          aria-label="Imagen anterior"
          @click="goPrev"
        >
          <ChevronLeft :size="22" :stroke-width="2.25" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="carousel__arrow carousel__arrow--next"
          aria-label="Imagen siguiente"
          @click="goNext"
        >
          <ChevronRight :size="22" :stroke-width="2.25" aria-hidden="true" />
        </button>
      </template>
    </div>

    <div v-if="controls && images.length > 1" class="carousel__dots">
      <button
        v-for="(_, index) in images"
        :key="index"
        type="button"
        class="carousel__dot"
        :class="{ 'is-active': index === selectedIndex }"
        :aria-label="`Ir a la imagen ${index + 1}`"
        :aria-current="index === selectedIndex"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel__frame {
  position: relative;
}

.embla {
  overflow: hidden;
  width: 100%;
  height: 22rem;
}

.embla__container {
  display: flex;
  height: 100%;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.embla__media {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: $color-accent-soft;
  border-radius: $radius-image;
  overflow: hidden;
}

.embla__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Variante con controles (Redes sociales) */
.carousel--controls {
  .carousel__frame {
    aspect-ratio: 4 / 5;
    border-radius: $radius-card;
    overflow: hidden;
    background: $color-accent-soft;
    box-shadow: 0 20px 40px rgba(27, 27, 27, 0.12);
  }

  .embla {
    height: 100%;
  }

  .embla__media {
    border-radius: 0;
  }

  .embla__img {
    object-fit: cover;
  }
}

.carousel__counter {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: $radius-pill;
  background: rgba(27, 27, 27, 0.55);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
}

.carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  display: grid;
  place-items: center;
  padding: 0;
  color: $color-text-primary;
  box-shadow: 0 6px 16px rgba(27, 27, 27, 0.15);
  transition:
    transform 0.25s ease,
    background 0.25s ease;
  @include focus-ring;

  @media (hover: hover) {
    &:hover {
      background: #ffffff;
      transform: translateY(-50%) scale(1.1);
    }
  }

  &--prev {
    left: 12px;
  }

  &--next {
    right: 12px;
  }

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
}

.carousel__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.carousel__dot {
  width: 9px;
  height: 9px;
  padding: 0;
  border-radius: $radius-pill;
  background: $color-primary;
  opacity: 0.5;
  transition:
    width 0.35s $ease-out,
    opacity 0.3s ease,
    background 0.3s ease;
  @include focus-ring;

  &.is-active {
    width: 22px;
    background: $color-text-primary;
    opacity: 1;
  }
}
</style>
