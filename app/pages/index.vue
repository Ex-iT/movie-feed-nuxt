<script setup lang="ts">
import type { FetchData, MovieDetails, Programme, Programmes } from '~~/shared/types/Common'
import { CHANNEL_LOGO_SRC, CHANNELS, EMPTY_IMG, TICK_TIME } from '~/config'
import formatDate from '~/utils/formatDate'
import formatTime from '~/utils/formatTime'
import getEpoch from '~/utils/getEpoch'
import parseEpoch from '~/utils/parseEpoch'

const LOADING_TIMEOUT_MS = 10_000

const route = useRoute()
const router = useRouter()

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
const isMounted = ref(false)

let rAF: number | undefined
let timer: ReturnType<typeof setTimeout> | undefined

function tick() {
  now.value = getEpoch()
  timer = setTimeout(() => {
    rAF = window.requestAnimationFrame(tick)
  }, TICK_TIME)
}

onMounted(() => {
  isMounted.value = true
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
  return isMounted.value && now.value > Number.parseInt(pe, 10)
}

// Modal state
const modalDetails = ref<MovieDetails | null>(null)
const modalLoading = ref(false)
const modalError = ref(false)

function constructProgrammeFromQuery(query: Record<string, string>): Programme {
  const chId = (query.ch || '').toString()
  const ps = (query.ps || '').toString()
  const pe = (query.pe || '').toString()
  const mainId = (query.movie || '').toString()

  const psDate = parseEpoch(ps)
  const peDate = parseEpoch(pe)
  const start = psDate ? formatTime(psDate) : ''
  const end = peDate ? formatTime(peDate) : ''
  const day = psDate ? formatDate(psDate) : ''
  const channelLogo = chId ? CHANNEL_LOGO_SRC.replace(/%s/g, chId) : EMPTY_IMG
  const channelLabel = chId ? CHANNELS[Number.parseInt(chId, 10)] || '' : ''

  return {
    main_id: mainId,
    ch_id: chId,
    ps,
    pe,
    title: '',
    channel_logo: channelLogo,
    channel_label: channelLabel,
    start,
    end,
    is_passed: peDate ? getEpoch() > peDate.getTime() / 1000 : false,
    progress: 0,
    deep_link: '',
    day,
  }
}

const modalProgramme = computed(() => {
  const movieId = route.query.movie
  if (!movieId) {
    return null
  }
  return constructProgrammeFromQuery(route.query as Record<string, string>)
})

const modalOpen = computed(() => !!route.query.movie)

async function fetchModalDetails(mainId: string) {
  if (modalDetails.value) {
    return
  }
  modalLoading.value = true
  modalError.value = false
  try {
    const result = await $fetch<MovieDetails>(`/api/v1/programmes/${mainId}`)
    if ('error' in result) {
      modalError.value = true
    }
    else {
      modalDetails.value = result
    }
  }
  catch {
    modalDetails.value = null
    modalError.value = true
  }
  finally {
    modalLoading.value = false
  }
}

watch(modalOpen, (open) => {
  if (open && modalProgramme.value) {
    fetchModalDetails(modalProgramme.value.main_id)
  }
  else {
    modalDetails.value = null
    modalError.value = false
  }
}, { immediate: true })

function closeModal() {
  router.push('/')
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
  <MovieDetailModal
    v-if="modalOpen"
    :programme="modalProgramme"
    :details="modalDetails"
    :loading="modalLoading"
    :error="modalError"
    @close="closeModal"
  />
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
