<template>
  <div class="asset-details" :class="{ open: isOpen }">
    <div class="asset-image">
      <nuxt-img
        :src="mainImage"
        :alt="details?.generic.title || ''"
        width="615"
        height="400"
      />
    </div>
    <div class="synopsis">
      <p v-if="programme.descr">
        <strong v-if="programme.subgenre">{{ programme.subgenre }} </strong
        >{{ programme.descr }}
      </p>
      <MetaInfo :programme="programme" :details="programme.details" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CacheableProg, MovieDetails } from '~/types/sharedTypes'
import { EMPTY_IMG } from '~/config'

export default Vue.extend({
  name: 'AssetDetails',
  props: {
    programme: {
      type: Object as () => CacheableProg,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data(): {
    mainImage: string
    details: MovieDetails | null
  } {
    return {
      mainImage: this.programme.details?.generic?.image || EMPTY_IMG,
      details: this.programme.details || null,
    }
  },
})
</script>
