<script setup>
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

useSeoMeta({
  title: 'Pembelian Kelas Tunai'
})
const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const route = useRoute()

const kelasList = ref([])
const kelasListInput = ref('')
const kelasListInputEl = ref()

const userList = ref([])
const userInput = ref('')
const userInputEl = ref()

const hargaKelas = ref(0)

const getKelasDetail = async (value) => {
  const response = (await axios.get(`/kelas/${value}`)).data.data.hargaKelas
  hargaKelas.value = useCurrency(response)
}

let timerUser
const debounceSearchUser = async (value, delay = 500) => {
  clearTimeout(timerUser)
  timerUser = setTimeout(async () => {
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

let timerKelas
const debounceSearchKelas = async (value, delay = 500) => {
  clearTimeout(timerKelas)
  timerKelas = setTimeout(async () => {
    if (kelasListInput.value) {
      const response = (await axios.get(`/kelas?pageSize=15&search=${value}`)).data.data
      kelasList.value = response.rows
    } else {
      kelasList.value = []
    }
  }, delay)
}

const setKelasListInput = (input) => {
  kelasListInput.value = input
  getKelasDetail(input)
  kelasList.value = []
}
const resetKelasList = () => {
  kelasList.value = []
}

const submitForm = async (e) => {
  const formData = Object.fromEntries(new FormData(e.target))

  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    title: 'Yakin ingin memproses pembelian kelas?',
    showConfirmButton: true,
    confirmButtonText: 'Beli',
    showCancelButton: true,
    cancelButtonText: 'Tutup'
  })

  if (isConfirmed) {
    try {
      await axios.post('/admins/transaksi/tunai', formData)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Kelas berhasil dibeli secara tunai',
        showCloseButton: true
      })
      userInput.value = ''
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error.response.data.message,
        confirmButtonText: 'Oke'
      })
      userInput.value = ''
    }
  }
}
</script>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Pembelian Kelas Tunai" :start-index="2" :slice-link="2" />

    <div class="bg-white px-6 py-8 rounded shadow-sm">
      <div class="w-full max-w-md mx-auto">
        <div class="p-8 space-y-6">
          <h2 class="mb-8 text-xl text-center font-bold text-gray-900 dark:text-white">Pembelian Kelas Tunai</h2>
          <div class="p-4 mb-5 max-w-xl mx-auto text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span class="font-medium">Info!</span> Pada kolom ID (kelas atau siswa), <span class="font-semibold">Tidak perlu menulis ID</span>, cukup masukan nama/judul data. Mis: Ingin memasukan kelas Excel, maka ketik saja "excel" maka
            akan muncul daftar kelas terkait, lalu pilih yang sesuai.
          </div>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
            <div class="relative">
              <label for="kelasId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Kelas</label>
              <input
                ref="kelasListInputEl"
                v-model="kelasListInput"
                @input="debounceSearchKelas(kelasListInput)"
                type="text"
                name="kelasId"
                id="kelasId"
                placeholder="Masukan ID Kelas"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                autocomplete="off"
              />
              <div v-click-outside="resetKelasList" v-if="kelasList.length" class="suggestion-container">
                <ul class="flex flex-col text-sm">
                  <li class="suggestion" @click="setKelasListInput(kelas.id)" v-for="kelas in kelasList" :key="kelas.id">{{ kelas.namaKelas }}</li>
                </ul>
              </div>
            </div>
            <div>
              <label for="hargaKelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Kelas</label>
              <input
                v-model="hargaKelas"
                type="text"
                name="hargaKelas"
                id="hargaKelas"
                placeholder="Harga Kelas"
                class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled
              />
            </div>
            <div>
              <label for="maksimalPertemuan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maksimal Pertemuan</label>
              <input
                type="number"
                name="maksimalPertemuan"
                id="maksimalPertemuan"
                placeholder="Maksimal Pertemuan"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value="18"
              />
            </div>
            <div class="relative">
              <label for="userId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Siswa</label>
              <input
                ref="userInputEl"
                v-model="userInput"
                @input="debounceSearchUser(userInput)"
                type="text"
                name="userId"
                id="userId"
                placeholder="Masukan ID Siswa"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                autocomplete="off"
              />
              <div v-click-outside="resetUserList" v-if="userList.length" class="suggestion-container">
                <ul class="flex flex-col text-sm">
                  <li class="suggestion" @click="setUserInput(user.id)" v-for="user in userList" :key="user.id">{{ user.nama }}</li>
                </ul>
              </div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Beli
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
