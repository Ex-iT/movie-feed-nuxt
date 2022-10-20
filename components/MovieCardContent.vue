<template>
  <article>
    <Accordion>
      <template #summary>
        <nuxt-img
          :src="programme.channel_logo"
          :alt="programme.channel_label"
          width="40"
          height="40"
        />
        <div class="info">
          <div class="details">
            <h2>{{ programme.title }}</h2>
            {{ programme.start }} - {{ programme.end }}
          </div>
          <Sharer :programme="programme" />
        </div>
      </template>
      <template #content>
        <Details :programme="programme" />
      </template>
    </Accordion>
    <ProgressIndicator :progress="progress" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { Programme } from '~/types/sharedTypes'
import getEpoch from '~/lib/getEpoch'
import { TICK_TIME } from '~/config'
import getProgress from '~/lib/getProgress'

export default Vue.extend({
  name: 'MovieCardComponent',
  props: {
    programme: {
      type: Object as () => Programme,
      required: true,
    },
  },
  data(): {
    progress: number
  } {
    return {
      progress: 0,
    }
  },
  mounted() {
    this.updateProgress(this.programme)
  },
  methods: {
    updateProgress(programme: Programme) {
      const startTime = parseInt(programme.ps, 10)
      const endTime = parseInt(programme.pe, 10)
      let now = getEpoch()
      let rAF: number

      const updateOnrAF = () => {
        if (!programme.is_passed && now >= startTime && now < endTime) {
          const progress = getProgress(now, startTime, endTime)
          if (progress > 0) {
            this.progress = progress
          }
        }

        if (programme.is_passed) {
          this.progress = 0
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
    },
  },
})
</script>
