import api from './../api'
import type { PlayersResponse, Player, DetailsPlayers } from './../types'

export const getPlayers = async (page = 1, perPage = 20): Promise<PlayersResponse> => {
  return new Promise((resolve, reject) => {
    api
      .get('/players', {
        params: {
          page,
          per_page: perPage,
        }
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((e) => {
        reject(e);
      })
      .finally();
  });
}

export const getDetails = async (id: number): Promise<DetailsPlayers> => {
  return api.get(`/players/${id}`)
}

// Simulação de edição (a API real não permite)
export const updatePlayer = (player: Player): Promise<Player> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Jogador atualizado (simulado):', player)
      resolve(player)
    }, 1000)
  })
}

// Simulação de exclusão (a API real não permite)
export const deletePlayer = (playerId: number): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Jogador deletado (simulado):', playerId)
      resolve({ success: true })
    }, 1000)
  })
}