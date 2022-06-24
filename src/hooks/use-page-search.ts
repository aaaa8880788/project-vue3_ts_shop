import { Ref } from 'vue'

// 1.重置表单点击后处理函数
function hookHandleResetClick(pageTableRef: Ref) {
  const handleResetClick = (): any => {
    pageTableRef.value?.getPageData()
  }
  return { handleResetClick }
}
// 2.搜索表单点击后处理函数
function hookHandleSearchClick(pageTableRef: Ref) {
  const handleSearchClick = (queryInfo: object) => {
    pageTableRef.value?.getPageData(queryInfo)
  }
  return { handleSearchClick }
}

export { hookHandleResetClick, hookHandleSearchClick }
