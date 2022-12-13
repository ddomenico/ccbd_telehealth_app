import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Lost from './views/Lost.vue'

const ifNotAuthenticated = (to, from, next) => {
  //   if (!store.getters.isAuthenticated) {
  //     next()
  //     return
  //   }
  //   next('/')
      next()
      return
}

const ifAuthenticated = (to, from, next) => {
    //   if (store.getters.isAuthenticated) {
    //     next()
    //     return
    //   }
    //   next(`/login?next=${to.fullPath}`)
        next()
        return
}

const routes = [
  { 
    path: '/login',
    component: Login,
    name: 'login'
  },
  { 
    path: '/about',
    component: About,
    name: 'about'
  },
  {
    path: '/:pathMatch(.*)*',
    component: Lost
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router