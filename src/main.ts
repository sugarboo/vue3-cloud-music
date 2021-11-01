import { createApp } from 'vue'
import App from './App.vue'

/* 引入全局样式 */
import './less/global.less'

/* 引入Vant */
import Vant from 'vant'
import 'vant/lib/index.css'

import router from './router/index.ts'

createApp(App).use(router).use(Vant).mount('#app')
