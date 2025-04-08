<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Player } from '@/types'

const props = defineProps<{
  player: Player | null
  visible: boolean
}>()

const emit = defineEmits(['update-player', 'update:visible'])

const editedPlayer = ref<Player>({ ...props.player! })

watch(() => props.player, (newVal) => {
  if (newVal) editedPlayer.value = JSON.parse(JSON.stringify(newVal))
}, { immediate: true })

const saveChanges = () => {
  emit('update-player', { ...editedPlayer.value })
}
</script>

<template>
  <div class="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-xl">
      <h2 class="text-xl font-bold mb-4">Editar Jogador</h2>
      
      <div v-if="editedPlayer" class="space-y-4">
        <div class="flex flex-col md:flex-row justify-center items-center gap-4">
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700">Nome</label>
            <input
              v-model="editedPlayer.first_name"
              type="text"
              class="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700">Sobrenome</label>
            <input
              v-model="editedPlayer.last_name"
              type="text"
              class="mt-1 p-2 border rounded w-full"
            />
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-center items-center gap-4">
          <div class="w-full flex justify-center items-center gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Altura</label>
              <input
                v-model="editedPlayer.height"
                type="text"
                class="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Peso</label>
              <input
                v-model="editedPlayer.weight"
                type="text"
                class="mt-1 p-2 border rounded w-full"
              />
            </div>
          </div>
          <div class="w-full flex justify-center items-center gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Posição</label>
              <input
                v-model="editedPlayer.position"
                type="text"
                class="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">País</label>
              <input
                v-model="editedPlayer.country"
                type="text"
                class="mt-1 p-2 border rounded w-full"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-center items-center gap-4">
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700">Time</label>
            <input
              v-model="editedPlayer.team.full_name"
              type="text"
              class="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700">Divisão</label>
            <input
              v-model="editedPlayer.team.division"
              type="text"
              class="mt-1 p-2 border rounded w-full"
            />
          </div>
        </div>
        
      </div>
      
      <div class="mt-6 flex justify-end space-x-2">
        <button
          @click="emit('update:visible', false)"
          class="px-4 py-2 bg-gray-300 rounded cursor-pointer"
        >
          Cancelar
        </button>
        <button
          @click="saveChanges"
          class="px-4 py-2 bg-[#314284] text-white rounded cursor-pointer"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>
