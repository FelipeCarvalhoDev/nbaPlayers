<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <div class="table">Hello Table</div>
    <div class="mb-4">
      <input
        v-model="globalSearch"
        type="text"
        placeholder="Buscar jogadores..."
        class="block md:w-1/2 w-full mx-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <vue3-datatable
      :rows="props.players"
      :columns="cols"
      :loading="loading"
      :sortable="true"
      :search="globalSearch"
      sortColumn="id"
      :pageSize="10"
      :paginationInfo="'Exibindo {0} a {1} do total de {2}'"
      skin="bh-table-hover bh-table-bordered"
    >
      <template #actions="data">
        <div class="flex space-x-2">
          <button 
            @click="handleEdit(data.value)"
            class="px-3 py-1 bg-[#314284] text-white rounded hover:bg-blue-600 transition"
          >
            Editar
          </button>
          <button
            @click="confirmDelete(data.value)"
            class="px-3 py-1 bg-[#ad2b34] text-white rounded hover:bg-red-600 transition"
          >
            Deletar
          </button>
        </div>
      </template>
    </vue3-datatable>
  </div>
  <Modal
    :visible="showDeleteModal"
    title="Confirmar exclusão"
    :message="deleteMessage"
    @cancel="cancelDelete"
    @confirm="confirmDeleteAction"
  />
</template>
<script setup lang="ts">
import Modal from '@/components/Modal.vue'

import { ref, onMounted, computed } from 'vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import { getPlayers, deletePlayer } from '@/services/players'
import type { Player } from '@/types'

const props = defineProps<{
  players: Player[]
}>()

const emit = defineEmits<{
  (e: 'edit-player', player: Player): void
  (e: 'update-players', players: Player[]): void
  (e: 'delete', playerId: number): void
}>()

const loading = ref(true)
const globalSearch = ref('')

const cols = ref([
  { field: 'id', title: 'ID', width: '100px', sort: true, type: 'number' },
  { field: 'first_name', title: 'Nome', sort: true },
  { field: 'last_name', title: 'Sobrenome', sort: true },
  { 
    field: 'position', 
    title: 'Posição',
    sort: true,
    render: (value: string) => value || 'N/A'
  },
  { 
    field: 'team.full_name', 
    title: 'Time',
    sort: true,
    render: (value: string) => value || 'N/A'
  },
  { 
    field: 'actions', 
    title: 'Ações',
    sort: false,
    width: '200px',
    isKey: true
  }
])

const fetchPlayers = async () => {
  try {
    loading.value = true
    const response = await getPlayers()
    emit('update-players', response.data)
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error)
  } finally {
    loading.value = false
  }
}

const handleEdit = (player: Player) => {
  emit('edit-player', player)
}


const deleteMessage = computed(() => {
  if (!playerToDelete.value) return 'Tem certeza que deseja excluir este jogador?'
  return `Tem certeza que deseja excluir ${playerToDelete.value.first_name} ${playerToDelete.value.last_name}?`
})

const showDeleteModal = ref(false)
const playerToDelete = ref<Player | null>(null)

const confirmDelete = (player: any) => {
  playerToDelete.value = player
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
  playerToDelete.value = null
}

const confirmDeleteAction = async () => {
  if (!playerToDelete.value) return

  try {
    await deletePlayer(playerToDelete.value.id)
    const updatedList = props.players.filter(p => p.id !== playerToDelete.value!.id)
    emit('update-players', updatedList)
  } catch (err) {
    console.error('Erro ao deletar jogador:', err)
    alert('Falha ao deletar jogador')
  } finally {
    cancelDelete()
  }
}

onMounted(fetchPlayers)
</script>