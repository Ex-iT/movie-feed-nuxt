<script setup lang="ts">
import type { Programme } from '~~/shared/types/Common'

const props = defineProps<{
  programme: Programme
}>()

const { progress, updateProgress } = useProgress()

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
