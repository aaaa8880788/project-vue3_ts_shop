import { IForm } from '@/base-ui/form/type'
export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '商品id',
      placeholder: '请输入商品id',
      dataType: 'number'
    },
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'address',
      type: 'input',
      label: '发货地址',
      placeholder: '请输入发货地址'
    },
    {
      field: 'status',
      type: 'select',
      label: '上架情况',
      placeholder: '请选择上架情况',
      options: [
        { label: '已上架', value: 1 },
        { label: '未上架', value: 0 }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '120px'
}
