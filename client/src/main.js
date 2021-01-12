import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// createApp(App).use(socket).use(store).use(ElementPlus).use(router).mount('#app')
createApp(App).use(store).use(ElementPlus).use(router).mount('#app')
