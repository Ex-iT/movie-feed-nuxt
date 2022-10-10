<template>
  <StatusView />
</template>

<script lang="ts">
import Vue from 'vue'
import StatusView from '~/views/Status.vue'

export default Vue.extend({
  name: 'StatusPage',
  components: { StatusView },
})
</script>
