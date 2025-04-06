<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Player } from '@/types'

const props = defineProps<{
  player: Player | null
  show: boolean
}>()

const emit = defineEmits(['close', 'save'])

const editedPlayer = ref<Player | null>(null)

watch(() => props.player, (newVal) => {
  editedPlayer.value = newVal ? { ...newVal } : null
}, { immediate: true })

const handleSave = () => {
  if (editedPlayer.value) {
    emit('save', editedPlayer.value)
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Editar Jogador</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nome</label>
          <input
            v-model="editedPlayer.first_name"
            type="text"
            class="mt-1 p-2 border rounded w-full"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Sobrenome</label>
          <input
            v-model="editedPlayer.last_name"
            type="text"
            class="mt-1 p-2 border rounded w-full"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Posição</label>
          <input
            v-model="editedPlayer.position"
            type="text"
            class="mt-1 p-2 border rounded w-full"
          />
        </div>
      </div>
      
      <div class="mt-6 flex justify-end space-x-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-300 rounded"
        >
          Cancelar
        </button>
        <button
          @click="handleSave"
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>