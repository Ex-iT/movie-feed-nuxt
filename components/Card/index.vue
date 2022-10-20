<template>
  <ul>
    <template v-if="fetchState.pending">
      <CardItem class="loading" />
      <CardItem class="loading" />
      <CardItem class="loading" />
    </template>

    <CardItem v-if="fetchState.error" class="error">
      <h2>Data kan niet worden opgehaald, probeer het later nog eens.</h2>
    </CardItem>

    <template v-else>
      <slot></slot>
    </template>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { FetchStateProp } from '~/props/sharedProps'

export default Vue.extend({
  name: 'CardComponent',
  props: {
    fetchState: FetchStateProp,
  },
})
</script>

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
