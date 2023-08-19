<script setup>
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const { $axiosAuth: axios } = useNuxtApp()
const router = useRouter()

const transaksiTotal = ref(0)
const usersTotal = ref(0)
const kelasTotal = ref(0)

onMounted(async () => {
  const responseTransaksiTotal = (await axios.get('/transaksi?pageSize=1&status=pending')).data.data.total
  transaksiTotal.value = responseTransaksiTotal

  const responseUsersTotal = (await axios.get('/users?pageSize=1')).data.data.total
  usersTotal.value = responseUsersTotal

  const responseKelasTotal = (await axios.get('/kelas?pageSize=1')).data.data.total
  kelasTotal.value = responseKelasTotal
})
</script>

<style lang="postcss" scoped>
.container-item {
  @apply shadow rounded p-6 flex flex-col justify-center items-center cursor-pointer transition-all;
}
.item {
  @apply flex gap-4 text-6xl font-bold;
}
.icon {
  @apply !w-16 !h-16;
}
</style>
<template>
  <div>
    <p class="mb-6 font-light text-lg">Halo Admin,</p>
    <div class="grid gap-8 lg:grid-cols-3 mb-6">
      <div @click="router.push('/admin/dashboard/kelas')" class="container-item bg-purple-100 hover:bg-purple-200 text-purple-500">
        <p class="item"><IconsLibrary class="icon !text-purple-500" /> {{ kelasTotal }}</p>
        <p>Kelas yang terbuka untuk siswa</p>
      </div>

      <div @click="router.push('/admin/dashboard/siswa')" class="container-item bg-blue-100 hover:bg-blue-200 text-blue-500">
        <p class="item"><IconsGroup class="icon !text-blue-500" />{{ usersTotal }}</p>
        <p>Siswa yang telah bergabung</p>
      </div>

      <div @click="router.push('/admin/dashboard/transaksi')" class="container-item bg-red-100 hover:bg-red-200 text-red-500">
        <p class="item"><IconsMoney class="icon !text-red-500 text-center" />{{ transaksiTotal }}</p>
        <p>Transaksi harus ditinjau (pending)</p>
      </div>
    </div>
  </div>
</template>
