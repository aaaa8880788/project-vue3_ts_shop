<template>
  <div id="nav-herder">
    <!-- 展开收缩图标部分 -->
    <div class="fold-icon" @click="foldClick">
      <el-icon class="fold" v-if="isFold"><fold /></el-icon>
      <el-icon class="fold" v-else><expand /></el-icon>
    </div>
    <!-- 面包屑与用户管理部分 -->
    <div class="herder-main">
      <!-- 面包屑 -->
      <bread-crumb :breadCrumbs="breadCrumbs"></bread-crumb>
      <!-- 用户管理 -->
      <user-manage></user-manage>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import userManage from './cpns/user-manage.vue'
import breadCrumb from '@/base-ui/bread-crumb/bread-crumb.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadCrumbs } from '@/utils/map-menus'

// 定义属性
const isFold = ref(false) //折叠状态
const emit = defineEmits<{
  (e: 'foldChange', isFold: boolean): void
}>()
//面包屑数据：[{name: , path: }]
const store = useStore()
const userMenus = store.state.login.userMenus
const route = useRoute()
// 这里因为路径改变后currentPath也要变，这样下面的breadCrumbs才会重新赋值
const currentPath = computed(() => {
  return route.path
})
const breadCrumbs = computed(() => {
  return pathMapBreadCrumbs(userMenus, currentPath.value)
})
// console.log(breadCrumbs.value)

// 定义方法
// 点击折叠图标触发函数
const foldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
#nav-herder {
  height: 100%;
  display: flex;
  align-items: center;
  .fold-icon {
    margin-left: 20px;
    .fold {
      font-size: 35px;
      cursor: pointer;
    }
  }

  .herder-main {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }
}
</style>
