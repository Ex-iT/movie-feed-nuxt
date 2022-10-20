<template>
  <StatusView :page-data="pageData" :fetch-state="$fetchState" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Status } from '~/types/sharedTypes'
import StatusView from '~/views/Status.vue'

export default Vue.extend({
  name: 'StatusPage',
  components: { StatusView },
  data(): {
    pageData: Status[]
  } {
    return {
      pageData: [],
    }
  },
  async fetch() {
    this.pageData = await this.$http.$get('status')
  },
  fetchOnServer: false,
  head() {
    return {
      title: 'Status - MovieFeed | IsHetAlDonderdag.nl',
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
