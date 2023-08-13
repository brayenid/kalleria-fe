<script setup>
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const { $axiosAuth: axios } = useNuxtApp()

const transaksiTotal = ref(0)
const usersTotal = ref(0)
const kelasTotal = ref(0)

onMounted(async () => {
  const responseTransaksiTotal = (await axios.get('/transaksi?pageSize=1')).data.data.total
  transaksiTotal.value = responseTransaksiTotal

  const responseUsersTotal = (await axios.get('/users?pageSize=1')).data.data.total
  usersTotal.value = responseUsersTotal

  const responseKelasTotal = (await axios.get('/kelas?pageSize=1')).data.data.total
  kelasTotal.value = responseKelasTotal
})
</script>

<style lang="postcss" scoped>
.container-item {
  @apply shadow rounded p-6 flex flex-col justify-center items-center;
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
      <div class="container-item bg-purple-100 text-purple-500">
        <p class="item"><IconsLibrary class="icon !text-purple-500" /> {{ kelasTotal }}</p>
        <p>Kelas yang terbuka untuk siswa</p>
      </div>

      <div class="container-item bg-blue-100 text-blue-500">
        <p class="item"><IconsGroup class="icon !text-blue-500" />{{ usersTotal }}</p>
        <p>Siswa yang telah bergabung</p>
      </div>

      <div class="container-item bg-green-100 text-green-500">
        <p class="item"><IconsMoney class="icon !text-green-500" />{{ transaksiTotal }}</p>
        <p>Transaksi yang telah dilakukan</p>
      </div>
    </div>
  </div>
</template>
