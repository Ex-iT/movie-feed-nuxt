<template>
  <div class="meta-info">
    <p v-if="tvgRating"><strong>Waardering:</strong> {{ tvgRating }}</p>

    <p v-if="year"><strong>Jaar:</strong> {{ year }}</p>

    <p
      v-for="({ label, value }, index) in metaData"
      :key="`meta-items-${index}`"
    >
      <strong>{{ label }}:</strong> {{ value }}
    </p>

    <div v-if="guidance.length" class="guidance">
      <strong>Kijkwijzer:</strong>
      <ul>
        <li
          v-for="({ name, icon }, index) in guidance"
          :key="`guidance-${index}`"
        >
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
        v-if="imdbUrl"
        :href="imdbUrl"
        target="_blank"
        rel="noreferrer noopener"
        @click.stop
      >
        <img
          src="~assets/svg/logo_imdb.svg"
          :alt="`Bekijk ${programmeTitle} op IMDb`"
          :title="`Bekijk ${programmeTitle} op IMDb`"
          width="79"
          height="40"
        />
      </a>

      <a
        v-if="ytUrl"
        :href="ytUrl"
        target="_blank"
        rel="noreferrer noopener"
        @click.stop
      >
        <img
          src="~assets/svg/yt_btn_play.svg"
          :alt="`Bekijk ${programmeTitle} op YouTube`"
          :title="`Bekijk ${programmeTitle} op YouTube`"
          width="57"
          height="40"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Programme, MovieDetails } from '~/types/sharedTypes'
import { IMDB_URL, YT_URL } from '~/config'
import { Guidance } from '~/types/Guidance'
import { Items } from '~/types/Items'

export default Vue.extend({
  props: {
    programme: {
      type: Object as () => Programme,
      default: () => {},
    },
    details: {
      type: Object as () => MovieDetails,
      default: () => {},
    },
  },
  computed: {
    tvgRating(): string {
      return (this.programme as Programme)?.tvg_rating || ''
    },
    year(): string {
      return (this.details as MovieDetails)?.generic?.year || ''
    },
    metaData(): Items[] {
      return (this.details as MovieDetails)?.metadata.items || []
    },
    guidance(): Guidance[] {
      return (this.details?.metadata.guidance || []) as Guidance[]
    },
    imdbUrl(): string {
      return `${IMDB_URL}${(this.details as MovieDetails)?.generic?.imdb}`
    },
    ytUrl(): string {
      return `${YT_URL}${(this.details as MovieDetails)?.generic?.yt_id}`
    },
    programmeTitle(): string {
      return (this.programme as Programme)?.title || ''
    },
    hasExternalLinks() {
      const details = this.details as MovieDetails
      return details?.generic?.imdb || details?.generic?.yt_id
    },
  },
})
</script>

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
