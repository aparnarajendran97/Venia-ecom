<!-- src/App.vue -->
<script setup>
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()

const layouts = {
  default: DefaultLayout,
}
</script>

<template>
  <component :is="layouts[route.meta.layout || 'default']">
    <router-view />
  </component>
</template>
<style >
.body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  background-color: #f5f5f5;
  overflow: hidden!important;
}


</style>