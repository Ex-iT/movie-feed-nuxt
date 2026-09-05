import { TICK_TIME } from '~/config'
import getEpoch from '~/utils/getEpoch'
import getProgress from '~/utils/getProgress'

export function useProgress() {
  const progress = ref(0)
  let rAF: number | undefined
  let timer: ReturnType<typeof setTimeout> | undefined

  function cleanup() {
    if (rAF !== undefined) {
      window.cancelAnimationFrame(rAF)
      rAF = undefined
    }
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  function updateProgress(programme: Programme) {
    const startTime = Number.parseInt(programme.ps, 10)
    const endTime = Number.parseInt(programme.pe, 10)
    let now = getEpoch()

    const updateOnrAF = () => {
      if (!programme.is_passed && now >= startTime && now < endTime) {
        const progressValue = getProgress(now, startTime, endTime)

        if (progressValue > 0) {
          progress.value = progressValue
        }
      }

      if (programme.is_passed || now > endTime) {
        if (!programme.is_passed) {
          programme.is_passed = true
        }
        progress.value = 0
        cleanup()
        return
      }

      timer = setTimeout(() => {
        now = getEpoch()
        rAF = window.requestAnimationFrame(updateOnrAF)
      }, TICK_TIME)
    }

    updateOnrAF()
  }

  onUnmounted(cleanup)

  return {
    updateProgress,
    progress,
  }
}
