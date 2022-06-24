import { IForm } from '@/base-ui/form/type'
import { checkMobile } from '@/utils/form-validator'
export const dialogFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      rules: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }]
    },
    {
      field: 'password',
      type: 'password',
      label: '用户密码',
      placeholder: '请输入密码',
      rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
      rules: [
        { required: true, message: '请输入电话号码', trigger: 'blur' },
        { validator: checkMobile, message: '请输入正确的号码', trigger: 'blur' }
      ]
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      options: [],
      rules: [{ required: true, message: '请选择部门', trigger: 'change' }]
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      options: [],
      rules: [{ required: true, message: '请选择部门', trigger: 'change' }]
    }
  ],
  labelWidth: '80px',
  itemColLayout: {
    span: 24
  },
  itemStyle: {}
}
