<template>
  <button v-if="canShare" type="button" @click.stop.prevent="share">
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M72 56c-4.813 0-9.12 2.137-12.054 5.501L39.643 51.35c.23-1.081.357-2.201.357-3.35s-.127-2.269-.357-3.349l20.303-10.152C62.879 37.864 67.187 40 72 40c8.836 0 16-7.164 16-16S80.836 8 72 8s-16 7.164-16 16c0 1.149.127 2.269.357 3.349L36.054 37.501C33.121 34.136 28.814 32 24 32c-8.836 0-16 7.164-16 16s7.164 16 16 16c4.814 0 9.12-2.137 12.054-5.501l20.304 10.152C56.127 69.731 56 70.851 56 72c0 8.836 7.164 16 16 16s16-7.164 16-16-7.164-16-16-16zm0-40a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM24 56a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm48 24a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
      />
    </svg>
    <span class="a11y-only">Delen</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import ucFirst from '~/lib/ucFirst'

export default Vue.extend({
  name: 'SharerButton',
  props: {
    programme: {
      type: Object,
      required: true,
    },
  },
  computed: {
    canShare() {
      return typeof window !== 'undefined' ? !!window.navigator?.share : false
    },
  },
  methods: {
    share() {
      const { deep_link, title, channel_label, start, end, day } =
        this.programme

      navigator.share({
        title: `${title} ${day} op ${channel_label} om ${start}`,
        text: `${title}\n${ucFirst(day)} ${channel_label}, ${start} - ${end}\n`,
        url: deep_link,
      })
    },
  },
})
</script>

<style scoped>
button {
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: auto;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  fill: #fff;
}

svg {
  transition: fill 200ms ease-in;
}

button:hover svg {
  fill: var(--highlight-color-main);
}
</style>
