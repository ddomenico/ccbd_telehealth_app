import { createApp } from 'vue'
import App from './App.vue'
// import router from './router.js'
import router from './router'
import { Amplify } from 'aws-amplify';
import AmplifyVue from '@aws-amplify/ui-vue';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

import './assets/main.css'

const app = createApp(App)
app.use(AmplifyVue);
app.use(router)
app.mount('#app')
