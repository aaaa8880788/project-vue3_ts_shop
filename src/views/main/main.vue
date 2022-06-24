<template>
  <el-container class="layout-container-demo">
    <!-- 侧边栏部分 -->
    <el-aside width="auto">
      <nav-menu :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <!-- 头部部分 -->
      <el-header>
        <nav-herder @foldChange="foldChange"></nav-herder>
      </el-header>
      <!-- 主体部分 -->
      <el-main>
        <div class="page-herder"><router-view></router-view></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import NavHerder from '@/components/nav-herder/nav-herder.vue'
import NavMenu from '@/components/nav-menu/nav-menu.vue'
import { ref } from 'vue'

// 定义属性
const isCollapse = ref(false)

// 定义方法
// 子组件nav-herder触发foldChange()后触发该函数
const foldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
// herder区域

.el-header {
  background-color: #fff;
  position: relative;
  color: #000;
}
// 侧边栏
.el-aside {
  background: #092036;
}
// main区域
.el-main,
.el-header {
  padding: 0;
  margin-bottom: 20px;
  text-align: center;
}
// 右边主体区域
.el-container {
  height: 100vh;
  background-color: #dedee1;
}
.page-herder {
  min-width: 800px;
  background-color: #fff;
  margin: 0 20px;
  border-radius: 5px;
}
</style>
