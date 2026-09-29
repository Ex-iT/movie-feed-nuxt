import type { Programme } from '~~/shared/types/Common'
import getProgress from '~/utils/getProgress'

export function useProgress() {
  const now = useNow()
  const active = ref(false)

  let startTime = 0
  let endTime = 0
  let passed = false

  const progress = computed(() => {
    if (!active.value || passed) {
      return 0
    }
    const current = now.value
    if (current < startTime || current >= endTime) {
      return 0
    }
    const value = getProgress(current, startTime, endTime)
    return value > 0 ? value : 0
  })

  function updateProgress(programme: Programme) {
    startTime = Number.parseInt(programme.ps, 10)
    endTime = Number.parseInt(programme.pe, 10)
    passed = programme.is_passed
    active.value = true
  }

  return {
    progress,
    updateProgress,
  }
}
