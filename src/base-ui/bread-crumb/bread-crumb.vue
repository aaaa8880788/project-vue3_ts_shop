<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadCrumbs" :key="item.name">
      <template v-if="item.path">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
      <template v-else>
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { IBreadCrumb } from './type'
import { defineProps, withDefaults } from 'vue'

// 定义属性
interface Props {
  breadCrumbs: IBreadCrumb[]
}
const props = withDefaults(defineProps<Props>(), {
  breadCrumbs: () => []
})
</script>

<style scoped></style>
