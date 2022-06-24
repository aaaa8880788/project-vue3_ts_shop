import { Module } from 'vuex'

// 导入类型接口
import type { IMainState } from './type'
import type { IRootState } from '@/store/type'

// 导入字符串处理函数（将字符串的首字母转大写）
import { firstToUpper } from '@/utils/string-firstToUpper'

// 导入网络请求模块
import {
  getPageListData,
  deletePageRowData,
  createPageData,
  editPageData,
  getGoodsCategoryData
} from '@/network/main/main'

const systemModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      queryInfo: {},
      usersList: [],
      usersCount: 0,
      departmentList: [],
      departmentCount: 0,
      menuList: [],
      menuCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      categoryList: [],
      categoryCount: 0,
      storyList: [],
      storyCount: 0,
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsCategoryFavor: [],
      goodsAddressSale: [],
      goodsAmountList: []
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersList
          case 'department':
            return state.departmentList
          case 'menu':
            return state.menuList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodsList
          case 'category':
            return state.categoryList
          case 'story':
            return state.storyList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersCount
          case 'department':
            return state.departmentCount
          case 'menu':
            return state.menuCount
          case 'role':
            return state.roleCount
          case 'goods':
            return state.goodsCount
          case 'category':
            return state.categoryCount
          case 'story':
            return state.storyCount
        }
      }
    }
  },
  mutations: {
    // 保存搜索数据
    addQueryInfo(state, queryInfo) {
      state.queryInfo = queryInfo
    },
    // 移除搜索数据
    removeQueryInfo(state) {
      state.queryInfo = {}
    },
    // 保存用户列表数据
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    // 保存用户列表数据总数
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    // 保存部门列表数据
    changeDepartmentList(state, department: any[]) {
      state.departmentList = department
    },
    // 保存用户列表数据总数
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    },
    // 保存菜单列表数据
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    // 保存菜单列表数据总数
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    // 保存角色列表数据
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    // 保存角色列表数据总数
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    // 保存商品列表数据
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    // 保存商品列表数据总数
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    // 保存类别列表数据
    changeCategoryList(state, categoryList: any[]) {
      // console.log(categoryList)

      state.categoryList = categoryList
    },
    // 保存类别列表数据总数
    changeCategoryCount(state, categoryCount: number) {
      // console.log(categoryCount)

      state.categoryCount = categoryCount
    },
    // 保存故事列表数据
    changeStoryList(state, storyList: any[]) {
      // console.log(storyList)

      state.storyList = storyList
    },
    // 保存故事列表数据总数
    changeStoryCount(state, storyCount: number) {
      // console.log(storyCount)

      state.storyCount = storyCount
    },

    // 保存商品分类个数数据
    changeGoodsCategoryCount(state, goodsCategoryCount: any[]) {
      state.goodsCategoryCount = goodsCategoryCount
    },
    // 保存商品分类销量数据
    changeGoodsCategorySale(state, goodsCategorySale: any[]) {
      state.goodsCategorySale = goodsCategorySale
    },
    // 保存商品分类销量收藏
    changeGoodsCategoryFavor(state, goodsCategoryFavor: any[]) {
      state.goodsCategoryFavor = goodsCategoryFavor
    },
    // 保存商品不同地址销量数据
    changeGoodsAddressSale(state, goodsAddressSale: any[]) {
      state.goodsAddressSale = goodsAddressSale
    },
    // 保存商品数据统计的数量数据
    changeGoodsAmountList(state, goodsAmountList: any[]) {
      state.goodsAmountList = goodsAmountList
    }
  },
  actions: {
    // 1.请求页面列表数据
    async getPageListAction(context, payload: any) {
      const { pageName, queryInfo } = payload
      const getUrl = `/${pageName}/list`
      // 发送网络请求
      const pageResult = await getPageListData(getUrl, queryInfo)
      const { list, totalCount } = pageResult.data
      // console.log(list)

      // ---------------
      // 额外操作
      if (pageName === 'department') {
        const entireDepartment = context.rootState.entireDepartment
        // 给每个部门数据根据parentId加上一个parentName
        list.map((item: any) => {
          const data = entireDepartment.find(
            (item1) => item.parentId === item1['id']
          )
          if (data) {
            item.parentName = data['name']
          }
        })
      }

      // ---------------

      // 将数据保存到vuex
      const pageNameFirstToUpper = firstToUpper(pageName)
      const saveListFnName = `change${pageNameFirstToUpper}List`
      const saveCountFnName = `change${pageNameFirstToUpper}Count`
      // console.log(saveListFnName)
      // console.log(saveCountFnName)

      context.commit(saveListFnName, list)
      context.commit(saveCountFnName, totalCount)
    },
    // 2.删除页面列表行数据
    async deletePageRowAction(context, payload: any) {
      const { id, pageName } = payload
      const deleteUrl = `/${pageName}/${id}`
      // 发送网络请求
      const result = await deletePageRowData(deleteUrl)
      return result
    },
    // 3.添加页面列表行数据
    async createPageDataAction(context, payload: any) {
      const { pageName, newData } = payload
      const createUrl = `/${pageName}`
      const result = await createPageData(createUrl, newData)
      return result
    },
    // 4.编辑页面列表行数据
    async editPageDataAction(context, payload: any) {
      const { pageName, editData } = payload
      const editUrl = `/${pageName}/${editData.id}`
      const result = await editPageData(editUrl, editData)
      return result
    },
    // 5.保存queryInfo数据
    saveQueryInfoAction(context, payload: any) {
      const { queryInfo } = payload
      context.commit('addQueryInfo', queryInfo)
    },
    // 6.移除queryInfo数据
    removeQueryInfoAction(context) {
      context.commit('removeQueryInfo')
    },
    // 7.请求商品分类部分的数据
    async getGoodsCategoryDataAction({ commit }) {
      // 发送网络请求
      // 1.分类商品的个数
      const countUrl = '/goods/category/count'
      const countResult = await getGoodsCategoryData(countUrl)
      commit('changeGoodsCategoryCount', countResult.data)
      // 2.分类商品的销量
      const saleUrl = '/goods/category/sale'
      const saleResult = await getGoodsCategoryData(saleUrl)
      commit('changeGoodsCategorySale', saleResult.data)
      // 3.分类商品的收藏
      const favorUrl = '/goods/category/favor'
      const favorResult = await getGoodsCategoryData(favorUrl)
      commit('changeGoodsCategoryFavor', favorResult.data)
      // 4.不同城市的销量
      const addressUrl = '/goods/address/sale'
      const addressResult = await getGoodsCategoryData(addressUrl)
      commit('changeGoodsAddressSale', addressResult.data)
      // 5.商品数据的统计数量
      const amountUrl = '/goods/amount/list'
      const amountResult = await getGoodsCategoryData(amountUrl)
      commit('changeGoodsAmountList', amountResult.data)
    }
  }
}

export default systemModule
