import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/global.less'
// 引入element plus的message-box样式
import 'element-plus/es/components/message-box/style/css'
// 引入element plus的message样式
import 'element-plus/es/components/message/style/css'

// 引入element plus图标
import * as ElIcons from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
// 导入element plus国际化配置
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 全局组成组件
// import pageTable from '@/components/page-table/page-table.vue'

const app = createApp(App)
// 在每次页面重新加载时(刷新或第一次打开时),将本地缓存中vuex需要的数据存入vuex
// 该函数要放在app.use(router)之前,因为在函数里面注册了动态路由，如果放后面
// 路径是动态路由的路径的话，刷新会页面丢失，因为这时动态路由还没注册，匹配不到路径
setupStore()
app.use(router)
app.use(store)

app.use(ElementPlus, {
  locale: zhCn
})

// app.component('page-table', pageTable)

// 统一注册Icon图标
for (const iconName in ElIcons) {
  app.component(iconName, ElIcons[iconName])
}

app.mount('#app')
