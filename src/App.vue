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
  <component  :is="layouts[route.meta.layout || 'default']">
    <router-view  class="router-container"/>
  </component>
</template>
<style lang="scss" src="@/styles/styles.scss"></style>