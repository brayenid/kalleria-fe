<script setup>
definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})

useSeoMeta({
  title: 'Dashboard User'
})
const route = useRoute()
const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()

const kelasUserDetail = ref('')
const sertifikatInfo = ref('')

const claimSertifikat = async () => {
  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    title: 'Yakin klaim sertifikat?',
    showConfirmButton: true,
    confirmButtonText: 'Klaim',
    showCancelButton: true,
    cancelButtonText: 'Tutup'
  })

  if (isConfirmed) {
    try {
      await axios.post(`/sertifikat/claim/${route.params.id}`)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Sertifikat berhasil diklaim',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      })
      return navigateTo('/dashboard/kelasuser')
    } catch (error) {
      const err = error.response.data.message
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: err
      })
    }
  }
}

onMounted(async () => {
  try {
    const response = (await axios.get(`/kelasuser/${route.params.id}`)).data.data
    kelasUserDetail.value = response

    const sertifikatKelasUser = (await axios.get(`/sertifikat/kelasuser/${route.params.id}`)).data.data
    sertifikatInfo.value = sertifikatKelasUser
    console.log(sertifikatInfo.value)
  } catch (error) {
    throw createError({ statusCode: 403, message: 'Forbidden', fatal: true })
  }
})
</script>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="klaim sertifikat" />
    <div class="bg-white rounded shadow p-6">
      <h1 class="text-lg mb-4 font-semibold">Halo, {{ kelasUserDetail?.nama }}</h1>
      <p class="mb-4">
        Selamat yang sebesar-besarnya atas kelulusanmu pada <span class="font-semibold">{{ kelasUserDetail?.namaKelas }}</span
        >! Perjalanan panjang yang telah kamu tempuh untuk mencapai titik ini patut dihargai. Sungguh luar biasa melihat betapa tekunnya kamu dalam menghadapi setiap tugas dan ujian. Semua usaha itu telah membawa kamu menuju kesuksesan ini.
        Jangan pernah meremehkan nilai dari ilmu yang telah kamu peroleh, karena itu adalah aset berharga yang akan selalu bersamamu.
      </p>
      <div class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div><span class="font-medium">Info!</span> Klaim sertifikatmu melalui halaman ini, jika ingin mencetaknya kamu bisa mendatangi kantor LPK Kalleria.</div>
      </div>

      <div>
        <button
          v-if="!sertifikatInfo"
          @click="claimSertifikat"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Klaim Sertifikat
        </button>
        <button v-else @click="claimSertifikat" class="text-gray-300 bg-gray-100 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled>Sudah Diklaim</button>
      </div>
    </div>
  </div>
</template>
