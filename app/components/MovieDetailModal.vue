<script setup lang="ts">
import type { MovieDetails, Programme } from '~~/shared/types/Common'
import { CHANNEL_LOGO_SRC, CHANNELS, EMPTY_IMG } from '~/config'
import formatDate from '~/utils/formatDate'
import formatTime from '~/utils/formatTime'
import getEpoch from '~/utils/getEpoch'
import parseEpoch from '~/utils/parseEpoch'
import stripHtml from '~/utils/stripHtml'
import ucFirst from '~/utils/ucFirst'

interface NextBroadcast {
  channel: string
  start: string
  end: string
  date: string
}

const props = defineProps<{
  programme: Programme | null
  details: MovieDetails | null
  loading: boolean
  error: boolean
}>()

const emit = defineEmits<{ close: [] }>()

const CHANNEL_IDS = new Set(Object.keys(CHANNELS))

const dialogRef = ref<HTMLDialogElement>()
const closing = ref(false)

const nextBroadcast = computed<NextBroadcast | null>(() => {
  if (!props.details?.linear?.length) {
    return null
  }
  const now = getEpoch()
  const upcoming = props.details.linear.find(
    entry => entry.start > now && CHANNEL_IDS.has(entry.channel?.id),
  )
  if (!upcoming) {
    return null
  }
  const date = parseEpoch(upcoming.start)
  return {
    channel: upcoming.channel?.name || '',
    start: formatTime(upcoming.start),
    end: formatTime(upcoming.end),
    date: date
      ? date.toLocaleDateString('nl-NL', {
          day: 'numeric',
          month: 'long',
          timeZone: 'Europe/Amsterdam',
        })
      : '',
  }
})

const channelLogo = computed(() => {
  if (props.programme?.channel_logo) {
    return props.programme.channel_logo
  }
  const chId = props.programme?.ch_id
  return chId ? CHANNEL_LOGO_SRC.replace(/%s/g, chId) : EMPTY_IMG
})

const channelLabel = computed(() => {
  if (props.programme?.channel_label) {
    return props.programme.channel_label
  }
  const chId = props.programme?.ch_id
  if (chId) {
    return CHANNELS[Number.parseInt(chId, 10)] || ''
  }
  return ''
})

const startTime = computed(() => {
  if (props.programme?.start) {
    return props.programme.start
  }
  const date = parseEpoch(props.programme?.ps)
  return date ? formatTime(date) : ''
})

const endTime = computed(() => {
  if (props.programme?.end) {
    return props.programme.end
  }
  const date = parseEpoch(props.programme?.pe)
  return date ? formatTime(date) : ''
})

const broadcastDay = computed(() => {
  const date = parseEpoch(props.programme?.ps)
  const raw = props.programme?.day || (date ? formatDate(date) : '')
  return raw ? ucFirst(raw) : ''
})

const broadcastStartIso = computed(() => {
  const date = parseEpoch(props.programme?.ps)
  return date ? date.toISOString() : ''
})

const broadcastEndIso = computed(() => {
  const date = parseEpoch(props.programme?.pe)
  return date ? date.toISOString() : ''
})

const title = computed(() => {
  return props.programme?.title || props.details?.generic?.title || ''
})

const descr = computed(() => {
  const raw = props.programme?.descr || props.details?.generic?.long || ''
  return stripHtml(raw)
})

const subgenre = computed(() => {
  return props.programme?.subgenre || props.details?.generic?.subcategory || ''
})

const tvgRating = computed(() => {
  return props.programme?.tvg_rating || ''
})

function onClose() {
  if (closing.value) {
    return
  }
  closing.value = true
  dialogRef.value?.addEventListener('animationend', () => {
    emit('close')
  }, { once: true })
}

function onBackdropClick(event: MouseEvent) {
  if (event.target === dialogRef.value) {
    onClose()
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  dialogRef.value?.showModal()
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <dialog
    ref="dialogRef"
    class="modal-dialog"
    :class="{ closing }"
    @click="onBackdropClick"
    @close="onClose"
  >
    <div class="modal-content">
      <button
        type="button"
        class="modal-close"
        @click="onClose"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
        <span class="a11y-only">
          Sluiten
        </span>
      </button>

      <div class="modal-header">
        <nuxt-img
          :src="channelLogo"
          :alt="channelLabel"
          width="40"
          height="40"
        />
        <div class="modal-header-info">
          <h2>{{ title }}</h2>
          <div v-if="broadcastDay || startTime" class="modal-broadcast">
            <time v-if="broadcastDay" :datetime="broadcastStartIso">{{ broadcastDay }}</time>
            <span v-if="broadcastDay && startTime">,&nbsp;</span>
            <time v-if="startTime" :datetime="broadcastEndIso">{{ startTime }} - {{ endTime }}</time>
          </div>
        </div>
      </div>

      <div v-if="loading" class="skeleton">
        <div class="skeleton-image" />
        <div class="skeleton-lines">
          <div class="skeleton-line" />
          <div class="skeleton-line short" />
          <div class="skeleton-line" />
          <div class="skeleton-line short" />
        </div>
      </div>

      <div v-else-if="error" class="modal-error">
        <h2>Film niet gevonden.</h2>
      </div>

      <Details
        v-else-if="details"
        :programme="{
          ...programme,
          descr,
          subgenre,
          tvg_rating: tvgRating,
        } as Programme"
        :details="details"
      />

      <div v-if="nextBroadcast" class="next-broadcast">
        <strong>Volgende uitzending:</strong>
        {{ nextBroadcast.date }}, {{ nextBroadcast.start }} - {{ nextBroadcast.end }}
        <template v-if="nextBroadcast.channel">
          op {{ nextBroadcast.channel }}
        </template>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal-dialog {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
}

.modal-dialog::backdrop {
  background-color: rgb(0 0 0 / 80%);
}

.modal-dialog.closing::backdrop {
  animation: fade-out 200ms ease-out forwards;
}

.modal-dialog.closing {
  animation: fade-out 200ms ease-out forwards;
}

@keyframes fade-out {
  to {
    visibility: hidden;
    opacity: 0;
  }
}

.modal-content {
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  overflow-y: auto;
  background: var(--background-color-main) url('/assets/bg.jpg') top left / cover fixed;
  padding: var(--spacing-large);
  font-family: Arial, sans-serif;
  font-size: 1em;
  line-height: 1.375em;
  color: var(--foreground-color-main);
}

@media (min-width: 720px) {
  .modal-dialog {
    align-items: center;
    padding: var(--spacing-medium);
  }

  .modal-content {
    width: 100%;
    max-width: 768px;
    min-height: 200px;
    height: auto;
    max-height: 90vh;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 30px rgb(255 255 255 / 25%);
  }
}

.modal-close {
  position: absolute;
  top: var(--spacing-medium);
  right: var(--spacing-medium);
  width: 32px;
  height: 32px;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  fill: var(--foreground-color-main);
}

.modal-close svg {
  width: 24px;
  height: 24px;
  transition: fill 200ms ease-in;
}

.modal-close:hover svg {
  fill: var(--highlight-color-main);
}

.modal-header {
  display: flex;
  column-gap: var(--spacing-medium);
  margin-bottom: var(--spacing-large);
  padding-right: var(--spacing-extra-large);
}

.modal-header-info {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-small);
}

.modal-header-info h2 {
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
}

.modal-broadcast {
  color: rgb(255 255 255 / 70%);
}

.modal-error h2 {
  color: var(--error-color-main);
}

.next-broadcast {
  margin-top: var(--spacing-large);
  padding-top: var(--spacing-medium);
  border-top: 1px solid rgb(255 255 255 / 20%);
  color: rgb(255 255 255 / 70%);
}

.skeleton {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-medium);
}

@media (min-width: 720px) {
  .skeleton {
    flex-direction: row-reverse;
    column-gap: var(--spacing-medium);
    align-items: flex-start;
  }

  .skeleton-image {
    flex: 1 1 33%;
    width: 33%;
  }

  .skeleton-lines {
    flex: 1 1 66%;
    width: 66%;
  }
}

.skeleton-image {
  position: relative;
  aspect-ratio: 123 / 80;
  border: 1px solid rgb(255 255 255 / 20%);
  overflow: hidden;
}

.skeleton-image::before {
  position: absolute;
  inset: 0;
  content: '';
  background-color: rgb(255 255 255 / 20%);
  animation: 1.5s linear 0.5s infinite alternate none running pulse;
}

.skeleton-lines {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-small);
}

.skeleton-line {
  position: relative;
  height: 1rem;
  border-radius: 2px;
  overflow: hidden;
}

.skeleton-line::after {
  position: absolute;
  inset: 0;
  content: '';
  background-color: rgb(255 255 255 / 15%);
  animation: 1.5s linear 0.5s infinite alternate none running pulse;
}

.skeleton-line.short {
  width: 60%;
}
</style>
