<template>
  <main>
    <section class="today">
      <h1>Films vandaag op televisie</h1>
      <CardComponent
        :programmes="today"
        :fetch-state="$fetchState"
      ></CardComponent>
    </section>
    <section class="tomorrow">
      <h1>Films morgen op televisie</h1>
      <CardComponent
        :programmes="tomorrow"
        :fetch-state="$fetchState"
      ></CardComponent>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import CardComponent from '~/components/Card/index.vue'
import { EnrichedProg } from '~/types/sharedTypes'

export default Vue.extend({
  name: 'HomeView',
  components: { CardComponent },
  data(): {
    today: EnrichedProg[]
    tomorrow: EnrichedProg[]
  } {
    return {
      today: [],
      tomorrow: [],
    }
  },
  async fetch() {
    const prefixUrl = '/api/v1/movies'
    const [today, tomorrow] = await Promise.all([
      this.$http.$get('today', { prefixUrl }) as Promise<EnrichedProg[]>,
      this.$http.$get('tomorrow', { prefixUrl }) as Promise<EnrichedProg[]>,
    ])

    this.today = today
    this.tomorrow = tomorrow
  },
  fetchOnServer: false,
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
  padding: 1em;
  overflow: hidden;
  font-family: Arial, sans-serif;
  font-size: 1em;
  line-height: 1.375em;
  color: var(--foreground-color-main);
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
