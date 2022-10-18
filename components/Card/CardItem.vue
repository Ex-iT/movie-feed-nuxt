<template>
  <li
    class="card"
    :class="$attrs.class"
    @click="$emit('card-item-clicked', $event)"
  >
    <slot></slot>
  </li>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CardItem',
})
</script>
