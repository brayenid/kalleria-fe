<script setup>
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})
const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const route = useRoute()

const oldPassword = ref('')
const newPassword = ref('')
const newPasswordConf = ref('')
const wrongOldPasswordMsg = ref('')
const isSpecValid = computed(() => {
  return isPasswordValid.value && isNewPasswordMatched.value ? true : false
})
const role = useCookie('role')

const isPasswordValid = computed(() => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
  return regex.test(newPassword.value)
})
const isNewPasswordMatched = computed(() => {
  return newPassword.value === newPasswordConf.value ? true : false
})

const isShowErrorPassSpec = computed(() => {
  return newPassword.value ? true : false
})
const isShowErrorPassMatched = computed(() => {
  return newPasswordConf.value ? true : false
})

const loggedInRole = computed(() => {
  return role.value === 'admin' ? 'admins' : 'sudo'
})

const submitForm = async () => {
  const payload = {
    password: oldPassword.value,
    newPassword: newPassword.value
  }

  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    title: 'Yakin mengubah password?',
    text: 'Pastikan menyimpan password setelah mengubahnya',
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: 'Batal',
    confirmButtonText: 'Ubah'
  })
  if (isConfirmed) {
    try {
      await axios.patch(`/${loggedInRole.value}/credential`, payload)
      wrongOldPasswordMsg.value = ''
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Berhasil mengubah password',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      })
      await navigateTo('/admin/dashboard')
    } catch (error) {
      wrongOldPasswordMsg.value = error.response.data.message
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Gagal mengubah password',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Ubah Password" :slice-link="2" :start-index="2" />
    <div class="bg-white w-full p-8 shadow-md rounded-md">
      <div class="max-w-md mx-auto">
        <h1 class="text-center text-lg font-semibold mb-10">Ubah Password Akun</h1>
        <form @submit.prevent="submitForm">
          <div class="mb-6">
            <label for="oldPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Lama <span v-if="wrongOldPasswordMsg" class="text-red-600">(Password salah)</span></label>
            <input
              type="password"
              id="oldPassword"
              v-model="oldPassword"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukan password lama"
              required
            />
          </div>
          <div class="mb-6">
            <label for="newPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password Baru <span v-if="isShowErrorPassSpec && !isPasswordValid" class="text-red-600">(Minimal 1 huruf kapital, 1 angka, dan 8 karakter)</span></label
            >
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukan password baru"
              required
            />
          </div>
          <div class="mb-6">
            <label for="confirmNewPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Konfirmasi Password Baru <span v-if="isShowErrorPassMatched && !isNewPasswordMatched" class="text-red-600">(Password tidak sama)</span></label
            >
            <input
              type="password"
              id="confirmNewPassword"
              v-model="newPasswordConf"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukan kembali password baru"
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
