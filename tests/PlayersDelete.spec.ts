// tests/components/PlayersTable.spec.ts
import { mount, flushPromises } from '@vue/test-utils'
import PlayersTable from '@/components/PlayersTable.vue'
import { describe, it, expect, vi } from 'vitest'
import type { Player } from '@/types'
import { deletePlayer as mockDeletePlayer } from '@/services/players'

// Mock da função deletePlayer
vi.mock('@/services/players', () => ({
  deletePlayer: vi.fn()
}))

describe('PlayersTable.vue - exclusão de jogador', () => {
  const mockPlayer: Player = {
    id: 1,
    first_name: 'João',
    last_name: 'Silva',
    height: '1.85m',
    weight: '80kg',
    position: 'Atacante',
    country: 'Brasil',
    team: {
      full_name: 'Time FC',
      division: 'A'
    }
  }

  const mountComponent = () => {
    return mount(PlayersTable, {
      props: {
        players: [mockPlayer],
      }
    })
  }

  it('deve chamar deletePlayer e emitir update-players após confirmar exclusão', async () => {
    const wrapper = mountComponent()

    // Abre o modal de deletar
    await wrapper.vm.confirmDelete(mockPlayer)
    expect(wrapper.vm.showDeleteModal).toBe(true)

    // Mock resolve de deletar
    mockDeletePlayer.mockResolvedValueOnce({})

    // Confirma a exclusão
    await wrapper.vm.confirmDeleteAction()
    await flushPromises()

    // Verifica se deletePlayer foi chamado corretamente
    expect(mockDeletePlayer).toHaveBeenCalledWith(mockPlayer.id)

    // Verifica se o evento foi emitido com a lista sem o jogador deletado
    const updatePlayersEmit = wrapper.emitted('update-players')
    expect(updatePlayersEmit).toBeTruthy()
    expect(updatePlayersEmit![0][0]).toEqual([]) 

    // Verifica se o modal foi fechado
    expect(wrapper.vm.showDeleteModal).toBe(false)
  })
})
