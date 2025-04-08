<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  title: string
  message: string
}>()

const emit = defineEmits(['cancel', 'confirm'])
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-xl text-center">
      <h2 class="text-xl font-bold mb-4">{{ props.title }}</h2>
      <p class="mb-12">{{ props.message }}</p>

      <div class="flex gap-4">
        <button
          @click="emit('cancel')"
          class="w-full px-4 py-2 bg-gray-300 rounded cursor-pointer"
        >
          Cancelar
        </button>
        <button
          @click="emit('confirm')"
          class="w-full px-4 py-2 bg-[#314284] text-white rounded cursor-pointer"
        >
          Excluir
        </button>
      </div>   
    </div>   
  </div>
</template>
