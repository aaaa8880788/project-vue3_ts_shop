import { ITable } from '@/base-ui/table/type'
export const contentTableConfig: ITable = {
  propList: [
    { prop: 'id', label: '部门id', minWidth: '100' },
    { prop: 'name', label: '部门名称', minWidth: '100' },
    {
      prop: 'parentId',
      label: '上级部门',
      minWidth: '100',
      slotName: 'parentName'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    },
    { prop: 'leader', label: '部门主管', minWidth: '100' },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  // 表格具有序号列
  showIndexColumn: true,
  // 表格具有可选列
  showSelectColumn: true
}
