<template>
  <div class="menu">
    <div class="content">
      <page-table
        :contentTableConfig="contentTableConfig"
        pageName="menu"
        ref="pageTableRef"
        @createBtnClick="handleCreateClick"
        @editBtnClick="handleEditClick"
      >
      </page-table>
    </div>
    <!-- 对话框部分 -->
    <page-dialog ref="pageDialogRef" @updateTableData="updateTableData">
    </page-dialog>
  </div>
</template>

<script setup lang="ts">
import pageTable from '@/components/page-table/page-table.vue'
import pageDialog from './cpns/page-dialog.vue'
// 导入内容表格配置项
import { contentTableConfig } from './config/table-config'
// 导入hooks
import {
  hookHandleCreateClick,
  hookHandleEditClick,
  hookUpdateTableData
} from '@/hooks/use-page-table'

import { computed, ref } from 'vue'
import { useStore } from '@/store'

// 1.定义属性
const store = useStore()
// 获取对话框ref对象
const pageDialogRef = ref<InstanceType<typeof pageDialog>>()
// 获取表格ref对象
const pageTableRef = ref<InstanceType<typeof pageTable>>()

// 3.表格新建、编辑、删除功能部分
const { handleCreateClick } = hookHandleCreateClick(pageDialogRef)
const { handleEditClick } = hookHandleEditClick(pageDialogRef)
const { updateTableData } = hookUpdateTableData(pageTableRef)
</script>

<style scoped>
.content {
  border-top: 20px solid #dedee1;
  padding: 40px;
}
</style>
