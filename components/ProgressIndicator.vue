<template>
  <div v-if="progress > 0" class="progress-bar">
    <div :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProgressIndicator',
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
})
</script>
