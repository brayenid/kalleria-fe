<script setup>
import { usePaginationStore } from '~/stores/myPaginationStore'
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const route = useRoute()
const { $axiosAuth: axios } = useNuxtApp()

const paginationStore = usePaginationStore()
const sertifikatList = ref([])
// PROPERTY WAJIB PAGINATION COMP
const pageNumber = ref(paginationStore.pageNumberSertifikatAdmin)
const pageSize = 10
const rowsTotal = ref(0)

// FUNGSI WAJIB UNTUK DIPASS DI PAGINATION COMP
const changePage = (number) => {
  paginationStore.$patch({ pageNumberSertifikatAdmin: number })
}

const resetPageValue = () => {
  paginationStore.$patch({ pageNumberSertifikatAdmin: 1 })
}

// MEMBACA TIAP PERUBAHAN PADA STATE
paginationStore.$subscribe(async (mutation, state) => {
  const response = (await axios.get(`/sertifikat?pageSize=${pageSize}&pageNumber=${state.pageNumberSertifikatAdmin}&search=${state.searchSertifikat}`)).data.data
  sertifikatList.value = response.rows
  rowsTotal.value = response.total
})

// MELAKUKAN DELAY PADA PENCARIAN SUPAYA MENGHEMAT PEMANGGILAN KE SERVER DENGAN MENGUBAH STATE PINIA UNTUK
// MEN-TRINGGER PENCARIAN PADA METODE SUBSCIBING DI ATAS
let timer
const debounceSearch = async (value, delay = 500) => {
  paginationStore.$patch({ pageNumberSertifikatAdmin: 1 })
  clearTimeout(timer)
  timer = setTimeout(async () => {
    paginationStore.$patch({ searchSertifikat: value })
  }, delay)
}

onMounted(async () => {
  const response = (await axios.get(`/sertifikat?pageSize=${pageSize}&pageNumber=${pageNumber.value}`)).data.data
  sertifikatList.value = response.rows
  rowsTotal.value = response.total
})
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Daftar Sertifikat" :start-index="2" :slice-link="2" />
    <div class="relative overflow-x-auto shadow rounded-md">
      <div class="bg-white flex items-center p-2 overflow-hidden">
        <SearchInput class="flex-[2] sm:flex-[4]" :search-func="debounceSearch" placeholder-search="Cari sertifikat ..." />
      </div>
      <div class="h-[400px] overflow-y-auto">
        <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">Nama</th>
              <th scope="col" class="px-4 py-3">Kelas</th>
              <th scope="col" class="px-4 py-3">Tanggal</th>
              <th scope="col" class="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="sertifikatList.length" v-for="sertifikat in sertifikatList" :key="sertifikat.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-4 py-4">{{ sertifikat?.nama }}</td>
              <td class="px-4 py-4">{{ sertifikat?.namaKelas }}</td>
              <td class="px-4 py-4">{{ useShortenDate(sertifikat?.tanggal) }}</td>
              <td class="px-4 py-4"><a :href="`/sertifikat/${sertifikat?.id}`" target="_blank">Lihat</a></td>
            </tr>
            <tr v-else>
              <td class="text-center py-4" colspan="3">Belum ada sertifikat !</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paginations :page-number="paginationStore.pageNumberTransaksiAdmin" :page-size="pageSize" :rows-total="rowsTotal" :change-page-func="changePage" :reset-page-value-func="resetPageValue" />
    </div>
  </div>
</template>
