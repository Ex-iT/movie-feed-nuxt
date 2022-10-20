<template>
  <article :class="$attrs.class"><slot></slot></article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AccordionContent',
})
</script>
