<script setup lang="ts">
import { modalState, hideModal } from '@/utils/modalManager';
</script>

<template>
  <div v-if="modalState.isVisible" class="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-xl text-center">
      <h2 class="text-xl font-bold mb-4">{{ modalState.title }}</h2>
      <p class="mb-12">{{ modalState.message }}</p>

      <div class="flex gap-4">
        <button
          @click="hideModal"
          class="w-1/2 mx-auto px-4 py-2 bg-gray-300 rounded cursor-pointer"
        >
          Fechar
        </button>
      </div>   
    </div>   
  </div>
</template>
