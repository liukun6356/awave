import { createApp } from 'vue'
import router from '@/router';
import App from './App.vue'
import { createPinia } from 'pinia'
import { setupStore } from '@/store';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn' //中文包
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 切换中英文
import "@/utils/zh-cn.js"

// 导入全局样式
import '@/styles/index.scss';

const pinia = createPinia()
const app = createApp(App);

// 全局挂载
setupStore(app);
app.use(router)
app.use(pinia)
app.use(ElementPlus, { locale: zhCn });
app.mount('#app')

