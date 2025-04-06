import axios from 'axios'

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
    // Você pode adicionar autenticação aqui se necessário
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
    return Promise.reject(error)
  }
)

export default api