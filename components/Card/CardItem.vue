<template>
  <li class="card" :class="$attrs.class">
    <slot></slot>
  </li>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CardItem',
})
</script>
