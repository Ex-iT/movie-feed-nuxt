<script setup lang="ts">
import type { FetchData, Programmes } from '~~/shared/types/Common'
import { TICK_TIME } from '~/config'
import getEpoch from '~/utils/getEpoch'

const LOADING_TIMEOUT_MS = 10_000

const { data: pageData, status, error, refresh } = useFetch<Programmes>('/api/v1/programmes', {
  timeout: LOADING_TIMEOUT_MS,
})

const fetchData = computed<FetchData>(() => ({
  pending: status.value === 'pending' || status.value === 'idle',
  error: error.value ?? undefined,
  data: pageData.value ?? { today: [], tomorrow: [], log: { message: '', success: true }, createdAt: 0 },
  refresh,
}))

const now = ref(getEpoch())

let rAF: number | undefined
let timer: ReturnType<typeof setTimeout> | undefined

function tick() {
  now.value = getEpoch()
  timer = setTimeout(() => {
    rAF = window.requestAnimationFrame(tick)
  }, TICK_TIME)
}

onMounted(() => {
  tick()
})

onUnmounted(() => {
  if (rAF !== undefined) {
    window.cancelAnimationFrame(rAF)
  }
  if (timer !== undefined) {
    clearTimeout(timer)
  }
})

function isPassed(pe: string) {
  return now.value > Number.parseInt(pe, 10)
}
</script>

<template>
  <main>
    <section class="today">
      <h1>Films vandaag op televisie</h1>
      <Card :fetch-data="fetchData">
        <template v-if="fetchData.data.today.length">
          <CardItem
            v-for="programme in fetchData.data.today"
            :key="`${programme.ps}:${programme.main_id}`"
            :class="{ passed: isPassed(programme.pe) }"
          >
            <MovieCardContent
              :ref="`${programme.ps}:${programme.main_id}`"
              :programme="programme"
            />
          </CardItem>
        </template>
      </Card>
    </section>
    <section class="tomorrow">
      <h1>Films morgen op televisie</h1>
      <Card :fetch-data="fetchData">
        <template v-if="fetchData.data.tomorrow.length">
          <CardItem
            v-for="programme in fetchData.data.tomorrow"
            :key="`${programme.ps}:${programme.main_id}`"
            :class="{ passed: isPassed(programme.pe) }"
          >
            <MovieCardContent
              :ref="`${programme.ps}:${programme.main_id}`"
              :programme="programme"
            />
          </CardItem>
        </template>
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
