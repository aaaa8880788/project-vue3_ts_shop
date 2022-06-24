<template>
  <div class="user-manage">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <div class="block">
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </div>
        <span>{{ name }}</span
        ><el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="退出登录">退出登录</el-dropdown-item>
          <el-dropdown-item command="用户信息" divided
            >用户信息</el-dropdown-item
          >
          <el-dropdown-item command="系统管理">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'
import localCache from '@/utils/local-cache'
import { useRouter } from 'vue-router'

// 定义属性
const store = useStore()
const router = useRouter()
const name = computed(() => store.state.login.userInfo.name)

// 定义方法
const handleCommand = (command: string | number | object) => {
  if (command === '退出登录') {
    localCache.deleteCache('token')
    router.push('/main')
  }
  console.log(`点击了${command}`)
}
</script>

<style scoped lang="less">
.user-manage {
  //  下拉菜单样式
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    .block {
      margin-right: 5px;
    }
  }
}
</style>
