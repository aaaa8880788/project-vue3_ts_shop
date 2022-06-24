import { IForm } from '@/base-ui/form/type'
export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '部门id',
      placeholder: '请输入部门id'
    },
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门主管',
      placeholder: '请输入部门主管名称'
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
  ]
}
