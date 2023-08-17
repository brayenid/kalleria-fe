<script setup>
import { usePresensiStore } from '~/stores/myPresensiAdminStore'
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const route = useRoute()
const { $axiosAuth: axios } = useNuxtApp()

const presensiStore = usePresensiStore()
const presensiList = ref([])
// PROPERTY WAJIB PAGINATION COMP
const pageNumber = ref(presensiStore.pageNumberPresensi)
const pageSize = 10
const rowsTotal = ref(0)

// FUNGSI WAJIB UNTUK DIPASS DI PAGINATION COMP
const changePage = (number) => {
  presensiStore.$patch({ pageNumberPresensi: number })
}

const resetPageValue = () => {
  presensiStore.$patch({ pageNumberPresensi: 1 })
}

// MEMBACA TIAP PERUBAHAN PADA STATE
presensiStore.$subscribe(async (mutation, state) => {
  const response = (await axios.get(`/absen?pageSize=${pageSize}&pageNumber=${state.pageNumberPresensi}&search=${state.searchPresensi}`)).data.data
  presensiList.value = response.rows
  rowsTotal.value = response.total
})

// MELAKUKAN DELAY PADA PENCARIAN SUPAYA MENGHEMAT PEMANGGILAN KE SERVER DENGAN MENGUBAH STATE PINIA UNTUK
// MEN-TRINGGER PENCARIAN PADA METODE SUBSCIBING DI ATAS
let timer
const debounceSearch = async (value, delay = 1000) => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    presensiStore.pageNumberPresensi !== 1 && presensiStore.$patch({ pageNumberPresensi: 1 })
    presensiStore.$patch({ searchPresensi: value })
  }, delay)
}

onMounted(async () => {
  const response = (await axios.get(`/absen?pageSize=${pageSize}&pageNumber=${pageNumber.value}`)).data.data
  presensiList.value = response.rows
  rowsTotal.value = response.total
})
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Daftar Presensi Siswa" :start-index="2" :slice-link="2" />
    <div class="relative overflow-x-auto shadow rounded-md">
      <div class="p-2 bg-white">
        <SearchInput :search-func="debounceSearch" placeholder-search="Cari : nama, kelas..." />
      </div>
      <div class="h-[400px] overflow-y-auto">
        <table class="w-full text-sm text-left border-t border-gray-100 text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">ID User</th>
              <th scope="col" class="px-4 py-3">Kelas</th>
              <th scope="col" class="px-4 py-3">Pertemuan</th>
              <th scope="col" class="px-4 py-3">Admin</th>
              <th scope="col" class="px-4 py-3">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="presensiList.length" v-for="presensi in presensiList" :key="presensi.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-4 py-4">{{ presensi?.userId }}</td>
              <td class="px-4 py-4">{{ presensi?.namaKelas }}</td>
              <td class="px-4 py-4">{{ presensi?.jumlahPertemuan }}</td>
              <td class="px-4 py-4">{{ presensi?.admin }}</td>
              <td class="px-4 py-4">{{ useLocalDate(presensi?.updatedAt) }}</td>
            </tr>
            <tr v-else>
              <td class="text-center py-4" colspan="9">Belum ada presensi !</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paginations :page-number="presensiStore.pageNumberPresensi" :page-size="pageSize" :rows-total="rowsTotal" :change-page-func="changePage" :reset-page-value-func="resetPageValue" />
    </div>
  </div>
</template>
