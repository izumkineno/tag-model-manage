import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 油猴打包
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const target = document.querySelector('body > gradio-app').shadowRoot.querySelector('#app') as HTMLElement
// createApp(App)
//   .use(createPinia())
//   .mount(target)
// 油猴测试
// createApp(App)
//   .use(createPinia())
//   .mount('#app')
// 普通
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App)
  .use(ElementPlus)
  .use(pinia)
  .mount('#app')
