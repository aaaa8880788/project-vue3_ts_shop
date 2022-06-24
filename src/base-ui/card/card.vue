<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
interface Props {
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '默认标题'
})
</script>

<style scoped>
.card-header {
  text-align: left;
  font-size: 18px;
}
</style>
