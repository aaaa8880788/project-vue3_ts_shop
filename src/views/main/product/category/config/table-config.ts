import { ITable } from '@/base-ui/table/type'
export const contentTableConfig: ITable = {
  // 表格配置
  propList: [
    { prop: 'id', label: '分类id', minWidth: '50' },
    { prop: 'name', label: '分类名称', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '130',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '130',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  // 表格具有序号列
  showIndexColumn: false,
  // 表格具有可选列
  showSelectColumn: true
}
