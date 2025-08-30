<script setup lang="ts">
const detailsRef = useTemplateRef<HTMLDetailsElement>('detailsRef')

function handleClick() {
  if (detailsRef.value) {
    detailsRef.value.open = !detailsRef.value.open
  }
}
</script>

<template>
  <details ref="detailsRef" @click.prevent="handleClick">
    <summary>
      <slot name="summary" />
    </summary>
    <div>
      <article>
        <slot name="content" />
      </article>
    </div>
  </details>
</template>

<style>
:root {
  interpolate-size: allow-keywords;
}
</style>

<style scoped>
details {
  position: relative;
  flex-direction: column;
  column-gap: var(--spacing-medium);
  padding: var(--spacing-medium);
}

summary {
  display: flex;
  column-gap: var(--spacing-medium);
  padding-right: var(--spacing-medium);
  list-style: none;

  &::marker,
  &::-webkit-details-marker {
    display: none;
  }
}

::details-content {
  transition:
    height 0.3s ease-in-out,
    content-visibility 0.3s allow-discrete;
  height: 0;
  overflow: clip;
}

[open]::details-content {
  height: auto;
}

article {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-medium);
  padding-top: var(--spacing-medium);
  padding-right: var(--spacing-medium);
  margin-left: calc(40px + var(--spacing-medium));
}
</style>
