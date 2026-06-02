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
        <div v-if="loading" class="loading">
          Details laden...
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
.loading {
  color: rgb(255 255 255 / 60%);
  font-style: italic;
  padding-top: var(--spacing-medium);
}
</style>
