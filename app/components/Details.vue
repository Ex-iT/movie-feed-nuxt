<template>
  <div class="asset-details">
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
import { EMPTY_IMG } from '~/config'
import type { Programme, MovieDetails } from '~~/shared/types/sharedTypes'

export default defineComponent({
  name: 'AssetDetails',
  props: {
    programme: {
      type: Object as () => Programme,
      required: true,
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
