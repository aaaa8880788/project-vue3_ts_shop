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
    <el-form labelWidth="80px" :model="formData" :rules="rules" ref="formRef">
      <el-form-item label="菜单名称" prop="name" v-if="isHidden.name">
        <el-input
          placeholder="请输入菜单名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单级别" prop="type" v-if="isHidden.type">
        <el-select v-model="formData.type" @change="handleMenuTypeSelected">
          <el-option label="一级" :value="1"></el-option>
          <el-option label="二级" :value="2"></el-option>
          <el-option label="三级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单Url" prop="url" v-if="isHidden.url">
        <el-input
          placeholder="请输入菜单Url,格式为/xxx"
          v-model="formData.url"
        ></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId" v-if="isHidden.parentId">
        <el-select v-model="formData.parentId">
          <el-option
            v-for="item in parentIdOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="按钮权限"
        prop="permission"
        v-if="isHidden.permission"
      >
        <el-input
          v-model="formData.permission"
          placeholder="请输入按钮权限,格式为system:XXX:XXX"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineEmits, computed } from 'vue'
import { useStore } from '@/store'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getMenuTypeSecond } from '@/utils/map-menus'

// const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'updateTableData'): void
}>()
const store = useStore()

// 表单数据
let formData = ref<any>({
  name: '',
  type: '',
  url: '',
  parentId: '',
  permission: ''
})
const pageName = 'menu'
// 6.从vuex中获取表单数据
const menuList = computed(() => store.getters[`main/pageListData`](pageName))
// 表单的显示与隐藏
const isHidden = ref({
  name: true,
  type: true,
  url: false,
  parentId: false,
  permission: false
})
// 上级菜单数据
let parentIdOption = ref<any[]>([])

// 表单规则
const rules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择菜单级别', trigger: 'change' }],
  url: [{ required: true, message: '请输入菜单Url', trigger: 'blur' }],
  parentId: [{ required: true, message: '请选择菜单级别', trigger: 'change' }],
  permission: [{ required: true, message: '请选择操作权限', trigger: 'change' }]
}
// 对话框显示与隐藏
const centerDialogVisible = ref(false)

// 对话框显示标题
const dialogTitle = ref('')

// 表单ref对象
const formRef = ref<FormInstance>()

// 对话框点击确定触发函数
const handleConfirmClick = async () => {
  if (!formRef.value) return
  const checkResult = await formRef.value.validate((valid) => {
    return valid
  })
  if (!checkResult) return
  // 判断是新建还是编辑,如果是编辑,会有id,如果是新建则没有
  const isEdit = Object.keys(formData.value).some((item) => item === 'id')
  const data = { ...formData.value }
  // 数据处理
  // 1.这里对数据进行过滤处理，如果是新建就没啥问题，但是如果是编辑，因为编辑的数据是从表格那里传过来
  // 传过来的是一行内所有的数据，但是我们编辑提交的只需要配置项里面我们配置的
  // 2.然后因为配置项可以传dataType(数据类型),所以我们要将传了dataType的数据转为指定类型
  // 3.清空掉空值的属性
  for (const key in data) {
    // id数据要保留,因为是根据id去编辑的
    if (key == 'id') continue
    const formDataFiled = ['name', 'type', 'url', 'parentId', 'permission']
    const isHaving = formDataFiled.some((item) => item === key)
    if (!isHaving) {
      delete data[key]
    }
    // 清空data中没有值的属性
    if (data[key] === '') {
      delete data[key]
    }
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

// 对话框关闭触发函数
const handleClose = () => {
  // // 每次关闭重置表单
  formData.value = {
    name: '',
    type: '',
    url: '',
    parentId: '',
    permission: ''
  }
  isHidden.value.url = false
  isHidden.value.parentId = false
  isHidden.value.permission = false
}
// 对话框打开触发函数
const handleOpen = () => {
  handleMenuTypeSelected(formData.value.type)
}

// 菜单类型选择器选择值后触发
const handleMenuTypeSelected = (val: any) => {
  if (val == 1) {
    isHidden.value.url = true
    isHidden.value.parentId = false
    isHidden.value.permission = false
  }
  if (val == 2) {
    isHidden.value.url = true
    isHidden.value.parentId = true
    isHidden.value.permission = false
    // 从菜单列表中取出所有一级菜单并赋值给配置项
    parentIdOption.value = menuList.value.map((item: any) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }
  if (val == 3) {
    isHidden.value.permission = true
    isHidden.value.url = false
    isHidden.value.parentId = true
    parentIdOption.value = getMenuTypeSecond([...menuList.value]).map(
      (item: any) => {
        return {
          label: item.name,
          value: item.id
        }
      }
    )
  }
}

defineExpose({
  dialogTitle,
  centerDialogVisible,
  formData
})
</script>

<style lang="less" scoped>
.el-select {
  width: 100%;
}
</style>
