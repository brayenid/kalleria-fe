<script setup>
definePageMeta({
  middleware: 'auth-admin',
  layout: false
})

useSeoMeta({
  title: 'Presensi Kelas'
})
const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()

const kelasList = ref([])
const userList = ref([])
const userInput = ref('')
const userInputEl = ref()

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

  try {
    await axios.post('/absen', formData)
    Swal.fire({
      icon: 'success',
      title: 'Berhasil Mengisi Presensi',
      timer: 1500,
      timerProgressBar: true
    })
    userInput.value = ''
    setTimeout(() => {
      userInputEl.value.focus()
    }, 500)
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: error.response.data.message,
      confirmButtonText: 'Oke',
      timer: 3000,
      timerProgressBar: true
    })
    userInput.value = ''
    setTimeout(() => {
      userInputEl.value.focus()
    }, 500)
  }
}

onMounted(async () => {
  const response = (await axios.get('/kelas?pageSize=100')).data.data
  kelasList.value = response.rows
})
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="/images/kalleria-logo.png" alt="logo" />
        Kalleria
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Presensi</h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
            <div>
              <label for="kelasId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelas</label>
              <select
                id="kelasId"
                name="kelasId"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="kelas in kelasList" :key="kelas?.id" :value="kelas?.id">{{ kelas?.namaKelas }} ({{ kelas?.id }})</option>
              </select>
            </div>
            <div>
              <label for="jumlahPertemuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah Pertemuan</label>
              <input
                type="number"
                name="jumlahPertemuan"
                id="jumlahPertemuan"
                placeholder="Masukan Jumlah Pertemuan"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value="1"
              />
            </div>
            <div class="relative">
              <label for="userId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Siswa</label>
              <input
                ref="userInputEl"
                v-model="userInput"
                @input="debounceSearch(userInput)"
                type="text"
                name="userId"
                id="userId"
                placeholder="Masukan ID Siswa"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                autofocus
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
              Isi Presensi
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
