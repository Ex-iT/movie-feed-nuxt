<script setup lang="ts">
const props = withDefaults(defineProps<{
  progress?: number
  max?: number
  label?: string
}>(), {
  progress: 0,
  max: 100,
  label: 'Voortgang',
})
</script>

<template>
  <progress :max="props.max" :aria-label="props.label" :value="props.progress">
    {{ props.progress }}%
  </progress>
</template>

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
