<template>
  <article :class="$attrs.class">
    <slot></slot>
  </article>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AccordionContent',
})
</script>
