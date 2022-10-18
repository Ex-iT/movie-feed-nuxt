<template>
  <HomeView :page-data="pageData" :fetch-state="$fetchState" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Cacheables } from '~/types/sharedTypes'
import HomeView from '~/views/Home.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { HomeView },
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
  async fetch() {
    this.pageData = await this.$http.$get('cache')
  },
})
</script>
