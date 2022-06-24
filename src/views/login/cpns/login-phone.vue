<template>
  <el-form :model="phone" :rules="rules" ref="formRef">
    <el-form-item label="手机号" label-width="70px" prop="num">
      <el-input v-model="phone.num"></el-input>
    </el-form-item>
    <el-form-item label="验证码" label-width="70px" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code"></el-input>
        <el-button type="primary" class="code-btn" @click="handleGetCodeClick"
          >获取验证码</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import type { FormInstance } from 'element-plus'

// 定义属性
const phone = reactive({
  num: '',
  code: ''
})
// 获取表单ref
const formRef = ref<FormInstance>()
// 获取store实例
const store = useStore()
// 定义方法
// 点击登录触发
const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (!valid) {
      return
    }
    console.log('点击了立即登录,接口没开发,做不了')
  })
}
const handleGetCodeClick = () => {
  console.log('点击了获取验证码')
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  width: 100%;
  .code-btn {
    font-size: 0.75rem;
  }
}
</style>
