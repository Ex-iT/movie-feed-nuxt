<script setup lang="ts">
import type { Programme } from '~~/shared/types/Common'
import { TICK_TIME } from '~/config'
import getEpoch from '~/utils/getEpoch'
import getProgress from '~/utils/getProgress'

const props = defineProps<{
  programme: Programme
}>()

const progress = ref(0)

function updateProgress(programme: Programme) {
  const startTime = Number.parseInt(programme.ps, 10)
  const endTime = Number.parseInt(programme.pe, 10)
  let now = getEpoch()
  let rAF: number

  const updateOnrAF = () => {
    if (!programme.is_passed && now >= startTime && now < endTime) {
      const progressValue = getProgress(now, startTime, endTime)

      if (progressValue > 0) {
        progress.value = progressValue
      }
    }

    if (programme.is_passed) {
      progress.value = 0
      window.cancelAnimationFrame(rAF)
    }

    if (!programme.is_passed && now > endTime) {
      programme.is_passed = true
      window.cancelAnimationFrame(rAF)
    }

    setTimeout(() => {
      now = getEpoch()
      rAF = window.requestAnimationFrame(updateOnrAF)
    }, TICK_TIME)
  }

  updateOnrAF()
}

onMounted(() => {
  updateProgress(props.programme)
})
</script>

<template>
  <article>
    <Accordion>
      <template #summary>
        <nuxt-img
          :src="props.programme.channel_logo"
          :alt="props.programme.channel_label"
          width="40"
          height="40"
        />
        <div class="info">
          <div class="details">
            <h2>{{ props.programme.title }}</h2>
            {{ props.programme.start }} - {{ props.programme.end }}
          </div>
          <Sharer :programme="props.programme" />
        </div>
      </template>
      <template #content>
        <Details :programme="props.programme" />
      </template>
    </Accordion>
    <ProgressIndicator :progress="progress" />
  </article>
</template>
