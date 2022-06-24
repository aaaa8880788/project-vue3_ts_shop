import { IForm } from '@/base-ui/form/type'
export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '分类id',
      placeholder: '请输入分类id',
      dataType: 'number'
    },
    {
      field: 'name',
      type: 'input',
      label: '分类名称',
      placeholder: '请输入分类名称'
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
