const page = {
  code: 200,
  msg: null,
  data: [
    {
      organId: 'o1',
      organPid: '-1',
      organName: '部门1'
    },
    {
      organId: 'o2',
      organPid: '-1',
      organName: '部门2'
    },
    {
      organId: 'o3',
      organPid: '-1',
      organName: '部门3'
    }
  ],
  success: true
}

export default {
  'get|/api/organ/subOrganList/-1': page
}
