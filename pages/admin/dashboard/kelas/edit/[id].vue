<script setup>
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const route = useRoute()

const kelasDetail = ref()
const putKelasEl = ref()
const previewImageFile = ref('')
const showPreview = ref(false)
const isFileSizeExceed = computed(() => {
  return fileSize.value >= 500000 ? true : false
})
const fileName = ref('Belum ada perubahan thumbnail')
const fileSize = ref(0)

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

const getPreviewImageFile = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImageFile.value = e.target.result
      showPreview.value = true
      fileName.value = file.name
      fileSize.value = file.size
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = async (e) => {
  const putKelasPayload = new FormData(e.target)

  try {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: 'Yakin mengubah kelas?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Ubah',
      cancelButtonText: 'Batal'
    })

    if (isConfirmed) {
      await axios.put(`/admins/kelas/${route.params.id}`, putKelasPayload)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Kelas berhasil diubah',
        showConfirmButton: false,
        timer: 1000
      })
      putKelasEl.value.reset()
      await navigateTo('/admin/dashboard/kelas')
    }
  } catch (error) {
    const err = error.response.data.message
    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: err,
      showCancelButton: true
    })
  }
}

onMounted(async () => {
  try {
    const response = (await axios.get(`/kelas/${route.params.id}`)).data.data
    kelasDetail.value = response
    showPreview.value = true
    previewImageFile.value = `${useRuntimeConfig().public.beEndpoint}/${response?.thumbnailKelas}`
  } catch (error) {
    throw createError({ statusCode: 404, message: 'Kelas tidak ditemukan', fatal: true })
  }
})
</script>

<style lang="scss" scoped></style>
<template>
  <div>
    <Breadcrumbs :path="route.path" :last-point="kelasDetail?.namaKelas" :start-index="2" :slice-link="2" />
    <section class="bg-white dark:bg-gray-900 rounded shadow">
      <div class="p-8 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-8 text-xl text-center font-bold text-gray-900 dark:text-white">Ubah Kelas</h2>
        <form @submit.prevent="submitForm" ref="putKelasEl">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label for="namaKelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Kelas</label>
              <input
                type="text"
                name="namaKelas"
                id="namaKelas"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan Nama Kelas"
                required
                :value="kelasDetail?.namaKelas"
              />
            </div>
            <div class="w-full">
              <label for="tipeKelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe Kelas</label>
              <input
                type="text"
                name="tipeKelas"
                id="tipeKelas"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan Tipe Kelas"
                required
                :value="kelasDetail?.tipeKelas"
              />
            </div>
            <div class="w-full">
              <label for="hargaKelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga (Tanpa Titik Pemisah)</label>
              <input
                type="number"
                name="hargaKelas"
                id="hargaKelas"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan angka harga kelas"
                required
                :value="kelasDetail?.hargaKelas"
              />
            </div>
            <div class="w-full sm:col-span-2">
              <label for="thumbnailKelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unggah Thumbnail (Maks. 500 kb)</label>
              <input
                @change="getPreviewImageFile"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                name="thumbnailKelas"
                id="thumbnailKelas"
                type="file"
              />
            </div>
            <div class="sm:col-span-2 flex flex-col gap-4">
              <p class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Tampilan Thumbnail</p>
              <div class="min-h-[200px] bg-gray-200 rounded min-w-[320px] max-w-xs place-self-center">
                <img v-if="showPreview" :src="previewImageFile" />
              </div>
              <div class="text-sm text-gray-800 font-light">
                <p>
                  Nama File : <span class="font-semibold">{{ fileName }}</span> <span class="text-gray-300">/</span> Ukuran File :
                  <span class="font-semibold" :class="{ 'text-red-500': isFileSizeExceed }">{{ formatFileSize(fileSize) }}</span>
                </p>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="deskripsiKelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi Kelas</label>
              <textarea
                name="deskripsiKelas"
                id="deskripsiKelas"
                rows="8"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan deskripsi singkat kelas di sini..."
                :value="kelasDetail?.deskripsiKelas"
              >
              </textarea>
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ubah Kelas
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
