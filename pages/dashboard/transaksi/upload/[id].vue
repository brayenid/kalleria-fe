<script setup>
definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})
const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const transaksiDetail = ref()
const fileName = ref('Belum ada file dipilih')
const fileSize = ref(0)
const isActiveClass = ref(false)
const isFormCanBeSendByStatus = computed(() => {
  return transaksiDetail.value?.status === 'pending' || transaksiDetail.value?.status === 'ditolak' ? true : false
})
const isFileSizeExceed = computed(() => {
  return fileSize.value >= 500000 ? true : false
})

const fileInputEl = ref()
const route = useRoute()
const dropZone = (e) => {
  const files = e.dataTransfer.files
  if (files.length > 0) {
    fileInputEl.value.files = files
    fileName.value = files[0].name
    fileSize.value = files[0].size
  }
}

const manualDropzone = (e) => {
  const files = e.target.files
  if (files.length > 0) {
    fileName.value = files[0].name
    fileSize.value = files[0].size
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

const submitForm = async () => {
  try {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: 'Yakin mengunggah bukti bayar?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Unggah',
      cancelButtonText: 'Batal'
    })
    if (isConfirmed) {
      const formData = new FormData()
      const file = fileInputEl.value.files[0]
      formData.append('buktiBayar', file)
      await axios.patch(`/transaksi/${transaksiDetail.value?.id}`, formData)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Bukti bayar berhasil diunggah, silahkan menunggu verifikasi admin',
        timer: 1200,
        timerProgressBar: true,
        showCloseButton: true
      })
      isFormCanBeSendByStatus.value = false
      await navigateTo('/dashboard/transaksi')
    }
  } catch (error) {
    const err = error.response.data.message

    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: err,
      showCloseButton: true
    })
  }
}

onMounted(async () => {
  try {
    const response = (await axios.get(`/transaksi/detail/${route.params.id}`)).data.data
    transaksiDetail.value = response
  } catch (error) {
    const err = error.response.data.message
    throw createError({
      statusCode: '403',
      message: err,
      fatal: true
    })
  }
})
</script>

<style lang="postcss" scoped>
.drop-zone {
  @apply flex items-center mb-4 cursor-pointer justify-center w-full border-2 bg-gray-50 border-gray-300 border-dashed rounded-lg dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800 dark:bg-gray-700;
}
</style>
<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Unggah Bukti Bayar" />
    <section class="bg-white dark:bg-gray-900 rounded shadow">
      <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 class="mb-8 text-xl text-center font-bold text-gray-900 dark:text-white">Unggah Bukti Pembayaran</h2>
        <form @submit.prevent="submitForm">
          <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:mb-5">
            <div class="sm:col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Transaksi</label>
              <input
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                :value="transaksiDetail?.id"
                disabled
              />
            </div>
            <div class="sm:col-span-2 mb-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Transaksi</label>
              <input
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                :value="transaksiDetail?.namaTransaksi"
                disabled
              />
            </div>
            <div class="sm:col-span-2">
              <div
                @click="fileInputEl.click()"
                @dragenter.prevent="isActiveClass = true"
                @dragover.prevent="isActiveClass = true"
                @dragleave.prevent="isActiveClass = false"
                @drop.prevent="dropZone"
                :class="{ '!border-blue-400 !bg-blue-200': isActiveClass }"
                class="drop-zone"
              >
                <div class="flex flex-col items-center justify-center p-9 py-12 text-center">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Klik untuk menggunggah</span> atau tarik file lalu lepaskan di sini</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">PNG atau JPG (Maks. 500 kb)</p>
                </div>
                <input @change="manualDropzone" id="dropzone-file" class="hidden" type="file" ref="fileInputEl" required />
              </div>
              <div class="text-sm text-gray-800 font-light">
                <p>
                  Nama File : <span class="font-semibold">{{ fileName }}</span> <span class="text-gray-300">/</span> Ukuran File :
                  <span class="font-semibold" :class="{ 'text-red-500': isFileSizeExceed }">{{ formatFileSize(fileSize) }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              :disabled="!isFormCanBeSendByStatus"
              :class="{ 'cursor-not-allowed hover:!bg-gray-400 !bg-gray-400': !isFormCanBeSendByStatus }"
            >
              Unggah
            </button>
            <NuxtLink
              to="/dashboard/transaksi"
              class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Batal
            </NuxtLink>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
