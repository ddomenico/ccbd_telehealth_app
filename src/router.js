import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Lost from './views/Lost.vue'
import Appointments from './views/Appointments.vue'
import MakeAppointment from './views/MakeAppointment.vue'
import PatientProfile from './views/PatientProfile.vue'
import PatientTable from './views/PatientTable.vue'
import Profile from './views/Profile.vue'
import Allergy from './views/Allergy.vue'
import BasicInfo from './views/BasicInfo.vue'
import FamilyHistory from './views/FamilyHistory.vue'
import Immunization from './views/Immunization.vue'
import Medication from './views/Medication.vue'
import Chatbot from './views/Chatbot.vue'
import PatientAppointment from './views/patientAppointments.vue'

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
    path: '/getAppointments',
    component: Appointments,
    name: 'appointments'
  },
  { 
    path: '/makeAppointment',
    component: MakeAppointment,
    name: 'makeAppointment'
  },
  { 
    path: '/getPatientTable',
    component: PatientTable,
    name: 'patientTable'
  },
  { 
    path: '/patient-:patientID-report',
    component: PatientProfile,
    name: 'patientProfile'
  },
  {
    path: '/myAppointments',
    component: PatientAppointment,
    name: 'patientAppointments'
  },
  { 
    path: '/profile',
    component: Profile,
    name: 'profile',
    children: [
      {
        path: '/profile/allergy',
        name: 'allergy',
        component: Allergy
      },
      {
        path: '/profile/basicinfo',
        name: 'basicinfo',
        component: BasicInfo
      },
      {
        path: '/profile/familyhistory',
        name: 'familyhistory',
        component: FamilyHistory
      },
      {
        path: '/profile/immunization',
        name: 'immunization',
        component: Immunization
      },
      {
        path: '/profile/medication',
        name: 'medication',
        component: Medication
      },
      {
        path: '/profile/chatbot',
        name: 'chatbot',
        component: Chatbot
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router