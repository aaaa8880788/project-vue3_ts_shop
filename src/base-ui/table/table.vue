<template>
  <div class="header">
    <slot name="header"> </slot>
  </div>
  <el-table
    :data="listData"
    border
    class="table"
    @selection-change="handleSelectionChange"
    v-bind="childrenProps"
  >
    <!-- 传入showSelectColumn时展示的全选列 -->
    <template v-if="showSelectColumn">
      <el-table-column type="selection" align="center" width="60" />
    </template>
    <!-- 传入showIndexColumn时展示的序号列 -->
    <template v-if="showIndexColumn">
      <el-table-column type="index" label="序号" align="center" width="60" />
    </template>
    <!-- propList里面的所有列 -->
    <template v-for="item in propList" :key="item.prop">
      <el-table-column v-bind="item" align="center" show-overflow-tooltip>
        <!-- 传有slotName时展示的插槽列 -->
        <template #default="scope" v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="footer">
    <slot name="footer"> </slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue'
import { ITbaleOption } from './type'
interface Props {
  listData: any[] //表单数据
  propList: ITbaleOption[] //表单配置项
  showIndexColumn?: boolean //是否显示索引列
  showSelectColumn?: boolean //是否显示全选列
  childrenProps?: object
}
const props = withDefaults(defineProps<Props>(), {
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: () => ({})
})
interface Emit {
  (e: 'selectionChange', val: any[]): void
}
const emit = defineEmits<Emit>()

// 定义方法
// 选中时触发
const handleSelectionChange = (val: any) => {
  emit('selectionChange', val)
}
</script>

<style>
.table {
  margin: 0 auto;
}
</style>
