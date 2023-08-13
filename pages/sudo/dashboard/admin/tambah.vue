<script setup>
definePageMeta({
  middleware: 'auth-sudo',
  layout: 'admin-dashboard'
})
const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const route = useRoute()
const submitFormEl = ref()

const username = ref('')
const nama = ref('')
const password = ref('')
const passwordConf = ref('')

const usernameError = ref('')
const isSpecValid = computed(() => {
  return isPasswordValid.value && isPasswordMatched.value ? true : false
})

const isPasswordValid = computed(() => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
  return regex.test(password.value)
})
const isPasswordMatched = computed(() => {
  return password.value === passwordConf.value ? true : false
})

const isShowErrorPassSpec = computed(() => {
  return password.value ? true : false
})
const isShowErrorPassMatched = computed(() => {
  return passwordConf.value ? true : false
})

const submitForm = async () => {
  const payload = {
    username: username.value,
    nama: nama.value,
    password: password.value
  }

  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    title: 'Yakin menambah admin?',
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: 'Batal',
    confirmButtonText: 'Tambah'
  })
  if (isConfirmed) {
    try {
      await axios.post('/admins', payload)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Berhasil menambah admin',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      })
      submitFormEl.value.reset()
    } catch (error) {
      usernameError.value = error.response.data.message[0]['msg']
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Gagal menambah admin',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      })
    }
  }
}
</script>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Tambah Admin" :start-index="2" :slice-link="2" />

    <div class="bg-white w-full p-8 shadow-md rounded-md">
      <div class="max-w-md mx-auto">
        <h1 class="text-center text-lg font-semibold mb-10">Tambah Admin</h1>
        <form @submit.prevent="submitForm" ref="submitFormEl">
          <div class="mb-6">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Username <span v-if="usernameError" class="text-red-600">({{ usernameError }})</span></label
            >
            <input
              type="text"
              id="username"
              v-model="username"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukan username"
              required
            />
          </div>
          <div class="mb-6">
            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
            <input
              type="text"
              id="nama"
              v-model="nama"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukan nama admin"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password <span v-if="isShowErrorPassSpec && !isPasswordValid" class="text-red-600">(Minimal 1 huruf kapital, 1 angka, dan 8 karakter)</span></label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukan password"
              required
            />
          </div>
          <div class="mb-6">
            <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Konfirmasi Password <span v-if="isShowErrorPassMatched && !isPasswordMatched" class="text-red-600">(Password tidak sama)</span></label
            >
            <input
              type="password"
              id="confirmPassword"
              v-model="passwordConf"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukan kembali password"
              required
            />
          </div>
          <button
            :disabled="!isSpecValid"
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
