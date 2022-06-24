import { IForm } from '@/base-ui/form/type'
export const dialogFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称',
      rules: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门主管',
      placeholder: '请输入部门主管名称',
      rules: [
        { required: true, message: '请输入部门主管名称', trigger: 'blur' }
      ]
    },
    {
      field: 'parentId',
      type: 'select',
      label: '上级部门',
      placeholder: '请选择上级部门'
    }
  ],
  labelWidth: '80px',
  itemColLayout: {
    span: 24
  },
  itemStyle: {}
}
