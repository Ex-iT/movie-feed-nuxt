<template>
  <main>
    <h1>This is not a page...</h1>
    <p>What are you doing here? 👀</p>
  </main>
</template>

<script lang="ts">
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

export default defineComponent({
  name: 'ErrorLayout',
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
  text-align: center;
}
</style>
