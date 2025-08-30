import { TICK_TIME } from '~/config'
import getEpoch from '~/utils/getEpoch'
import getProgress from '~/utils/getProgress'

export function useProgress() {
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

  return {
    updateProgress,
    progress,
  }
}
