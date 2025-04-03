import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com', // Altere para sua API
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptores podem ser adicionados aqui
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se necessário
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api