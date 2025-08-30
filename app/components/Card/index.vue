<script setup lang="ts">
import type { FetchData } from '~~/shared/types/Common'

const props = defineProps<{
  fetchData: FetchData
}>()
</script>

<template>
  <ul>
    <template v-if="props.fetchData.pending">
      <CardItem v-for="i in 10" :key="`loading-${i}`" class="loading" />
    </template>

    <CardItem v-if="props.fetchData.error" class="error">
      <h2>Film informatie kan niet worden opgehaald, probeer het later opnieuw.</h2>

      <button type="button" @click="props.fetchData.refresh">
        Opnieuw proberen
      </button>
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
  flex-direction: column;
  gap: var(--spacing-medium);
  padding: var(--spacing-medium) 0;
}

h2 {
  padding-inline: var(--spacing-medium);
  margin: 0;
  font-size: 1rem;
}

button {
  cursor: pointer;
  padding: var(--spacing-medium);
  background-color: var(--highlight-color-main);
  color: #fff;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-medium);
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: var(--foreground-color-main);
    color: var(--highlight-color-main);
  }
}
</style>
