<template>
  <componentsLayout
    :style="{
      padding: '16px'
    }"
    :free="true"
  >
    <div
      class="comp-info"
      v-loading="loading"
      element-loading-text="Loading..."
    >
      <Top :tenant="tenant" @reloadData="tenantInfo" />
      <Centers
        :tenantBaseInfo="tenantBaseInfo"
        :tenantAdminInfo="tenantAdminInfo"
        :passwordPolicy="passwordPolicy"
        @reloadData="tenantInfo"
      />
      <Bottom :tenantShowInfo="tenantShowInfo" @reloadData="tenantInfo" />
    </div>
  </componentsLayout>
</template>

<script setup>
  import { ref, onBeforeMount, defineComponent } from 'vue'
  import Top from './top'
  import Centers from './center'
  import Bottom from './bottom'
  import componentsLayout from '@/views/components/Layout.vue'
  import apis from '@/api/system/companyManagement/companyInfo'

  const loading = ref(false)
  const tenant = ref({})
  const tenantBaseInfo = ref({})
  const tenantAdminInfo = ref({})
  const passwordPolicy = ref({})
  const tenantShowInfo = ref({})

  const tenantInfo = () => {
    loading.value = true
    apis.getTenantInfo().then(
      res => {
        tenant.value = res.data.tenant
        tenantBaseInfo.value = res.data.tenantBaseInfo
        tenantAdminInfo.value = res.data.tenantAdminInfo
        console.log(tenantAdminInfo.value)
        tenantShowInfo.value = res.data.tenantShowInfo
        res.data.passwordPolicy.passwordRules = []
        if (res.data.passwordPolicy.passUppercase === '1') {
          res.data.passwordPolicy.passwordRules.push('passUppercase')
        }
        if (res.data.passwordPolicy.passLowercase === '1') {
          res.data.passwordPolicy.passwordRules.push('passLowercase')
        }
        if (res.data.passwordPolicy.passNum === '1') {
          res.data.passwordPolicy.passwordRules.push('passNum')
        }
        if (res.data.passwordPolicy.passSpecial === '1') {
          res.data.passwordPolicy.passwordRules.push('passSpecial')
        }
        passwordPolicy.value = res.data.passwordPolicy
        loading.value = false
      },
      () => {
        loading.value = false
      }
    )
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    tenantInfo()
  })
</script>

<script>
  export default defineComponent({
    name: 'CompanyName'
  })
</script>

<style lang="scss" scoped>
  .comp-info {
    border-radius: 4px;
  }
</style>
