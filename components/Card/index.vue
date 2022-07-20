<template>
  <ol>
    <template v-if="fetchState.pending">
      <CardItem class="loading" />
      <CardItem class="loading" />
      <CardItem class="loading" />
    </template>

    <template v-if="fetchState.error">
      <CardItem class="error">
        <h2>Data kan niet opgehaald worden, probeer het later nog eens.</h2>
      </CardItem>
    </template>

    <CardItem
      v-for="(programme, index) in programmes"
      v-else
      :key="`${programme.main_id}-${index}`"
      @card-item-clicked="handleClick(programme.main_id)"
    >
      <img
        :src="programme.channel_logo"
        :alt="programme.channel_label"
        class="logo"
        width="40"
        height="40"
      />
      <div class="info">
        <div class="details">
          <h2>{{ programme.title }}</h2>
          {{ programme.start }} - {{ programme.end }}
        </div>
        <Details :programme="programme" :is-open="isOpen[programme.main_id]" />
        <Sharer :programme="programme" />
      </div>
      <ProgressIndicator :progress="programme.progress" />
    </CardItem>
  </ol>
</template>

<script lang="ts">
import Vue from 'vue'
import Sharer from '../Sharer.vue'
import Details from '../Details.vue'
import ProgressIndicator from '../ProgressIndicator.vue'
import CardItem from './CardItem.vue'
import { EnrichedProg, FetchtState } from '~/types/sharedTypes'

export default Vue.extend({
  name: 'CardComponent',
  components: { CardItem, Details, Sharer, ProgressIndicator },
  props: {
    programmes: {
      type: Array as () => EnrichedProg[],
      required: true,
    },
    fetchState: {
      type: Object as () => FetchtState,
      default: () => ({
        pending: false,
        error: false,
      }),
    },
  },
  data(): {
    isOpen: { [key: string]: boolean }
  } {
    return {
      isOpen: {},
    }
  },
  methods: {
    handleClick(id: string) {
      this.isOpen = Object.assign({}, this.isOpen, { [id]: !this.isOpen[id] })
    },
  },
})
</script>

<style scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
}

.error h2 {
  font-size: 1rem;
  color: #f44336;
  margin: 0;
}
</style>
