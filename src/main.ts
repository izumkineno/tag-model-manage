import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 油猴打包
const container = document.createElement('div')
container.id = 'container'
document.body.appendChild(container)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App)
  .use(ElementPlus)
  .use(pinia)
  .mount('#container')

// 普通
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)
// createApp(App)
//   .use(ElementPlus)
//   .use(pinia)
//   .mount('#app')
