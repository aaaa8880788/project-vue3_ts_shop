import { RouteRecordRaw } from 'vue-router'
import type { IBreadCrumb } from '@/base-ui/bread-crumb/type'

// 从菜单列表中遍历出来的第一个路径
let firstMenuPath = ''

// 菜单路由映射关系函数
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes(导入动态路由的所有路由信息)
  const allRoutes: RouteRecordRaw[] = []
  // require.context(a,b,c)函数的作用是获取文件路径
  // 这里的三个参数分别为
  // ①文件夹路径（要哪个文件夹下面的文件的相对路径）
  // ②是否递归加载，如果为false，只会匹配路径下文件，如果true，路径里面文件夹的文件也会匹配到
  // ③正则表达式（匹配什么文件）
  const routeFiles = require.context('@/router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('@/router/main' + key.slice(1))
    allRoutes.push(route.default)
  })
  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenuPath) {
          firstMenuPath = menu.url
        }
      } else {
        _recurseGetRoute(menu.children ?? [])
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 根据路径找出相应子菜单信息
// /main/system/role -> type===2 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadCrumbs?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadCrumbs?.push({ name: menu.name })
        breadCrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 拿到面包屑数据（拿到子菜单以及他的父菜单数据）
export function pathMapBreadCrumbs(userMenus: any[], currentPath: string) {
  const breadCrumbs: IBreadCrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadCrumbs)

  return breadCrumbs
}

// 从菜单中拿出所有Permission数据，它位于三级菜单中
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermisson = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermisson(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermisson(userMenus)
  return permissions
}

// 从菜单中取出所有叶子节点的id
export function getMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    menuList.map((menu) => {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    })
  }
  _recurseGetLeaf(menuList)
  return leafKeys
}

// 从菜单中取出所有的二级菜单数据
export function getMenuTypeSecond(menuList: any[]) {
  const menuListTypeSecond: any[] = []

  const _recurseGetmenuListTypeSecond = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1) {
        _recurseGetmenuListTypeSecond(menu.children ?? [])
      } else if (menu.type === 2) {
        menuListTypeSecond.push(menu)
      }
    }
  }
  _recurseGetmenuListTypeSecond(menuList)
  return menuListTypeSecond
}

export { firstMenuPath }
