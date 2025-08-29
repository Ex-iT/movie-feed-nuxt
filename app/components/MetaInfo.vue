<script setup lang="ts">
import type { MovieDetails, Programme } from '~~/shared/types/Common'
import { IMDB_URL, YT_URL } from '~/config'

const props = defineProps<{
  programme: Programme
  details: MovieDetails
}>()

const hasExternalLinks = computed(() => props.details.generic.imdb || props.details.generic.yt_id)
</script>

<template>
  <div class="meta-info">
    <p v-if="props.programme.tvg_rating">
      <strong>Waardering:</strong> {{ props.programme.tvg_rating }}
    </p>

    <p v-if="details.generic.year">
      <strong>Jaar:</strong> {{ props.details.generic.year }}
    </p>

    <p v-for="({ label, value }, index) in props.details.metadata.items" :key="`index-${index}`">
      <strong>{{ label }}:</strong> {{ value }}
    </p>

    <div v-if="props.details.metadata.guidance?.length" class="guidance">
      <strong>Kijkwijzer:</strong>
      <ul>
        <li v-for="({ name, icon }, index) in props.details.metadata.guidance.filter((guidance) => Boolean(guidance.icon))" :key="`guidance-${index}`">
          <nuxt-img
            loading="lazy"
            :src="icon"
            :alt="name"
            :title="name"
            width="20"
            height="20"
          />
        </li>
      </ul>
    </div>

    <div v-if="hasExternalLinks" class="external">
      <strong>Meer info:</strong>
      <a
        v-if="props.details.generic.imdb"
        :href="`${IMDB_URL}${props.details.generic.imdb}`"
        target="_blank"
        rel="noreferrer noopener"
        @click.stop
      >
        <NuxtImg
          src="/assets/logo_imdb.svg"
          :alt="`Bekijk ${props.programme.title} op IMDb`"
          :title="`Bekijk ${props.programme.title} op IMDb`"
          width="79"
          height="40"
          loading="lazy"
        />
      </a>

      <a
        v-if="props.details.generic.yt_id"
        :href="`${YT_URL}${props.details.generic.yt_id}`"
        target="_blank"
        rel="noreferrer noopener"
        @click.stop
      >
        <NuxtImg
          src="/assets/yt_btn_play.svg"
          :alt="`Bekijk ${props.programme.title} op YouTube`"
          :title="`Bekijk ${props.programme.title} op YouTube`"
          width="57"
          height="40"
          loading="lazy"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
.guidance,
.external {
  display: flex;
  column-gap: var(--spacing-medium);
}

.guidance ul {
  display: flex;
  flex-direction: row;
  column-gap: var(--spacing-medium);
  padding: 0;
  list-style-type: none;
}

.guidance img {
  background-color: #fff;
  border-radius: 50%;
}

.external {
  align-items: center;
}

.external img {
  width: auto;
  height: 40px;
}
</style>
