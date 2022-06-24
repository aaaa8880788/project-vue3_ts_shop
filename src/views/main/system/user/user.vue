<template>
  <div class="user">
    <!-- 搜索部分 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    ></page-search>
    <!-- 表格部分 -->
    <div class="content">
      <page-table
        :contentTableConfig="contentTableConfig"
        pageName="users"
        ref="pageTableRef"
        @createBtnClick="handleCreateClick"
        @editBtnClick="handleEditClick"
      >
        <!-- 动态插槽 -->
        <template #status="scope">
          <el-button>{{ scope.row.status === 0 ? '禁用' : '启用' }}</el-button>
        </template>
      </page-table>
    </div>
    <!-- 对话框部分 -->
    <page-dialog
      :dialogFormConfig="dialogFormConfigRef"
      ref="pageDialogRef"
      pageName="users"
      @updateTableData="updateTableData"
    >
    </page-dialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed, ref } from 'vue'
import pageSearch from '@/components/page-search/page-search.vue'
import pageTable from '@/components/page-table/page-table.vue'
import pageDialog from '@/components/page-dialog/page-dialog.vue'
import {
  hookHandleResetClick,
  hookHandleSearchClick
} from '@/hooks/use-page-search'
import {
  hookHandleCreateClick,
  hookHandleEditClick,
  hookUpdateTableData
} from '@/hooks/use-page-table'
// 导入对话框配置项
import { dialogFormConfig } from './config/dialog-config'
// 导入搜索表单配置项
import { searchFormConfig } from './config/search-config'
// 导入内容表格配置项
import { contentTableConfig } from './config/table-config'

// 定义属性
const store = useStore()
// 获取对话框ref对象
const pageDialogRef = ref<InstanceType<typeof pageDialog>>()
// 获取表格ref对象
const pageTableRef = ref<InstanceType<typeof pageTable>>()

// 1.搜索部分重置与搜索功能部分
// 1.1从hook中导入重置点击处理函数和搜索点击处理函数
const { handleResetClick } = hookHandleResetClick(pageTableRef)
const { handleSearchClick } = hookHandleSearchClick(pageTableRef)

// 2.列表部分新建与编辑功能部分
// 2.1点击新建后触发函数(该user页面独有部分)
const createCallback = () => {
  const passwordItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'password'
  )
  if (passwordItem) {
    passwordItem.isHidden = false
  }
}
// 2.2点击编辑后触发函数(该user页面独有部分)
const editCallback = () => {
  const passwordItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'password'
  )
  if (passwordItem) {
    passwordItem.isHidden = true
  }
}

// 2.3动态添加配置项数据
// 在这里将dialogFormConfig变成响应式的
const dialogFormConfigRef = computed(() => {
  // 部门列表数据
  const departmentItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  if (departmentItem) {
    departmentItem.options = store.state.entireDepartment.map((item: any) => {
      return { label: item.name, value: item.id }
    })
  }
  // 角色列表数据
  const roleItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'roleId'
  )
  if (roleItem) {
    roleItem.options = store.state.entireRole.map((item: any) => {
      return { label: item.name, value: item.id }
    })
  }

  return dialogFormConfig
})

// 2.4从hook中导入新建、编辑、更新表格处理函数
const { handleCreateClick } = hookHandleCreateClick(
  pageDialogRef,
  createCallback
)
const { handleEditClick } = hookHandleEditClick(pageDialogRef, editCallback)
const { updateTableData } = hookUpdateTableData(pageTableRef)
</script>

<style scoped lang="less">
.content {
  border-top: 20px solid #dedee1;
  padding: 40px;
}
</style>
