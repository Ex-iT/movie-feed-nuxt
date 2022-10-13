<template>
  <main>
    <section class="today">
      <h1>Films vandaag op televisie</h1>
      <CardComponent :programmes="pageData.today"></CardComponent>
    </section>
    <section class="tomorrow">
      <h1>Films morgen op televisie</h1>
      <CardComponent :programmes="pageData.tomorrow"></CardComponent>
    </section>
  </main>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import CardComponent from '~/components/Card/index.vue'
import { Cacheables } from '~/types/sharedTypes'

export default Vue.extend({
  name: 'HomeView',
  components: { CardComponent },
  props: {
    pageData: {
      type: Object as PropType<Cacheables>,
      default: () => ({ today: [], tomorrow: [], log: {}, createdAt: 0 }),
      required: true,
    },
  },
})
</script>

<style scoped>
main {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-extra-large);
  min-height: 100vh;
  overflow: hidden;
  font-size: 1em;
}

@media (min-width: 720px) {
  main {
    flex-direction: row;
    column-gap: var(--spacing-medium);
  }

  .today,
  .tomorrow {
    flex: 1 1 50%;
  }
}
</style>
