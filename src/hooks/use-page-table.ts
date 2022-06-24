import { Ref } from 'vue'
type CallbackFn = (rowData?: any) => void

// 1.列表新建行数据触发函数
function hookHandleCreateClick(
  pageDialogRef: Ref,
  createCb?: CallbackFn //页面独有新建点击时的逻辑函数
) {
  // 列表新建行数据触发函数
  const handleCreateClick = (pageNameInChinese: string) => {
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogTitle = `新建${pageNameInChinese}`
      createCb && createCb()
      pageDialogRef.value.centerDialogVisible = true
    }
  }
  return { handleCreateClick }
}

// 2.列表编辑行数据触发函数
function hookHandleEditClick(
  pageDialogRef: Ref,
  editCb?: CallbackFn //页面独有新建点击时的逻辑函数
) {
  // 列表编辑行数据触发函数
  const handleEditClick = (rowData: any, pageNameInChinese: string) => {
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogTitle = `编辑${pageNameInChinese}`
      pageDialogRef.value.formData = rowData
      editCb && editCb(rowData)
      pageDialogRef.value.centerDialogVisible = true
    }
  }
  return { handleEditClick }
}

// 3.更新列表数据函数
function hookUpdateTableData(pageTableRef: Ref) {
  // 列表编辑或新建成功后更新列表数据函数
  const updateTableData = () => {
    pageTableRef?.value.getPageData()
  }
  return { updateTableData }
}

export { hookHandleCreateClick, hookHandleEditClick, hookUpdateTableData }
