<template>
  <div class="asset-details">
    <div class="asset-image">
      <nuxt-img :src="mainImage" :alt="alt" width="615" height="400" />
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
import { Programme, MovieDetails } from '~/types/sharedTypes'
import { EMPTY_IMG } from '~/config'

export default Vue.extend({
  name: 'AssetDetails',
  props: {
    programme: {
      type: Object as () => Programme,
      required: true,
    },
  },
  computed: {
    mainImage(): string {
      return (this.programme as Programme).details?.generic?.image || EMPTY_IMG
    },
    details(): MovieDetails | null {
      return (this.programme as Programme).details || null
    },
    alt(): string {
      return (this.programme as Programme).details?.generic?.title || ''
    },
  },
})
</script>
