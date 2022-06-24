import { ITable } from '@/base-ui/table/type'
export const contentTableConfig: ITable = {
  // 表格配置
  propList: [
    { prop: 'id', label: '商品id', minWidth: '50' },
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'oldPrice', label: '商品旧价（￥）', minWidth: '100' },
    { prop: 'newPrice', label: '商品新价（￥）', minWidth: '100' },
    { prop: 'address', label: '发货地址', minWidth: '80' },
    { prop: 'status', label: '上架情况', minWidth: '100', slotName: 'status' },
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
  showIndexColumn: true,
  // 表格具有可选列
  showSelectColumn: true
}
