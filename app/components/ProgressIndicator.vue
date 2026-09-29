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
  background-color: var(--color-progress-track);
  border: none;
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  transition: all var(--transition-progress);
}

progress[value='0'] {
  display: none;
}

progress::-webkit-progress-bar {
  background-color: var(--color-progress-track);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}

progress::-webkit-progress-value {
  background-color: var(--color-progress-fill);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  transition: width var(--transition-progress);
}

progress::-moz-progress-bar {
  background-color: var(--color-progress-fill);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  transition: width var(--transition-progress);
}
</style>
