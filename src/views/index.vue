<script setup lang="ts">
import { ref } from 'vue'
import PlayersTable from '@/components/PlayersTable.vue'
import ModalDatails from '@/components/ModalDatails.vue'
import { getPlayers } from '@/services/players'
import type { Player } from '@/types'

const players = ref<Player[]>([])
const showModal = ref(false)
const selectedPlayer = ref<Player | null>(null)
const loading = ref(true)

const fetchPlayers = async () => {
  loading.value = true
  await getPlayers()
    .then((response) => {
      players.value = response.data 
    })
    .finally(() =>
      loading.value = false
    )

}

fetchPlayers()

const handleEditPlayer = (player: Player) => {
  selectedPlayer.value = { ...player } 
  showModal.value = true
}

const handleUpdatePlayer = (updatedPlayer: Player) => {
  const index = players.value.findIndex(p => p.id === updatedPlayer.id)
  if (index !== -1) {
    players.value[index] = updatedPlayer
    players.value = [...players.value] 
  }
  showModal.value = false
}

const handleUpdatePlayers = (updatedList: Player[]) => {
  players.value = updatedList
}
</script>

<template>
  <div class="container mx-auto">
    <PlayersTable
      :loading="loading"
      :players="players"
      @edit-player="handleEditPlayer"
      @update-players="handleUpdatePlayers"
    />
    <ModalDatails
      v-if="showModal"
      v-model:visible="showModal"
      :player="selectedPlayer"
      @update-player="handleUpdatePlayer"
    />
  </div>
</template>
