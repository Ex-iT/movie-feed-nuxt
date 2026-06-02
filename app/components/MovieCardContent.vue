<script setup lang="ts">
import type { MovieDetails, Programme } from '~~/shared/types/Common'

const props = defineProps<{
  programme: Programme
}>()

const detailsData = ref<MovieDetails | undefined>(props.programme.details)
const loading = ref(false)

const { progress, updateProgress } = useProgress()

onMounted(() => {
  updateProgress(props.programme)
})

async function fetchDetails() {
  if (detailsData.value)
    return
  loading.value = true
  try {
    detailsData.value = await $fetch<MovieDetails>(`/api/v1/programmes/${props.programme.main_id}`)
  }
  catch {
    detailsData.value = undefined
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <article>
    <Accordion @open="fetchDetails">
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
        <div v-if="loading" class="skeleton">
          <div class="skeleton-image" />
          <div class="skeleton-lines">
            <div class="skeleton-line" />
            <div class="skeleton-line short" />
            <div class="skeleton-line" />
            <div class="skeleton-line short" />
          </div>
        </div>
        <Details
          v-else-if="detailsData"
          :programme="props.programme"
          :details="detailsData"
        />
      </template>
    </Accordion>
    <ProgressIndicator :progress="progress" />
  </article>
</template>

<style scoped>
.skeleton {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-medium);
  padding-top: var(--spacing-medium);
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
