<template>
  <fragment>
    <nuxt-img
      :src="programme.channel_logo"
      :alt="programme.channel_label"
      width="40"
      height="40"
    />
    <div class="info">
      <div class="details">
        <h2>{{ programme.title }}</h2>
        {{ programme.start }} - {{ programme.end }}
      </div>
      <Details :programme="programme" :is-open="isOpen" />
      <Sharer :programme="programme" />
    </div>
    <ProgressIndicator :progress="programme.progress" />
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import { Fragment } from 'vue-fragment'
import ProgressIndicator from '~/components/ProgressIndicator.vue'
import Sharer from '~/components/Sharer.vue'
import Details from '~/components/Details.vue'
import { EnrichedProg } from '~/types/sharedTypes'

export default Vue.extend({
  name: 'CardComponent',
  components: { Fragment, ProgressIndicator, Sharer, Details },
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
})
</script>
