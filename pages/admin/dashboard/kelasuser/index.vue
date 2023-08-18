<script setup>
import { useKelasUsersStore } from '~/stores/myKelasUsersAdminStore'
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const route = useRoute()
const { $axiosAuth: axios } = useNuxtApp()

const kelasUsersStore = useKelasUsersStore()
const kelasUserList = ref([])
// PROPERTY WAJIB PAGINATION COMP
const pageNumber = ref(kelasUsersStore.pageNumberKelasUsers)
const pageSize = 10
const rowsTotal = ref(0)

// FUNGSI WAJIB UNTUK DIPASS DI PAGINATION COMP
const changePage = (number) => {
  kelasUsersStore.$patch({ pageNumberKelasUsers: number })
}

const resetPageValue = () => {
  kelasUsersStore.$patch({ pageNumberKelasUsers: 1 })
}

// MEMBACA TIAP PERUBAHAN PADA STATE
kelasUsersStore.$subscribe(async (mutation, state) => {
  const response = (await axios.get(`/kelasuser?pageSize=${pageSize}&pageNumber=${state.pageNumberKelasUsers}&search=${state.searchKelasUsers}`)).data.data
  kelasUserList.value = response.rows
  rowsTotal.value = response.total
})

// MELAKUKAN DELAY PADA PENCARIAN SUPAYA MENGHEMAT PEMANGGILAN KE SERVER DENGAN MENGUBAH STATE PINIA UNTUK
// MEN-TRINGGER PENCARIAN PADA METODE SUBSCIBING DI ATAS
let timer
const debounceSearch = async (value, delay = 1000) => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    kelasUsersStore.pageNumberKelasUsers !== 1 && kelasUsersStore.$patch({ pageNumberKelasUsers: 1 })
    kelasUsersStore.$patch({ searchKelasUsers: value })
  }, delay)
}

onMounted(async () => {
  const response = (await axios.get(`/kelasuser?pageSize=${pageSize}&pageNumber=${pageNumber.value}`)).data.data
  kelasUserList.value = response.rows
  rowsTotal.value = response.total
})

onUnmounted(() => {
  kelasUsersStore.$patch({ searchKelasUsers: '' })
})
</script>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Daftar Kelas User" :start-index="2" :slice-link="2" />
    <div class="relative overflow-x-auto shadow rounded-md">
      <div class="bg-white flex items-center p-2 overflow-hidden">
        <SearchInput class="flex-[2] sm:flex-[4]" :search-func="debounceSearch" placeholder-search="Cari kelas user ..." />
      </div>
      <div class="h-[400px] overflow-y-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">Nama</th>
              <th scope="col" class="px-4 py-3">Kelas</th>
              <th scope="col" class="px-4 py-3">Presensi</th>
              <th scope="col" class="px-4 py-3">Maks. Pertemuan</th>
              <th scope="col" class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="kelasUserList.length" v-for="kelasUser in kelasUserList" :key="kelasUser.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-4 py-4">{{ kelasUser?.nama }}</td>
              <td class="px-4 py-4">{{ kelasUser?.namaKelas }}</td>
              <td class="px-4 py-4">{{ kelasUser?.presensi }}</td>
              <td class="px-4 py-4">{{ kelasUser?.maksimalPertemuan }}</td>
              <td class="px-4 py-4">
                <p v-if="kelasUser?.presensi >= kelasUser?.maksimalPertemuan" class="bg-blue-100 text-blue-600 p-2 rounded text-center">Lulus</p>
              </td>
            </tr>
            <tr v-else>
              <td class="text-center py-4" colspan="5">Belum ada kelas siswa !</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paginations :page-number="kelasUsersStore.pageNumberKelasUsers" :page-size="pageSize" :rows-total="rowsTotal" :change-page-func="changePage" :reset-page-value-func="resetPageValue" />
    </div>
  </div>
</template>
stores/myKelasUsersAdminStore
