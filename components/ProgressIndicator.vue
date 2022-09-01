<template>
  <progress :max="max" :aria-label="label" :value="progress">
    {{ progress }}%
  </progress>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProgressIndicator',
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    label: {
      type: String,
      default: 'Voortgang',
    },
  },
})
</script>

<style scoped>
progress {
  position: absolute;
  inset: auto 0 0 0;
  width: 100%;
  height: 2px;
  background-color: rgb(225 75 75 / 30%);
  border: none;
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  transition: all 500ms ease-out;
}

progress[value='0'] {
  display: none;
}

progress::-webkit-progress-bar {
  background-color: rgb(225 75 75 / 30%);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}

progress::-webkit-progress-value {
  background-color: rgb(225 75 75 / 80%);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  transition: width 500ms ease-out;
}

progress::-moz-progress-bar {
  background-color: rgb(225 75 75 / 80%);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  transition: width 500ms ease-out;
}
</style>
