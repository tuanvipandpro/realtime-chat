import { createApp } from 'vue'
import VueSocketIO from 'wsj.vue-socket.io'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const socket = new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    withCredentials: true,
})

createApp(App).use(socket).use(store).use(ElementPlus).use(router).mount('#app')
// createApp(App).use(store).use(ElementPlus).use(router).mount('#app')
