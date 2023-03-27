import useCommon from '../hooks/useCommon'

// 公共
const { getId } = useCommon()

/**
 * 表单数据
 * @returns
 */
export function formFields() {
  return [
    {
      fieldId: getId(),
      name: '姓名',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '工号',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '部门',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '性别',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '职位',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '账号',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '学历',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '毕业证书',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '资格证书',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '身份证正面',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '身份证反面',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '银行信息',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    },
    {
      fieldId: getId(),
      name: '相关附件',
      writable: true,
      readable: false,
      displayable: false,
      required: false
    }
  ]
}
