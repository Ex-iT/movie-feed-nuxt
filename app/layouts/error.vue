<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <main>
    <slot :error="props.error" />
  </main>
</template>

<style scoped>
main {
  text-align: center;
}
</style>
