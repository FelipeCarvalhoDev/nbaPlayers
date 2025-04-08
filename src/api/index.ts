import axios from 'axios'
import { showModal } from '@/utils/modalManager';


const api = axios.create({
  baseURL: 'https://api.balldontlie.io/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'b95b9196-a242-4871-8dd6-7be3f5db8bc3'
  },
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if(error.status === 401) {
      showModal('Falha na autenticação', 'Sem permissão de acesso. Verifique seu token de autorização.')
    }
    if(error.status === 404) {
      showModal('Rota não encontrada', 'Verifique a rota que está tentando usar.')
    }
    if(error.status === 500) {
      showModal('Erro interno', 'Por favor tente novamente mais tarde.')
    }
    return Promise.reject(error)
  }
)

export default api