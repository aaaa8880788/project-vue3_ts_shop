<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    ></page-search>
    <div class="content">
      <page-table
        :contentTableConfig="contentTableConfig"
        pageName="goods"
        ref="pageTableRef"
        @createBtnClick="handleCreateClick"
        @editBtnClick="handleEditClick"
      >
        <template #image="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.imgUrl"
              :preview-src-list="[scope.row.imgUrl]"
              fit="cover"
              preview-teleported
            />
          </div>
        </template>
        <template #status="scope">
          <el-button>{{
            scope.row.status === 0 ? '未上架' : '已上架'
          }}</el-button>
        </template>
      </page-table>
    </div>
    <page-dialog
      :dialogFormConfig="dialogFormConfig"
      pageName="goods"
      ref="pageDialogRef"
      @updateTableData="updateTableData"
    >
    </page-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import pageSearch from '@/components/page-search/page-search.vue'
import pageDialog from '@/components/page-dialog/page-dialog.vue'
import pageTable from '@/components/page-table/page-table.vue'
// 导入搜索表单配置项
import { searchFormConfig } from './config/search-config'
// 导入内容表格配置项
import { contentTableConfig } from './config/table-config'
// 导入对话框配置项
import { dialogFormConfig } from './config/dialog-config'

// 导入表单搜索hook
import {
  hookHandleResetClick,
  hookHandleSearchClick
} from '@/hooks/use-page-search'
import {
  hookHandleCreateClick,
  hookHandleEditClick,
  hookUpdateTableData
} from '@/hooks/use-page-table'

// 定义属性
// 获取对话框ref对象
const pageDialogRef = ref<InstanceType<typeof pageDialog>>()
// 获取表格ref对象
const pageTableRef = ref<InstanceType<typeof pageTable>>()

// 1.搜索部分重置与搜索功能部分
// 1.1从hook中导入重置点击处理函数和搜索点击处理函数
const { handleResetClick } = hookHandleResetClick(pageTableRef)
const { handleSearchClick } = hookHandleSearchClick(pageTableRef)

// 2.表格部分的新增编辑更新功能
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
