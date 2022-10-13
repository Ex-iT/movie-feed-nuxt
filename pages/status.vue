<template>
  <StatusView :page-data="pageData" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Status } from '~/types/sharedTypes'
import StatusView from '~/views/Status.vue'

export default Vue.extend({
  name: 'StatusPage',
  components: { StatusView },
  async asyncData({ $http }) {
    const pageData = await $http.$get('status')
    return { pageData }
  },
  data(): {
    pageData: Status
  } {
    return {
      pageData: {
        createdAt: '',
        log: {
          message: '',
          success: true,
        },
      },
    }
  },
  head() {
    return {
      title: 'Status | MovieFeed | IsHetAlDonderdag.nl',
      meta: [
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
})
</script>
