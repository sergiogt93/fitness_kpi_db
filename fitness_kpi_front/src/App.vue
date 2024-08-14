<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue'
</script>

<template>
  <header>
    <NavbarComponent />
  </header>
  <RouterView />
</template>

<style scoped></style>
