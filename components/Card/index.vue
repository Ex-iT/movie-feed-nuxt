<template>
  <ul>
    <CardItem
      v-for="(prog, index) in programmes"
      :key="`${prog.main_id}-${index}`"
      :class="{ passed: prog.is_passed }"
      @card-item-clicked="handleClick(prog.main_id)"
    >
      <CardContent :programme="prog" :is-open="isOpen[prog.main_id]" />
    </CardItem>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import CardItem from './CardItem.vue'
import CardContent from './CardContent.vue'
import { CacheableProg } from '~/types/sharedTypes'
import getEpoch from '~/lib/getEpoch'
import { TICK_TIME } from '~/config'
import getProgress from '~/lib/getProgress'

export default Vue.extend({
  name: 'CardComponent',
  components: { CardItem, CardContent },
  props: {
    programmes: {
      type: Array as () => CacheableProg[],
      required: true,
    },
  },
  data(): {
    isOpen: { [key: string]: boolean }
    progs: CacheableProg[]
  } {
    return {
      isOpen: {},
      progs: [],
    }
  },
  methods: {
    handleClick(id: string) {
      this.isOpen = Object.assign({}, this.isOpen, { [id]: !this.isOpen[id] })
    },
    updateProgress(prog: CacheableProg) {
      const startTime = parseInt(prog.ps, 10)
      const endTime = parseInt(prog.pe, 10)
      let now = getEpoch()
      let rAF: number

      const updateOnrAF = () => {
        if (!prog.is_passed && now < endTime) {
          const progress = getProgress(now, startTime, endTime)
          if (progress > 0) {
            prog.progress = progress
          }
        }

        if (prog.is_passed) {
          prog.progress = 0
          window.cancelAnimationFrame(rAF)
        }

        if (!prog.is_passed && now > endTime) {
          prog.is_passed = true
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

<style scoped>
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--error-color-main);
}

.error h2 {
  margin: 0;
  font-size: 1rem;
  color: var(--error-color-main);
}
</style>
