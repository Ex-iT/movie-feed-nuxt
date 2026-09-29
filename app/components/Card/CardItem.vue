<script setup lang="ts">
const props = defineProps<{
  pe?: string
}>()

const now = useNow()
const isMounted = ref(false)

const passed = computed(() => {
  if (!isMounted.value || !props.pe) {
    return false
  }
  return now.value > Number.parseInt(props.pe, 10)
})

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <li class="card" :class="{ passed }">
    <slot />
  </li>
</template>
