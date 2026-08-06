<script setup lang="ts">
defineOptions({
  name: "AdvertisingCard",
})

defineProps<{
  image: string
  title?: string
}>()
</script>

<template>
  <article class="advertising-card">

    <img
      :src="image"
      :alt="title"
      class="advertising-card__image"
    />

  </article>
</template>

<style scoped lang="scss">
.advertising-card{

    overflow:hidden;

    border-radius:18px;

    background:white;

    box-shadow:var(--shadow-small);

    transition:.25s;

    cursor:pointer;

}

.advertising-card:hover{

    transform:translateY(-8px);

    box-shadow:var(--shadow-medium);

}

.advertising-card__image{

    display:block;

    width:100%;

    height:100%;

    object-fit:cover;

}
</style>