<script setup lang="ts">
import type { MovieDetails, Programme } from '~~/shared/types/Common'
import { EMPTY_IMG } from '~/config'

const props = defineProps<{
  programme: Programme
  details: MovieDetails
}>()

const mainImage = computed(() => props.details?.generic?.image || EMPTY_IMG)
</script>

<template>
  <div class="asset-details">
    <div class="asset-image">
      <nuxt-img
        :src="mainImage"
        :alt="props.details?.generic?.title"
        width="615"
        height="400"
        loading="lazy"
      />
    </div>
    <div class="synopsis">
      <p v-if="props.programme.descr">
        <strong v-if="props.programme.subgenre">
          {{ props.programme.subgenre }}
        </strong> {{ props.programme.descr }}
      </p>
      <MetaInfo :programme="props.programme" :details="props.details" />
    </div>
  </div>
</template>
