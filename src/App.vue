<template>
  <div class="container mx-auto p-4">  
    <Header/>  
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';

</script>

<style scoped>

</style>