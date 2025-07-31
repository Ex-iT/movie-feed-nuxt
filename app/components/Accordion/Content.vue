<script lang="ts">
export default defineComponent({
  name: 'AccordionContent',
})
</script>

<template>
  <article :class="$attrs.class">
    <slot />
  </article>
</template>
