<template>
  <main>
    <h1>Status</h1>
    <section>
      <ul>
        <CardItem
          v-for="({ createdAt, log }, index) in status"
          :key="index"
          :class="{ error: !log.success }"
          class="card"
        >
          <h2>
            <span v-if="log.success">✅</span>
            <span v-else>❌</span>
            {{ createdAt }}
          </h2>
          <p v-if="log.message">
            {{ log.message }}
          </p>
          <p v-else-if="log.success">Success.</p>
        </CardItem>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status } from '~/types/sharedTypes'

export default Vue.extend({
  name: 'StatusView',
  data(): {
    status: Status[]
  } {
    return {
      status: [],
    }
  },
  async fetch() {
    this.status = await this.$http.$get('status')
  },
  head() {
    return {
      title: 'MovieFeed Status | IsHetAlDonderdag.nl',
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

<style scoped>
main {
  max-width: 720px;
  margin: auto;
}

ul {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-medium);
  padding: 0;
  list-style-type: none;
}

li {
  min-height: 76px;
}

h2 {
  display: flex;
  column-gap: var(--spacing-medium);
  margin: 0 0 var(--spacing-medium);
}

.card {
  flex-direction: column;
  cursor: unset;
  border: 1px solid transparent;
}

.error {
  border-color: var(--error-color-main);
}

.error h2 {
  color: var(--error-color-main);
}
</style>
