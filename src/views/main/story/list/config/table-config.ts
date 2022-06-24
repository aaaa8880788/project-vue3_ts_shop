import { ITable } from '@/base-ui/table/type'
export const contentTableConfig: ITable = {
  // 表格配置
  propList: [
    { prop: 'id', label: '故事id', minWidth: '50' },
    { prop: 'title', label: '故事标题', minWidth: '100' },
    { prop: 'content', label: '故事内容' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '130',
      slotName: 'createAt'
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
