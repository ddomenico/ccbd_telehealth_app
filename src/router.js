import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Lost from './views/Lost.vue'
import Appointments from './views/Appointments.vue'
import MakeAppointment from './views/MakeAppointment.vue'
import PatientTable from './views/PatientTable.vue'

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
    path: '/:doctorID/appointments',
    component: Appointments,
    name: 'appointments'
  },
  { 
    path: '/:patientID/makeAppointment',
    component: MakeAppointment,
    name: 'makeAppointment'
  },
  { 
    path: '/:doctorID/patientTable',
    component: PatientTable,
    name: 'patientTable'
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