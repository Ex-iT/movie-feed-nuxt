<template>
  <summary :class="$attrs.class">
    <slot></slot>
  </summary>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AccordionSummary',
})
</script>
