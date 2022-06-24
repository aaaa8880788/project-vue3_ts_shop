<template>
  <div class="page-table">
    <BuTable v-bind="contentTableConfig" :listData="dataList">
      <!-- 1.header中的插槽 -->
      <template #header>
        <div class="header-default">
          <!-- 传入标题（位于左侧） -->
          <div class="title">{{ pageNameInChinese }}列表</div>
          <!-- 传入处理内容（位于右侧） -->
          <div class="handler">
            <el-button type="primary" v-if="isCreate" @click="handleCreateClick"
              >新建{{ pageNameInChinese }}</el-button
            >
          </div>
        </div>
      </template>

      <!-- 2.列中的插槽(公共 -> 静态) -->
      <!-- 创建时间列的处理（slotName: 'createAt'） -->
      <template #createAt="scope">
        {{ formateString(scope.row.createAt) }}
      </template>
      <!-- 更新时间列的处理（slotName: 'updateAt'） -->
      <template #updateAt="scope">
        {{ formateString(scope.row.updateAt) }}
      </template>
      <!-- 操作列的处理（slotName: 'handler'） -->
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="small"
            :icon="Edit"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            :icon="Delete"
            type="text"
            v-if="isDelete"
            @click="deleteBtnClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 3.列中的插槽(私有 -> 动态) -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <!-- 4.footer插槽 -->
      <template #footer>
        <!-- 只有总条数>0才会有分页器 -->
        <div class="footer-default" v-if="ListTotalCount">
          <el-pagination
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="ListTotalCount"
            v-model:currentPage="pageInfo.currentPage"
            v-model:page-size="pageInfo.pageSize"
          />
        </div>
      </template>
    </BuTable>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import BuTable from '@/base-ui/table/table.vue'
import type { ITable } from '@/base-ui/table/type'
import { formateString } from '@/utils/date-formate'
import {
  defineProps,
  defineEmits,
  computed,
  defineExpose,
  ref,
  watch
} from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
import { ElMessage, ElMessageBox } from 'element-plus'

// 定义属性
interface Props {
  contentTableConfig: ITable //表单配置接收
  pageName: string //表单名字接收
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'createBtnClick', pageNameInChinese: string): void
  (e: 'editBtnClick', rowData: any, pageNameInChinese: string): void
}>()

const store = useStore()

// 1.获取页面中文名称
const pageNameTransform = (pageName: string): string => {
  switch (pageName) {
    case 'users':
      return '用户'
    case 'role':
      return '角色'
    case 'goods':
      return '商品'
    case 'menu':
      return '菜单'
    case 'department':
      return '部门'
    case 'category':
      return '分类'
    case 'story':
      return '故事'
    default:
      return ''
  }
}
const pageNameInChinese = pageNameTransform(props.pageName)

// 2.双向绑定pageInfo（用于网络请求与分页器）
const pageInfo = ref({
  currentPage: 1,
  pageSize: 5
})
// 监听pageInfo变化，因为分页器会使其变值
watch(
  pageInfo,
  () => {
    getPageData()
  },
  {
    deep: true
  }
)

// 3.属于动态插槽的配置项筛选,把公共的排除掉
const otherPropSlots: any = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return item.slotName
  }
)

// 4.获取操作的权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

// 5.发送网络请求获取表单数据
const getPageData = () => {
  // 从vuex中获取queryInfo（在使用到搜索或重置的时候会先在vuex存入或清空queryInfo）
  let queryInfo = store.state.main.queryInfo
  if (!isQuery) return
  store.dispatch(`main/getPageListAction`, {
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    },
    pageName: props.pageName
  })
}
// 页面加载时第一次调用获取表单数据
getPageData()

// 6.从vuex中获取列表数据
const dataList = computed(() =>
  store.getters[`main/pageListData`](props.pageName)
)

// 获取vuex中列表数据总数
let ListTotalCount = computed(() =>
  store.getters[`main/pageListCount`](props.pageName)
)

// 7.点击删除按钮触发
const deleteBtnClick = async (row: any) => {
  try {
    await ElMessageBox.confirm('是否确定要删除该行数据?', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    })
    // 调用删除请求
    const requestResult = await store.dispatch(`main/deletePageRowAction`, {
      id: row.id,
      pageName: props.pageName
    })

    if (requestResult.code === 0) {
      // 重新获取列表数据
      getPageData()
      ElMessage({
        type: 'success',
        message: requestResult.data,
        duration: 2000
      })
    } else {
      ElMessage({
        type: 'error',
        message: requestResult.data,
        duration: 2000
      })
    }
  } catch (error) {
    ElMessage({
      type: 'info',
      message: '取消成功',
      duration: 1000
    })
  }
}

// 8.点击新建按钮触发
const handleCreateClick = () => {
  emit('createBtnClick', pageNameInChinese)
}

// 9.点击编辑按钮触发
const handleEditClick = (row: any) => {
  emit('editBtnClick', row, pageNameInChinese)
}

defineExpose({
  getPageData
})
</script>

<style scoped lang="less">
.header-default {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .title {
    font-size: 22px;
    font-weight: 700;
  }
}
.footer-default {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
