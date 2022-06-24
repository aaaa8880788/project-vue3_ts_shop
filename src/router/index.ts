import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// 导入本地缓存函数
import localCache from '@/utils/local-cache'
// 导入动态路由中遍历出来的第一个路径
import { firstMenuPath } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'main',
    path: '/main',
    component: () => import('@/views/main/main.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from) => {
  console.log('to', to)
  console.log('from', from)

  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenuPath
  }
})

export default router
