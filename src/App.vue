<template>
  <div class="container mx-auto p-4">  
    <Header/>  
    <router-view/>
    <Modal
      :visible="showModal"
      :title="modalContent.title"
      :message="modalContent.message"
    />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';

const showModal = ref(false);
const modalContent = ref({ title: '', message: '' });

provide('openModal', (title: string, message: string) => {
  modalContent.value = { title, message };
  showModal.value = true;
});

</script>

<style scoped>

</style>