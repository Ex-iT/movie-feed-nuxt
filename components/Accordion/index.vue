<template>
  <details ref="details">
    <AccordionSummary class="summary">
      <slot name="summary"></slot>
    </AccordionSummary>
    <AccordionContent class="content">
      <slot name="content"></slot>
    </AccordionContent>
  </details>
</template>

<script lang="ts">
import Vue from 'vue'
import { Accordion } from '~/lib/AccordionAnimation'

export default Vue.extend({
  name: 'AccordionComponent',
  mounted() {
    new Accordion(this.$refs.details as HTMLDetailsElement).init()
  },
})
</script>

<style scoped>
details {
  position: relative;
  display: flex;
  column-gap: var(--spacing-medium);
  padding: var(--spacing-medium);
}

.summary {
  position: relative;
  display: flex;
  column-gap: var(--spacing-medium);
  padding-right: var(--spacing-medium);
  list-style: none;
}

.content {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-medium);
  padding-top: var(--spacing-medium);
  padding-right: var(--spacing-medium);
  margin-left: calc(40px + var(--spacing-medium));
}
</style>
