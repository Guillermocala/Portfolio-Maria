<script setup lang="ts">
defineProps<{
    image: string
    variant?: "mobile" | "desktop"
}>()
</script>

<template>
  <article
    class="menu-card"
    :class="`menu-card--${variant ?? 'mobile'}`"
  >
    <img
      :src="image"
      :alt="variant === 'desktop' ? 'Menú físico' : 'Menú digital'"
      class="menu-card__image"
    />
  </article>
</template>

<style scoped lang="scss">
.menu-card{

    flex:0 0 250px;

    border-radius:28px;

    overflow:hidden;

    background:white;

    box-shadow:var(--shadow-small);

    transition:.25s;

}

.menu-card:hover{

    transform:translateY(-8px);

    box-shadow:var(--shadow-medium);

}

.menu-card__image{

    width:100%;

    display:block;

    object-fit:cover;

}

.menu-card--mobile{

    width:240px;

}

.menu-card--desktop{

    width:100%;

    aspect-ratio:16/10;

}
</style>