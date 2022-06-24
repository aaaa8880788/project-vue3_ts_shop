import type { Module } from 'vuex'

// 导入类型接口
import type { ILoginState } from './type'
import type { IRootState } from '../type'

// 导入网络请求模块
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/network/login/login'

// 导入缓存函数
import localCache from '@/utils/local-cache'
// 导入动态路由注册模块
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

// 导入路由对象
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    // 保存token
    changeToken(state, token: string) {
      state.token = token
    },
    // 保存用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 保存用户菜单信息
    changeUserMenusInfo(state, userMenus: any) {
      state.userMenus = userMenus

      // 通过用户菜单权限拿到对应的路由信息
      const routes = mapMenusToRoutes(userMenus)

      // 注册动态路由
      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 通过用户菜单获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
      // console.log(permissions)
    }
  },
  actions: {
    // 从本地缓存取数据保存入vuex
    loadLocalLogin(context) {
      const token = localCache.getCache('token')
      if (token) {
        context.commit('changeToken', token)
        // 调用根模块的初始化数据函数（该数据是用于selete选择器里面的动态数据或者其他数据）
        context.dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        context.commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        context.commit('changeUserMenusInfo', userMenus)
      }
    },
    // 账号登录
    async accountLoginAction(context, payload: any) {
      // 1.请求token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      // 存入vuex
      context.commit('changeToken', token)
      // 存入本地缓存
      localCache.setCache('token', token)
      // console.log(loginResult)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      // 存入vuex
      context.commit('changeUserInfo', userInfo)
      // 存入本地缓存
      localCache.setCache('userInfo', userInfo)
      // console.log(userInfoResult)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      // 存入vuex
      context.commit('changeUserMenusInfo', userMenus)
      // 存入本地缓存
      localCache.setCache('userMenus', userMenus)

      // 4.路由跳转首页
      router.push('/main')

      // 5.调用根模块的初始化数据函数（该数据是用于selete选择器里面的动态数据或者其他数据）
      context.dispatch('getInitialDataAction', null, { root: true })
    }
  }
}
export default loginModule
