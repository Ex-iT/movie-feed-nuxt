<template>
  <li class="card" :class="$attrs.class">
    <slot></slot>
  </li>
</template>
<script lang="ts">
export default defineComponent({
  name: 'CardItem',
})
</script>
