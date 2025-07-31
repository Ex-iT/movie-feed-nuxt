<script lang="ts">
export default defineComponent({
  name: 'CardItem',
})
</script>

<template>
  <li class="card" :class="$attrs.class">
    <slot />
  </li>
</template>
