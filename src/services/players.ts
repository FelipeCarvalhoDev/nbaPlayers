import api from './../api'
import type { PlayersResponse, Player } from './../types'

export const getPlayers = async (page = 1, perPage = 100): Promise<PlayersResponse> => {
  return new Promise((resolve, reject) => {
    api
      .get('/players', {
        params: {
          page,
          per_page: perPage,
          next_cursor: 100
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