<template>
  <el-form :model="account" :rules="rules" ref="formRef">
    <el-form-item label="账号" label-width="70px" prop="name">
      <el-input v-model="account.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="70px" prop="password">
      <el-input v-model="account.password" show-password></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import localCache from '@/utils/local-cache'
import type { FormInstance } from 'element-plus'

// 定义属性
// 账号密码数据
const account = reactive({
  name: '',
  password: ''
})
// 获取表单ref
const formRef = ref<FormInstance>()
// 获取store实例
const store = useStore()
// 从本地缓存中获取保存的用户和密码(点击记住密码就会保存)
const name = localCache.getCache('name')
const password = localCache.getCache('password')
if (name) {
  account.name = name
}
if (password) {
  account.password = password
}
// 定义方法
// 点击登录触发
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (!valid) {
      return
    }
    if (isKeepPassword) {
      localCache.setCache('name', account.name)
      localCache.setCache('password', account.password)
    } else {
      localCache.deleteCache('name')
      localCache.deleteCache('password')
    }
    store.dispatch('login/accountLoginAction', account)
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped></style>
