import { IForm } from '@/base-ui/form/type'
export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '故事id',
      placeholder: '请输入故事id',
      dataType: 'number'
    },
    {
      field: 'title',
      type: 'input',
      label: '故事标题',
      placeholder: '请输入故事标题'
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
