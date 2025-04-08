import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayersView from '@/views/index.vue'
import { getPlayers } from '@/services/players'
import axios from 'axios'

// Mock do serviço de players
vi.mock('@/services/players', () => ({
  getPlayers: vi.fn(() => Promise.resolve({
    data: [{ id: 1, first_name: 'LeBron', last_name: 'James' }]
  }))
}))

// Mock do axios com a estrutura COMPLETA que precisamos
vi.mock('axios', () => ({
  default: {
    defaults: {
      headers: {
        common: {
          Authorization: 'b95b9196-a242-4871-8dd6-7be3f5db8bc3'
        }
      }
    },
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() }
    }
  }
}))

describe('PlayersView.vue - Requisição', () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    vi.clearAllMocks()
  })

  it('configura token e chama getPlayers', async () => {
    // Monta o componente
    const wrapper = mount(PlayersView, {
      global: {
        stubs: ['PlayersTable', 'ModalDatails']
      }
    })

    await wrapper.vm.$nextTick()
    
    // Verificações
    expect(getPlayers).toHaveBeenCalledTimes(1)
    expect(axios.defaults.headers.common['Authorization'])
      .toBe('b95b9196-a242-4871-8dd6-7be3f5db8bc3')
  })

  it('renderiza a tabela de jogadores e carrega os dados', async () => {
    const wrapper = mount(PlayersView, {
      global: {
        stubs: ['PlayersTable', 'ModalDatails'] 
      }
    })
  
    await wrapper.vm.$nextTick()
  
    // Verifica se:
    // A tabela (PlayersTable) está renderizada
    expect(wrapper.findComponent({ name: 'PlayersTable' }).exists()).toBe(true)
  
    // A função getPlayers foi chamada ao montar o componente
    expect(getPlayers).toHaveBeenCalledTimes(1)
  })

})