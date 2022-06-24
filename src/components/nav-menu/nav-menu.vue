<template>
  <div class="nav-menu">
    <div class="logo" :class="[isCollapse ? 'image-fold' : '']">
      <img class="image" src="@/assets/image/panda.jpg" alt="logo" />
      <span class="title" v-if="!isCollapse">我要当大佬</span>
    </div>
    <el-menu
      :default-active="$route.path"
      v-bind="menuOption"
      :collapse="isCollapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <!-- 标题 -->
            <template #title>
              <el-icon v-if="item.icon"
                ><component :is="item.icon.slice(7)"></component
              ></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 内容 -->
            <template v-for="item1 in item.children" :key="item1.id">
              <el-menu-item :index="item1.url">
                <el-icon v-if="item1.icon"
                  ><component :is="item1.icon.slice(7)"></component
                ></el-icon>
                <span>{{ item1.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.url">
            <el-icon v-if="item.icon"
              ><component :is="item.icon.slice(7)"></component
            ></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { defineProps, reactive, computed, withDefaults } from 'vue'
// 定义属性
interface Props {
  isCollapse: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isCollapse: false
})

// 菜单配置项
const menuOption = reactive({
  'background-color': '#00152b',
  'text-color': 'rgb(218, 218, 218)',
  'active-text-color': '#fff',
  'unique-opened': true,
  router: true,
  'collapse-transition': false
})
// 获取store对象
const store = useStore()
// 从vuex中取到userMenus数据
const userMenus = computed(() => store.state.login.userMenus)
</script>

<style scoped lang="less">
.nav-menu {
  width: 100%;
  // logo栏样式
  .logo {
    width: 100%;
    height: 70px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    .image {
      height: 60px;
      width: 60px;
      border-radius: 100%;
      margin-right: 20px;
      transition: width 0.5s ease, height 0.5s ease;
    }
    .title {
      font-size: 20px;
      color: rgb(224, 223, 223);
    }
  }
  // 菜单样式
  .el-menu {
    border-right: none;
  }
  /deep/ .el-sub-menu__title:hover,
  .el-menu-item:hover,
  .el-menu-item.is-active {
    background-color: #2176c5 !important;
  }
}
/deep/ .image-fold {
  img {
    width: 40px !important;
    height: 40px !important;
    transition: width 0.5s ease, height 0.5s ease;
  }
}
</style>
