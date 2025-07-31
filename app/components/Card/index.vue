<script setup lang="ts">
import type { FetchData } from '~~/shared/types/Common'

const props = defineProps<{
  fetchData: FetchData
}>()
</script>

<template>
  <ul>
    <template v-if="props.fetchData.pending">
      <CardItem class="loading" />
      <CardItem class="loading" />
      <CardItem class="loading" />
    </template>

    <CardItem v-if="props.fetchData.error" class="error">
      <h2>Data kan niet worden opgehaald, probeer het later nog eens.</h2>
    </CardItem>

    <template v-else>
      <slot />
    </template>
  </ul>
</template>

<style scoped>
.error {
  display: flex;
  align-items: center;
  justify-content: center;
}

.error h2 {
  padding-inline: var(--spacing-medium);
  margin: 0;
  font-size: 1rem;
}
</style>
