import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/views/index.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { 
      path: '/', 
      component: Home 
    }
  ]
})

export default router