<template>
  <div class="department">
    <!-- 顶部搜索部分 -->
    <page-search
      pageName="deparement"
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    ></page-search>
    <!-- 表格部分 -->
    <div class="content">
      <page-table
        ref="pageTableRef"
        :contentTableConfig="contentTableConfig"
        pageName="department"
        @createBtnClick="handleCreateClick"
        @editBtnClick="handleEditClick"
      >
        <!-- 动态插槽 -->
        <template #parentName="scope">
          {{ scope.row.parentName ?? '无' }}
        </template>
      </page-table>
    </div>
    <!-- 对话框部分 -->
    <page-dialog
      :dialogFormConfig="dialogFormConfigRef"
      ref="pageDialogRef"
      pageName="department"
      @updateTableData="updateTableData"
    >
    </page-dialog>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageTable from '@/components/page-table/page-table.vue'
import pageDialog from '@/components/page-dialog/page-dialog.vue'
// 导入对话框配置项
import { dialogFormConfig } from './config/dialog-config'
// 导入搜索表单配置项
import { searchFormConfig } from './config/search-config'
// 导入内容表格配置项
import { contentTableConfig } from './config/table-config'
// 导入hooks
import {
  hookHandleResetClick,
  hookHandleSearchClick
} from '@/hooks/use-page-search'
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

// 2.搜索部分重置与搜索功能部分
// 2.1从hook中导入重置点击处理函数和搜索点击处理函数
const { handleResetClick } = hookHandleResetClick(pageTableRef)
const { handleSearchClick } = hookHandleSearchClick(pageTableRef)

// 3.表格新建、编辑、删除功能部分
const { handleCreateClick } = hookHandleCreateClick(pageDialogRef)
const { handleEditClick } = hookHandleEditClick(pageDialogRef)
const { updateTableData } = hookUpdateTableData(pageTableRef)

// 4动态添加对话框的配置项数据
// 在这里将dialogFormConfig变成响应式的
const dialogFormConfigRef = computed(() => {
  // 部门列表数据
  const departmentItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'parentId'
  )
  if (departmentItem) {
    departmentItem.options = store.state.entireDepartment.map((item: any) => {
      return { label: item.name, value: item.id }
    })
  }
  return dialogFormConfig
})
</script>

<style scoped>
.content {
  border-top: 20px solid #dedee1;
  padding: 40px;
}
</style>
