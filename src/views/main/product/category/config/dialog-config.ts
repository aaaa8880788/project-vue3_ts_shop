import { IForm } from '@/base-ui/form/type'
export const dialogFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '分类名称',
      placeholder: '请输入分类名称'
    }
  ],
  itemColLayout: {
    span: 24
  },
  itemStyle: {}
}
