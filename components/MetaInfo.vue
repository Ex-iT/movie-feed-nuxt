<template>
  <div class="meta-info">
    <p v-if="programme?.tvg_rating">
      <strong>Waardering:</strong> {{ programme.tvg_rating }}
    </p>

    <p v-if="details?.generic?.year">
      <strong>Jaar:</strong> {{ details.generic.year }}
    </p>

    <p
      v-for="({ label, value }, index) in details?.metadata.items"
      :key="index"
    >
      <strong>{{ label }}:</strong> {{ value }}
    </p>

    <div v-if="details?.metadata.guidance?.length" class="guidance">
      <strong>Kijkwijzer:</strong>
      <ul>
        <li
          v-for="({ name, icon }, index) in details.metadata.guidance"
          :key="index"
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
        v-if="details?.generic?.imdb"
        :href="`${imdbUrl}${details.generic.imdb}`"
        target="_blank"
        rel="noreferrer noopener"
        @click.stop
      >
        <img
          src="~assets/svg/logo_imdb.svg"
          :alt="`Bekijk ${programme?.title} op IMDb`"
          :title="`Bekijk ${programme?.title} op IMDb`"
          width="79"
          height="40"
        />
      </a>

      <a
        v-if="details?.generic?.yt_id"
        :href="`${ytUrl}${details.generic.yt_id}`"
        target="_blank"
        rel="noreferrer noopener"
        @click.stop
      >
        <img
          src="~assets/svg/yt_btn_play.svg"
          :alt="`Bekijk ${programme?.title} op YouTube`"
          :title="`Bekijk ${programme?.title} op YouTube`"
          width="57"
          height="40"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CacheableProg, MovieDetails } from '~/types/sharedTypes'
import { IMDB_URL, YT_URL } from '~/config'

export default Vue.extend({
  props: {
    programme: {
      type: Object as () => CacheableProg,
      default: () => {},
    },
    details: {
      type: Object as () => MovieDetails,
      default: () => {},
    },
  },
  data(): {
    imdbUrl: string
    ytUrl: string
  } {
    return {
      imdbUrl: IMDB_URL,
      ytUrl: YT_URL,
    }
  },
  computed: {
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
