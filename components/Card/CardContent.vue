<template>
  <article>
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
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import ProgressIndicator from '~/components/ProgressIndicator.vue'
import Sharer from '~/components/Sharer.vue'
import Details from '~/components/Details.vue'
import { CacheableProg } from '~/types/sharedTypes'

export default Vue.extend({
  name: 'CardComponent',
  components: { ProgressIndicator, Sharer, Details },
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
})
</script>
