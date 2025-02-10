import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/css/main.css';
import '@/assets/css/variable.css';
import 'element-plus/dist/index.css'
import '@/assets/css/message.css';
import App from '@/App.vue';
import router from '@/router/index.ts';

const app = createApp(App);

// 注册路由
app.use(router);

// element-plus
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 最后挂载
app.mount('#app');