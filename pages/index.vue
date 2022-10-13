<template>
  <HomeView :page-data="pageData" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Cacheables } from '~/types/sharedTypes'
import HomeView from '~/views/Home.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { HomeView },
  async asyncData({ $http }) {
    const pageData = await $http.$get('cache')
    return { pageData }
  },
  data(): {
    pageData: Cacheables
  } {
    return {
      pageData: {
        today: [],
        tomorrow: [],
        log: {
          message: '',
          success: false,
        },
        createdAt: 0,
      },
    }
  },
})
</script>
