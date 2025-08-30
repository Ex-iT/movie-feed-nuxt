<script setup lang="ts">
import type { FetchData, Programmes } from '~~/shared/types/Common'

const { data: pageData, status, error, refresh } = useFetch<Programmes>('/api/v1/programmes', {
  lazy: true,
  server: false,
})

const fetchData = computed<FetchData>(() => ({
  pending: status.value === 'pending' || status.value === 'idle',
  error: error.value,
  data: pageData.value || { today: [], tomorrow: [], log: {}, createdAt: 0 },
  refresh,
}))
</script>

<template>
  <main>
    <section class="today">
      <h1>Films vandaag op televisie</h1>
      <Card :fetch-data="fetchData">
        <CardItem
          v-for="programme in fetchData.data.today"
          :key="`${programme.ps}:${programme.main_id}`"
          :class="{ passed: programme.is_passed }"
        >
          <MovieCardContent
            :ref="`${programme.ps}:${programme.main_id}`"
            :programme="programme"
          />
        </CardItem>
      </Card>
    </section>
    <section class="tomorrow">
      <h1>Films morgen op televisie</h1>
      <Card :fetch-data="fetchData">
        <CardItem
          v-for="programme in fetchData.data.tomorrow"
          :key="`${programme.ps}:${programme.main_id}`"
          :class="{ passed: programme.is_passed }"
        >
          <MovieCardContent
            :ref="`${programme.ps}:${programme.main_id}`"
            :programme="programme"
          />
        </CardItem>
      </Card>
    </section>
  </main>
</template>

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
