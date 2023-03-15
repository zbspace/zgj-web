const updateAdmin = {
  code: 200,
  msg: null,
  data: null,
  success: false
}

export default {
  'post|/api/tenant/tenantAdminInfo/update': updateAdmin,
  'post|/api/tenant/tenantPasswordPolicy/update': updateAdmin,
  'post|/api/tenant/tenantBaseInfo/update': updateAdmin
}
