import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import main from './main/main'
import type { IRootState, IStoreType } from './type'
// 导入网络请求模块
import { getPageListData } from '@/network/main/main'

const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    // 该部分初始化的数据要在登录成功后调用，也就是有token时
    async getInitialDataAction({ commit, state }) {
      // 1.请求部门数据
      // 判断vuex里面是否已经有该数据了
      const departmentUrl = '/department/list'
      const departmentQueryInfo = {
        offset: 0,
        size: 1000
      }
      const departmentResult = await getPageListData(
        departmentUrl,
        departmentQueryInfo
      )
      if (!departmentResult) return
      const { list: departmentList } = departmentResult.data
      // 保存数据到vuex
      commit('changeEntireDepartment', departmentList)

      // 2.请求角色数据
      // 判断vuex里面是否已经有该数据了
      const roleUrl = '/role/list'
      const roleQueryInfo = {
        offset: 0,
        size: 1000
      }
      const roleResult = await getPageListData(roleUrl, roleQueryInfo)
      if (!roleResult) return
      const { list: roleList } = roleResult.data
      // 保存数据到vuex
      commit('changeEntireRole', roleList)

      // 3.请求菜单数据
      const menuUrl = '/menu/list'
      const menuResult = await getPageListData(menuUrl)
      if (!menuResult) return
      const { list: menuList } = menuResult.data
      // 保存数据到vuex
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    main
  }
})

// 在每次页面重新加载时(刷新或第一次打开时),将本地缓存中vuex需要的数据存入vuex
export function setupStore() {
  // 从本地缓存获取Login模块需要的vuex数据
  store.dispatch('login/loadLocalLogin')
}
// 给useStore出来的实例对象store加ts类型限制
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
