<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '~/assets/css/datepicker-putuser.css'

definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})

const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const route = useRoute()

const userDetail = ref()
const putUserEl = ref()
const fotoInput = ref()
const tanggalLahir = ref() // TREATMENT SPESIAL
const previewImageFile = ref('/images/image-placeholder.png')
const showPreview = ref(false)
const isFileSizeExceed = computed(() => {
  return fileSize.value >= 500000 ? true : false
})
const fileName = ref('Belum ada perubahan foto')
const fileSize = ref(0)
const isUploading = ref(false)
const errorMessages = reactive({
  noTelepon: null
})

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
  const putUserPayload = new FormData(e.target)
  putUserPayload.append('tanggalLahir', tanggalLahir.value)

  try {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: 'Yakin mengubah detail akun?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Ubah',
      cancelButtonText: 'Batal'
    })

    if (isConfirmed) {
      isUploading.value = true
      await axios.patch('/users', putUserPayload)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Detail akun berhasil diubah',
        showConfirmButton: false,
        timer: 1000
      })
      putUserEl.value.reset()
      isUploading.value = false
      await navigateTo('/dashboard')
    }
  } catch (error) {
    console.log(error)

    const err = error.response.data.message
    err.map((e) => {
      if (e.path === 'noTelepon') {
        errorMessages.noTelepon = 'Tidak valid'
      }
    })
    isUploading.value = false
    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: 'Gagal mengubah akun',
      showCancelButton: true
    })
  }
}

onMounted(async () => {
  try {
    const response = (await axios.get('/users/detail')).data.data
    userDetail.value = response
    showPreview.value = true
    tanggalLahir.value = response.tanggalLahir
    previewImageFile.value = response.urlFoto ? `${useRuntimeConfig().public.beEndpoint}/${response?.urlFoto}` : '/svg/blank-profile.svg'
  } catch (error) {
    throw createError({ statusCode: 404, message: 'User tidak ditemukan', fatal: true })
  }
})
</script>

<template>
  <div>
    <Loading v-if="isUploading" />
    <Breadcrumbs :path="route.path" :last-point="userDetail?.nama" />
    <section class="bg-white dark:bg-gray-900 rounded shadow">
      <div class="p-8 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-8 text-xl text-center font-bold text-gray-900 dark:text-white">Ubah Detail User</h2>
        <!-- PROFILE PHOTO ELEMENT -->
        <div @click="() => fotoInput.click()" class="cursor-pointer w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-transparent ring-4 ring-blue-400 flex justify-center items-center relative mb-4">
          <img class="object-cover h-full" v-if="showPreview" :src="previewImageFile" />
          <div class="w-full h-full flex justify-center items-center absolute top-0 opacity-0 hover:opacity-100 transition-all">
            <!-- OVERLAY -->
            <div class="bg-gray-200 opacity-25 absolute top-0 left-0 w-full h-full"></div>
            <IconsCamera class="text-xl !text-gray-900" />
          </div>
        </div>
        <div class="text-sm text-center text-gray-800 font-light mb-4">
          <p>
            {{ fileName }} <span class="text-gray-300"> / </span>
            <span :class="{ 'text-red-500': isFileSizeExceed }">{{ formatFileSize(fileSize) }} (Maks. 500 KB)</span>
          </p>
        </div>
        <form @submit.prevent="submitForm" ref="putUserEl">
          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6">
            <div class="w-full col-span-2 sm:col-span-1">
              <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
              <input
                type="text"
                name="nama"
                id="nama"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan nama anda"
                required
                :value="userDetail?.nama"
              />
            </div>
            <div class="w-full col-span-2 sm:col-span-1">
              <label for="noIdentitas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Identitas</label>
              <input
                type="text"
                name="noIdentitas"
                id="noIdentitas"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan noIdentitas lengkap"
                required
                :value="userDetail?.noIdentitas"
              />
            </div>
            <div class="w-full col-span-2 sm:col-span-1">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan email anda"
                required
                :value="userDetail?.email"
              />
            </div>
            <div class="w-full col-span-2 sm:col-span-1">
              <label for="noTelepon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nomor Telepon <span class="font-normal text-red-600" v-show="errorMessages.noTelepon">({{ errorMessages.noTelepon }})</span></label
              >
              <input
                type="tel"
                name="noTelepon"
                id="noTelepon"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan nomor telepon anda"
                required
                :value="userDetail?.noTelepon"
              />
            </div>
            <div class="w-full col-span-2 sm:col-span-1">
              <label for="jenisKelamin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Kelamin</label>

              <select
                name="jenisKelamin"
                id="jenisKelamin"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="laki-laki" :selected="userDetail?.jenisKelamin === 'laki-laki'">Laki-laki</option>
                <option value="perempuan" :selected="userDetail?.jenisKelamin === 'perempuan'">Perempuan</option>
              </select>
            </div>
            <div class="w-full col-span-2 sm:col-span-1">
              <label for="asalSekolah" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asal Sekolah</label>
              <input
                type="text"
                name="asalSekolah"
                id="asalSekolah"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan asal sekolah anda"
                required
                :value="userDetail?.asalSekolah"
              />
            </div>
            <div class="w-full col-span-2 sm:col-span-1">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempat Lahir</label>
              <input
                type="text"
                name="tempatLahir"
                id="tempatLahir"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan tempat lahir anda"
                required
                :value="userDetail?.tempatLahir"
              />
            </div>
            <div class="w-full col-span-2 sm:col-span-1">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="tanggalLahir">Tanggal Lahir</label>
              <VueDatePicker
                id="tanggalLahir"
                v-model="tanggalLahir"
                placeholder="Masukan tanggal lahir"
                format="dd/MM/yyyy"
                preview-format="dd/MM/yyyy"
                text-input
                model-type="dd/MM/yyyy"
                locale="id"
                :enable-time-picker="false"
                :auto-apply="true"
                :max-date="new Date()"
                :text-input-options="{ format: 'dd/MM/yyyy', enterSubmit: true }"
                :hide-input-icon="true"
                required
              ></VueDatePicker>
            </div>
            <div class="w-full col-span-2">
              <label for="alamat" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat</label>
              <input
                type="text"
                name="alamat"
                id="alamat"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Masukan nomor identitas anda"
                required
                :value="userDetail?.alamat"
              />
            </div>
            <div class="w-0 h-0 col-span-2 sm:col-span-1">
              <!-- FILE HANDLER -->
              <div class="w-full sm:col-span-2 hidden">
                <label for="foto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unggah Foto Profil (Maks. 500 kb)</label>
                <input
                  ref="fotoInput"
                  @change="getPreviewImageFile"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  name="foto"
                  id="foto"
                  type="file"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Simpan
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
