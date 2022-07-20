<template>
  <HomeView />
</template>

<script lang="ts">
import Vue from 'vue'
import HomeView from '~/views/Home.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { HomeView },
})
</script>
