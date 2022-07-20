<template>
  <fragment>
    <FixedBackground />
    <Nuxt />
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import { Fragment } from 'vue-fragment'
import FixedBackground from '../components/FixedBackground.vue'

export default Vue.extend({
  name: 'DefaultLayout',
  components: { Fragment, FixedBackground },
})
</script>
