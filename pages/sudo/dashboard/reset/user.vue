<script setup>
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

useSeoMeta({
  title: 'Dashboard Admin'
})
const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const route = useRoute()

const userList = ref([])
const userInput = ref('')
const userInputEl = ref()
const newPassword = ref('')

let timer
const debounceSearch = async (value, delay = 500) => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    if (userInput.value) {
      const response = (await axios.get(`/users?pageSize=10&search=${value}`)).data.data
      userList.value = response.rows
    } else {
      userList.value = []
    }
  }, delay)
}

const setUserInput = (input) => {
  userInput.value = input
  userList.value = []
}

const resetUserList = () => {
  userList.value = []
}

const submitForm = async (e) => {
  const formData = Object.fromEntries(new FormData(e.target))

  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    title: 'Yakin ingin me-reset password user?',
    showConfirmButton: true,
    confirmButtonText: 'Reset',
    showCancelButton: true,
    cancelButtonText: 'Tutup'
  })

  if (isConfirmed) {
    try {
      const response = (await axios.patch('/sudo/reset/user', formData)).data.data
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Akun berhasil di-reset',
        showCloseButton: true
      })
      newPassword.value = response
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error.response.data.message,
        confirmButtonText: 'Oke'
      })
    }
  }
}
</script>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Reset User" :start-index="2" :slice-link="2" />

    <div class="bg-white dark:bg-gray-900 rounded shadow">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div class="w-full max-w-lg p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Reset Password User</h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
            <div class="relative">
              <label for="userId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID User</label>
              <input
                ref="userInputEl"
                v-model="userInput"
                @input="debounceSearch(userInput)"
                type="text"
                name="userId"
                id="userId"
                placeholder="Masukan ID User"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                autocomplete="off"
              />
              <div v-click-outside="resetUserList" v-if="userList.length" class="bg-gray-50 w-full border border-gray-300 absolute rounded">
                <ul class="flex flex-col text-sm">
                  <li class="hover:bg-gray-100 p-2 cursor-pointer" @click="setUserInput(user.id)" v-for="user in userList" :key="user.id">{{ user.nama }} ({{ user.id }})</li>
                </ul>
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset
            </button>
          </form>
          <div v-if="newPassword" class="w-full p-4 bg-gray-100 text-center">
            <p class="text-lg">{{ newPassword }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
