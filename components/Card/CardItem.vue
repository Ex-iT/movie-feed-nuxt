<template>
  <li class="card" :class="$attrs.class" @click="$emit('card-item-clicked', $event.target)">
    <slot></slot>
  </li>
</template>

