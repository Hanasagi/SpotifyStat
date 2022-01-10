import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'

createApp(App).use(VueCookies, {
    expireTimes: Infinity,	
    httpOnly:true,
    secure: true,
    sameSite: "None"
}).use(router).mount('#app')
