<template>
  <main>
    <h1>This is not a page...</h1>
    <p>What are you doing here? 👀</p>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

interface ErrorObject {
  statusCode: number
  path: string
  message: string
}

const defaultErrorObject = {
  statusCode: 0,
  path: '',
  message: '',
}

export default Vue.extend({
  layout: 'error',
  props: {
    error: {
      type: Object as () => ErrorObject,
      default: () => defaultErrorObject,
    },
  },
})
</script>

<style scoped>
main {
  padding: 1em;
  font-family: Arial, sans-serif;
  line-height: 1.375em;
  color: var(--foreground-color-main);
  text-align: center;
}
</style>
