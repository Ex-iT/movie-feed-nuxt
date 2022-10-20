<template>
  <main>
    <section class="today">
      <h1>Films vandaag op televisie</h1>
      <CardComponent :fetch-state="fetchState">
        <CardItem
          v-for="programme in pageData.today"
          :key="`${programme.ps}:${programme.main_id}`"
          :class="{ passed: programme.is_passed }"
          @card-item-clicked="
            handleClick(`${programme.ps}:${programme.main_id}`)
          "
        >
          <MovieCardContent
            :ref="`${programme.ps}:${programme.main_id}`"
            :programme="programme"
          />
        </CardItem>
      </CardComponent>
    </section>
    <section class="tomorrow">
      <h1>Films morgen op televisie</h1>
      <CardComponent :fetch-state="fetchState">
        <CardItem
          v-for="programme in pageData.tomorrow"
          :key="`${programme.ps}:${programme.main_id}`"
          :class="{ passed: programme.is_passed }"
          @card-item-clicked="
            handleClick(`${programme.ps}:${programme.main_id}`)
          "
        >
          <MovieCardContent
            :ref="`${programme.ps}:${programme.main_id}`"
            :programme="programme"
          />
        </CardItem>
      </CardComponent>
    </section>
  </main>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import CardComponent from '~/components/Card/index.vue'
import MovieCardContent from '~/components/MovieCardContent.vue'
import { Programmes } from '~/types/sharedTypes'
import { FetchStateProp } from '~/props/sharedProps'

export default Vue.extend({
  name: 'HomeView',
  components: { CardComponent, MovieCardContent },
  props: {
    pageData: {
      type: Object as PropType<Programmes>,
      default: () => ({ today: [], tomorrow: [], log: {}, createdAt: 0 }),
      required: true,
    },
    fetchState: FetchStateProp,
  },
  methods: {
    handleClick(id: string) {
      const component = this.$refs[id] as Array<Vue<HTMLDivElement>>
      component[0]?.$el.classList.toggle('open')
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
