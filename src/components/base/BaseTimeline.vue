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
  <section class="timeline">
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

/* ===========================
   Desktop
=========================== */

@media (min-width: 992px) {

.timeline {

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(260px,1fr));

  gap: 2rem;

  padding-top: 3rem;

}

.timeline::before{

  content:"";

  position:absolute;

  left:0;

  right:0;

  top:26px;

  height:3px;

  background:var(--color-border);

}

.timeline__item{

  position:relative;

  padding-top:2.5rem;

}

.timeline__dot{

  position:absolute;

  top:15px;

  left:50%;

  transform:translateX(-50%);

  width:22px;

  height:22px;

  border-radius:50%;

  background:var(--color-primary);

  border:5px solid white;

  box-shadow:0 0 0 2px var(--color-primary);

  z-index:2;

}

.timeline__content{

  background:white;

  border-radius:18px;

  padding:1.5rem;

  box-shadow:var(--shadow-small);

  transition:.25s;

}

.timeline__content:hover{

  transform:translateY(-8px);

  box-shadow:var(--shadow-medium);

}

}

/* ===========================
   Mobile
=========================== */

@media (max-width:991px){

.timeline{

  display:flex;

  flex-direction:column;

  gap:2rem;

  position:relative;

  padding-left:2rem;

}

.timeline::before{

  content:"";

  position:absolute;

  top:0;

  bottom:0;

  left:10px;

  width:3px;

  background:var(--color-border);

}

.timeline__item{

  position:relative;

}

.timeline__dot{

  position:absolute;

  left:-2rem;

  top:8px;

  width:20px;

  height:20px;

  border-radius:50%;

  background:var(--color-primary);

  border:4px solid white;

  box-shadow:0 0 0 2px var(--color-primary);

}

.timeline__content{

  background:white;

  border-radius:16px;

  padding:1.25rem;

  box-shadow:var(--shadow-small);

}

}

.timeline__year{

  display:inline-flex;

  margin-bottom:.5rem;

  font-weight:700;

  color:var(--color-primary);

}

.timeline__company{

  margin:.35rem 0 1rem;

  font-weight:600;

  color:var(--color-text-secondary);

}

.timeline h3{

  margin:0;

}
</style>