import { ITable } from '@/base-ui/table/type'
export const contentTableConfig: ITable = {
  // 表格配置
  propList: [
    { prop: 'id', label: '用户id', minWidth: '100', align: 'center' },
    { prop: 'name', label: '用户名', minWidth: '100', align: 'center' },
    { prop: 'realname', label: '真实姓名', minWidth: '100', align: 'center' },
    { prop: 'cellphone', label: '手机号码', minWidth: '100', align: 'center' },
    {
      prop: 'enable',
      label: '状态',
      minWidth: '100',
      slotName: 'status',
      align: 'center'
    },
    // {
    //   prop: 'createAt',
    //   label: '创建时间',
    //   minWidth: '200',
    //   slotName: 'createAt'
    // },
    // {
    //   prop: 'updateAt',
    //   label: '更新时间',
    //   minWidth: '200',
    //   slotName: 'updateAt'
    // },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler',
      align: 'center'
    }
  ],
  // 表格具有序号列
  showIndexColumn: false,
  // 表格具有可选列
  showSelectColumn: true
}
