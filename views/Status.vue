<template>
  <main>
    <h1>Status</h1>
    <section>
      <CardComponent :fetch-state="fetchState">
        <CardItem
          v-for="({ createdAt, log }, index) in pageData"
          :key="index"
          class="status"
          :class="{ error: !log.success }"
        >
          <article>
            <h2>
              <span v-if="log.success">✅</span>
              <span v-else>❌</span>
              {{ createdAt }}
            </h2>
            <p v-if="log.message">
              {{ log.message }}
            </p>
            <p v-else-if="log.success">Success.</p>
          </article>
        </CardItem>
      </CardComponent>
    </section>
  </main>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import CardComponent from '~/components/Card/index.vue'
import { FetchStateProp } from '~/props/sharedProps'
import { Status } from '~/types/sharedTypes'

export default Vue.extend({
  name: 'StatusView',
  components: { CardComponent },
  props: {
    pageData: {
      type: Array as PropType<Status[]>,
      default: () => [],
      required: true,
    },
    fetchState: FetchStateProp,
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

article {
  flex-direction: column;
  row-gap: var(--spacing-medium);
  width: 100%;
}

h2 {
  display: flex;
  column-gap: var(--spacing-medium);
  margin: 0;
}
</style>
