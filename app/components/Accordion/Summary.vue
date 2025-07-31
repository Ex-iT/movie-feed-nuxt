<script lang="ts">
export default defineComponent({
  name: 'AccordionSummary',
})
</script>

<template>
  <summary :class="$attrs.class">
    <slot />
  </summary>
</template>
