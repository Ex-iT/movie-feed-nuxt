<template>
  <div class="asset-details" :class="{ open: isOpen }">
    <div class="asset-image">
      <span>
        <img
          :src="mainImage"
          :alt="details?.generic.title || ''"
          width="615"
          height="400"
        />
      </span>
    </div>
    <div class="synopsis">
      <strong v-if="programme.subgenre" class="prefix-description">{{
        programme.subgenre
      }}</strong>
      <p v-if="programme.descr">{{ programme.descr }}</p>
      <br v-else />
      <MetaInfo
        :programme="programme"
        :details="details"
        :is-loading="isLoading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MetaInfo from './MetaInfo.vue'
import { EnrichedProg, MovieDetails } from '~/types/sharedTypes'
import { EMPTY_IMG } from '~/config'

export default Vue.extend({
  name: 'AssetDetails',
  components: { MetaInfo },
  props: {
    programme: {
      type: Object as () => EnrichedProg,
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
    isLoading: boolean
  } {
    return {
      mainImage: EMPTY_IMG,
      details: null,
      isLoading: true,
    }
  },
  watch: {
    isOpen: {
      async handler(isOpen) {
        if (isOpen) {
          this.details = await this.$http.$get(
            `/api/v1/details/${this.programme.main_id}`
          )

          this.mainImage = this.details?.generic?.image || EMPTY_IMG
          this.isLoading = false
        }
      },
    },
  },
})
</script>
