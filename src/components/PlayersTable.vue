<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <div class="mb-4">
      <input
        v-model="globalSearch"
        type="text"
        placeholder="Buscar jogadores..."
        class="block md:w-1/2 w-full mx-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <vue3-datatable
      :rows="players"
      :columns="cols"
      :loading="loading"
      :sortable="true"
      :search="globalSearch"
      sortColumn="id"
      :pageSize="10"
      :paginationInfo="`Exibindo {0} a {1} do total de {2}`"
      skin="bh-table-hover bh-table-bordered"
    >
      <template #actions="data">
        <div class="flex space-x-2">
          <button 
            @click="handleEdit(data.value.id)"
            class="px-3 py-1 bg-[#314284] text-white rounded hover:bg-blue-600 transition"
          >
            Editar
          </button>
          <button
            @click="handleDelete(data.value)"
            class="px-3 py-1 bg-[#ad2b34] text-white rounded hover:bg-red-600 transition"
          >
            Deletar
          </button>
        </div>
      </template>
    </vue3-datatable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import { getPlayers } from '@/services/players'
import type { Player } from '@/types'

const players = ref<Player[]>([])
const loading = ref(true)
const globalSearch = ref('')

// Configuração das colunas
const cols = ref([
  { 
    field: 'id', 
    title: 'ID', 
    width: '100px', 
    sort: true, 
    type: 'number' 
  },
  { 
    field: 'first_name', 
    title: 'Nome', 
    sort: true },
  { 
    field: 'last_name', 
    title: 'Sobrenome', 
    sort: true },
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

// Busca os jogadores
const fetchPlayers = async () => {
  try {
    loading.value = true
    const response = await getPlayers()
    players.value = response.data
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error)
  } finally {
    loading.value = false
  }
}

// Ações
const handleEdit = (player: Player) => {
  console.log('Editar jogador:', player)
}

const handleDelete = (player: Player) => {  
  if (confirm(`Deletar ${player.first_name} ${player.last_name}?`)) {
    console.log('Deletar jogador:', player)
  }
}

onMounted(fetchPlayers)
</script>

<style>
.bh-table-hover tbody tr:hover {
  background-color: #f8fafc;
}
.bh-pagination .bh-page-item:hover,
.bh-pagination .bh-page-item.bh-active {
  background-color: #314284;
  border-color: #314284;
}
</style>