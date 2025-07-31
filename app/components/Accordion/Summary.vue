<template>
  <summary :class="$attrs.class">
    <slot></slot>
  </summary>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AccordionSummary',
})
</script>
