import { TICK_TIME } from '~/config'
import getEpoch from '~/utils/getEpoch'

const now = ref(getEpoch())

let timer: ReturnType<typeof setTimeout> | undefined
let raf: number | undefined
let started = false

function clear() {
  if (raf !== undefined) {
    window.cancelAnimationFrame(raf)
    raf = undefined
  }
  if (timer !== undefined) {
    clearTimeout(timer)
    timer = undefined
  }
}

function tick() {
  now.value = getEpoch()
  timer = setTimeout(() => {
    raf = window.requestAnimationFrame(tick)
  }, TICK_TIME)
}

function start() {
  if (started) {
    return
  }
  started = true
  tick()
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clear()
    }
    else if (timer === undefined && raf === undefined) {
      tick()
    }
  })
}

export function useNow() {
  if (import.meta.client) {
    start()
  }
  return now
}
