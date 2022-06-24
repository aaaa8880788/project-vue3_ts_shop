<template>
  <div class="page-search">
    <Bu-form v-bind="searchFormConfig" v-model="formData" ref="BuFormRef">
      <template #header>
        <div class="header">
          <h1>高级检索</h1>
        </div>
      </template>
      <template #footer>
        <div class="footer">
          <el-button type="primary" :icon="Refresh" @click="resetClick"
            >重置</el-button
          >
          <el-button type="primary" :icon="Search" @click="searchClick"
            >搜索</el-button
          >
        </div>
      </template>
    </Bu-form>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import BuForm from '@/base-ui/form/form.vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import { ref, defineProps, defineEmits } from 'vue'
import { IForm } from '@/base-ui/form/type'
import { gernarateFormData } from '@/hooks/use-form'

// 定义属性
interface Props {
  searchFormConfig: IForm
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'resetBtnClick'): void
  (e: 'searchBtnClick', formData: object): void
}>()
const store = useStore()
const BuFormRef = ref<InstanceType<typeof BuForm>>()

// 1.从接收到的搜索配置中取出各个field,组成表单的数据formData
const formData = ref(gernarateFormData(props.searchFormConfig))

// 2.重置与搜索功能
// 重置按钮触发
const resetClick = () => {
  BuFormRef.value?.resetForm()
  // 将表单数据从vuex中删除
  store.dispatch('main/removeQueryInfoAction')
  emit('resetBtnClick')
}
// 搜索按钮触发
const searchClick = () => {
  // 这里需要遍历搜索配置项，配置项里可以传dataType，要求数据返回什么类型的数据
  let queryInfo = { ...formData.value }
  props.searchFormConfig.formItems.map((item) => {
    if (item.dataType === 'number' && queryInfo[item.field]) {
      queryInfo[item.field] = Number(queryInfo[item.field])
    }
  })
  // 清空queryInfo中没有值的属性
  for (const i in queryInfo) {
    if (queryInfo[i] === '') {
      delete queryInfo[i]
    }
  }
  // 将表单数据存入vuex
  store.dispatch('main/saveQueryInfoAction', {
    queryInfo: queryInfo
  })
  emit('searchBtnClick', queryInfo)
}

// 3.在每次页面重新加载时清空vuex中的queryInfo信息
store.dispatch('main/removeQueryInfoAction')
</script>

<style scoped>
.header {
  padding-top: 20px;
}
.footer {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
