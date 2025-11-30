import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.less'

const app = createApp(App)

// 路由
import router from './router'
app.use(router)

// 国际化
import languageDist from '../language/index';
import { createI18n } from 'vue-i18n'
const i18n = createI18n({
  locale: 'en',
  messages: languageDist,
})
app.use(i18n);

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia();
app.use(pinia);

// 字体图标样式
import './icons/builder-font.less'

app.mount('#app')
