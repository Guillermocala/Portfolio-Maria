<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

defineProps<{
  images: string[];
}>();

const [emblaRef] = emblaCarouselVue({
  loop: true,
});
void emblaRef;
</script>

<template>
  <div class="embla" ref="emblaRef">
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
}

.embla__container {
  display: flex;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;

  display: flex;
  justify-content: center;
  align-items: center;
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
