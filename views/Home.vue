<template>
  <main>
    <section class="today">
      <h1>Films vandaag op televisie</h1>
      <CardComponent :programmes="today" :fetch-state="$fetchState"></CardComponent>
    </section>
    <section class="tomorrow">
      <h1>Films morgen op televisie</h1>
      <CardComponent :programmes="tomorrow" :fetch-state="$fetchState"></CardComponent>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import CardComponent from '../components/Card/index.vue'

export default Vue.extend({
  name: 'HomeView',
  components: { CardComponent },
  data: () => ({
    today: [],
    tomorrow: [],
  }),
  async fetch() {
    this.today = await this.$http.$get('/api/v1/movies/today')
    this.tomorrow = await this.$http.$get('/api/v1/movies/tomorrow')
  },
  fetchOnServer: false,
})
</script>
