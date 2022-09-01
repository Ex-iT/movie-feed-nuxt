<template>
  <div class="meta-info">
    <p v-if="isLoading" class="loading"></p>
    <p v-else-if="programme?.tvg_rating">
      <strong>Waardering:</strong> {{ programme.tvg_rating }}
    </p>

    <p v-if="isLoading" class="loading"></p>
    <p v-else-if="details?.generic?.year">
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
          <img :src="icon" :alt="name" :title="name" width="20" height="20" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { EnrichedProg, MovieDetails } from '~/types/sharedTypes'

export default Vue.extend({
  props: {
    programme: {
      type: Object as () => EnrichedProg,
      default: () => {},
    },
    details: {
      type: Object as () => MovieDetails,
      default: () => {},
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style scoped>
.guidance {
  display: flex;
  column-gap: var(--spacing-medium);
}

.guidance ul {
  display: flex;
  column-gap: var(--spacing-medium);
  padding: 0;
  list-style-type: none;
}

.guidance img {
  background-color: #fff;
  border-radius: 50%;
}
</style>
