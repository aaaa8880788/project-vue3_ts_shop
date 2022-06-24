<template>
  <div id="login">
    <div class="box">
      <!-- 标题部分 -->
      <div class="title">后台管理系统</div>
      <!-- 主体内容部分 -->
      <div class="main">
        <!-- tabs标签部分 -->
        <el-tabs type="border-card" stretch v-model="currentTab">
          <el-tab-pane name="account">
            <!-- 标题部分 -->
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><user /></el-icon>
                <span>账号登录</span>
              </span>
            </template>
            <!-- 内容部分 -->
            <login-account ref="loginAccountRef"> </login-account>
          </el-tab-pane>
          <el-tab-pane name="phone">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><iphone /></el-icon>
                <span>手机登录</span>
              </span>
            </template>
            <!-- 内容部分 -->
            <login-phone ref="loginPhoneRef"> </login-phone>
          </el-tab-pane>
        </el-tabs>
        <!-- 密码管理 -->
        <div class="password-control">
          <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
          <el-link type="primary" @click="handleForgotPwdClick"
            >忘记密码</el-link
          >
        </div>
        <!-- 立即登录按钮 -->
        <el-button
          type="primary"
          class="login-btn"
          size="large"
          @click="loginClick"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import loginAccount from './cpns/login-account.vue'
import loginPhone from './cpns/login-phone.vue'

// 1.定义属性
// 定义是否记住密码变量
const isKeepPassword = ref(true)
// 拿到loginAccount组件的ref对象
const loginAccountRef = ref<InstanceType<typeof loginAccount>>()
// 拿到loginPhoneRef组件的ref对象
const loginPhoneRef = ref<InstanceType<typeof loginPhone>>()
const currentTab = ref('account')

// 2.定义方法
// 点击立即登录触发函数
const loginClick = () => {
  if (currentTab.value === 'account') {
    loginAccountRef.value?.loginAction(isKeepPassword.value)
  } else {
    loginPhoneRef.value?.loginAction()
  }
}
// 点击忘记密码触发
const handleForgotPwdClick = () => {
  console.log('点击了忘记密码')
}
</script>

<style scoped lang="less">
// 最外层盒子
#login {
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/image/bg_admin.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
// 中间盒子
.box {
  width: 500px;
  height: 420px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  box-shadow: 0 0 8px 8px #ccc;
  // 标题
  .title {
    font-size: 30px;
    text-align: center;
    height: 100px;
    line-height: 100px;
    color: rgb(117, 117, 117);
  }
  .main {
    width: 80%;
    margin: 0 auto;
    .password-control {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .login-btn {
      width: 100%;
      font-size: 16px;
      margin-top: 10px;
    }
  }
}
// Tabs标签页样式改变
.el-tabs {
  background-color: rgba(255, 255, 255, 0.5);
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: rgba(255, 255, 255, 0.5);
}
.custom-tabs-label {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form {
  margin-top: 20px;
}
</style>
