<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="dialogTitle"
    width="40%"
    center
    destroy-on-close
    @closed="handleClose"
    @open="handleOpen"
  >
    <BuForm v-bind="dialogFormConfig" v-model="formData" ref="formRef">
    </BuForm>
    <div class="manu-tree" v-if="pageName === 'role'">
      <div class="title">选择权限</div>
      <el-tree
        ref="treeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  ref,
  withDefaults,
  defineProps,
  defineExpose,
  defineEmits,
  computed
} from 'vue'
import type { ElTree } from 'element-plus'
import { useStore } from '@/store'
import type { IForm } from '@/base-ui/form/type'
import BuForm from '@/base-ui/form/form.vue'
import { ElMessage } from 'element-plus'
import { gernarateFormData } from '@/hooks/use-form'
import { getMenuLeafKeys } from '@/utils/map-menus'
import { nextTick } from 'vue'

interface Props {
  dialogFormConfig: IForm // 表单配置项
  pageName: string
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'updateTableData'): void
}>()
const store = useStore()

// 1.表单数据
let formData = ref(gernarateFormData(props.dialogFormConfig))
// 表单ref
const formRef = ref<InstanceType<typeof BuForm>>()
// 如果是role页面,会有树形控件,它有菜单数据menuList
let menuList: any[] = []

// 2.对话框显示与隐藏
const centerDialogVisible = ref(false)

// 3.对话框显示标题
const dialogTitle = ref('')

// 4.点击确定触发函数
const handleConfirmClick = async () => {
  if (!formRef.value) return
  const validateResult = await formRef?.value.checkForm()
  if (!validateResult) return
  // 判断是新建还是编辑,如果是编辑,会有id,如果是新建则没有
  const isEdit = Object.keys(formData.value).some((item) => item === 'id')
  const data = { ...formData.value }
  const pageName = props.pageName

  // 数据处理
  // 1.这里对数据进行过滤处理，如果是新建就没啥问题，但是如果是编辑，因为编辑的数据是从表格那里传过来
  // 传过来的是一行内所有的数据，但是我们编辑提交的只需要配置项里面我们配置的
  // 2.然后因为配置项可以传dataType(数据类型),所以我们要将传了dataType的数据转为指定类型
  // 3.清空掉空值的属性
  for (const key in data) {
    // id数据要保留,因为是根据id去编辑的
    if (key == 'id') continue
    const isHaving = props.dialogFormConfig.formItems.some(
      (item) => item.field === key
    )
    if (!isHaving) {
      delete data[key]
    }
    // 清空data中没有值的属性
    if (data[key] === '') {
      delete data[key]
    }
  }
  // 2.这里需要遍历配置项，配置项里可以传dataType，要求数据返回什么类型的数据
  props.dialogFormConfig.formItems.map((item) => {
    if (item.dataType === 'number' && data[item.field]) {
      data[item.field] = Number(data[item.field])
    }
  })

  // 这里要把树形控件的菜单数据并进来
  if (menuList.length) {
    data['menuList'] = menuList
  }

  let result
  if (isEdit) {
    result = await store.dispatch('main/editPageDataAction', {
      editData: data,
      pageName
    })
  } else {
    result = await store.dispatch('main/createPageDataAction', {
      newData: data,
      pageName
    })
  }
  if (!result) return
  if (result.code === 0) {
    // 重新获取列表数据(调用父组件的updateTableData函数)
    emit('updateTableData')
    ElMessage({
      type: 'success',
      message: result.data,
      duration: 2000
    })
  } else {
    ElMessage({
      type: 'error',
      message: result.data,
      duration: 2000
    })
  }

  centerDialogVisible.value = false
}

// 5.对话框关闭触发函数
const handleClose = () => {
  formData.value = {}
  // 清空树形控件的菜单数据
  menuList = []
}

// 6.只有页面为role时才有的
// 定义树控件的属性和方法
const treeRef = ref<InstanceType<typeof ElTree>>()
// 从vuex中获取菜单数据entireMenu
const menus = computed(() => {
  return store.state.entireMenu
})

const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuListTotal = [...checkedKeys, ...halfCheckedKeys]
  menuList = menuListTotal
}

// 对话框打开触发
const handleOpen = () => {
  if (!formData.value['menuList']) return
  const menuList = formData.value['menuList']
  // 这里要拿到用户的权限数据赋值给el-tree
  const leafKeys = getMenuLeafKeys(menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(leafKeys)
  })
}

defineExpose({
  formData,
  centerDialogVisible,
  dialogTitle
})
</script>

<style scoped lang="less">
.manu-tree {
  display: flex;
  margin-left: 50px;
  .title {
    margin: 5px 5px 0 0;
  }
}
</style>
