<template>
  <div class="asset-details" :class="{ open: isOpen }">
    <div class="asset-image">
      <img :src="mainImage" :alt="details?.generic.title || ''" />
    </div>
    <div class="synopsis">
      <p v-if="programme.descr">
        <strong v-if="programme.subgenre">{{ programme.subgenre }} </strong
        >{{ programme.descr }}
      </p>
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
      handler(isOpen) {
        if (isOpen) {
          this.fetchDetails(this.programme.main_id)
        }
      },
    },
  },
  methods: {
    async fetchDetails(id: string) {
      const prefixUrl = `${this.$http.getBaseURL()}api/v1`

      this.details = await this.$http.$get(`/details/${id}`, { prefixUrl })
      this.mainImage = this.details?.generic?.image || EMPTY_IMG
      this.isLoading = false
    },
  },
})
</script>
