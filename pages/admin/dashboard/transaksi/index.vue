<script setup>
import { useTransaksiStore } from '~/stores/myTransaksiAdminStore'
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const route = useRoute()
const { $axiosAuth: axios } = useNuxtApp()

const transaksiStore = useTransaksiStore()
const transaksiList = ref([])
// PROPERTY WAJIB PAGINATION COMP
const pageNumber = ref(transaksiStore.pageNumberTransaksi)
const pageSize = 10
const rowsTotal = ref(0)

// FUNGSI WAJIB UNTUK DIPASS DI PAGINATION COMP
const changePage = (number) => {
  transaksiStore.$patch({ pageNumberTransaksi: number })
}

const resetPageValue = () => {
  transaksiStore.$patch({ pageNumberTransaksi: 1 })
}

const getChangedStatusValue = (e) => {
  transaksiStore.$patch({ filterTransaksi: e.target.value })
}

// MEMBACA TIAP PERUBAHAN PADA STATE
transaksiStore.$subscribe(async (mutation, state) => {
  const response = (await axios.get(`/transaksi?pageSize=${pageSize}&pageNumber=${state.pageNumberTransaksi}&search=${state.searchTransaksi}&status=${state.filterTransaksi}`)).data.data
  transaksiList.value = response.rows
  rowsTotal.value = response.total
})

// MELAKUKAN DELAY PADA PENCARIAN SUPAYA MENGHEMAT PEMANGGILAN KE SERVER DENGAN MENGUBAH STATE PINIA UNTUK
// MEN-TRINGGER PENCARIAN PADA METODE SUBSCIBING DI ATAS
let timer
const debounceSearch = async (value, delay = 1000) => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    transaksiStore.pageNumberTransaksi !== 1 && transaksiStore.$patch({ pageNumberTransaksi: 1 })
    transaksiStore.$patch({ searchTransaksi: value })
  }, delay)
}

onMounted(async () => {
  const response = (await axios.get(`/transaksi?pageSize=${pageSize}&pageNumber=${pageNumber.value}`)).data.data
  transaksiList.value = response.rows
  rowsTotal.value = response.total
})

onUnmounted(() => {
  transaksiStore.$patch({ searchTransaksi: '', filterTransaksi: '' })
})
</script>
<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Daftar Transaksi" :start-index="2" :slice-link="2" />
    <div class="relative overflow-x-auto shadow rounded-md">
      <div class="bg-white flex items-center p-2 overflow-hidden">
        <SearchInput class="flex-[2] sm:flex-[4]" :search-func="debounceSearch" placeholder-search="Cari transaksi ..." />
        <StatusTransaksi :change-func="getChangedStatusValue" />
        <a class="p-1 px-2" href="/admin/dashboard/transaksi/date" target="_blank" title="Cetak Transaksi">
          <IconsPrint class="hover:text-green-500" />
        </a>
      </div>
      <div class="h-[400px] overflow-y-auto">
        <table class="w-full text-xs text-left border-t border-gray-100 text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">ID Transaksi</th>
              <th scope="col" class="px-4 py-3">Nama Transaksi</th>
              <th scope="col" class="px-4 py-3">Nama Siswa</th>
              <th scope="col" class="px-4 py-3">Harga</th>
              <th scope="col" class="px-4 py-3">Status</th>
              <th scope="col" class="px-4 py-3">Tanggal</th>
              <th scope="col" class="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="transaksiList.length" v-for="transaksi in transaksiList" :key="transaksi.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-4 py-4">{{ transaksi?.id }}</td>
              <td class="px-4 py-4">{{ transaksi?.namaTransaksi }}</td>
              <td class="px-4 py-4">{{ useShortenName(transaksi?.nama) }}</td>
              <td class="px-4 py-4">{{ useCurrency(transaksi?.hargaKelas) }}</td>
              <td class="px-4 py-4">
                <span
                  class="p-1 rounded"
                  :class="{
                    'bg-orange-100 text-orange-600': transaksi?.status === 'pending',
                    'bg-green-100 text-green-600': transaksi?.status === 'dibayar',
                    'bg-blue-100 text-blue-600': transaksi?.status === 'diterima',
                    'bg-red-100 text-red-600': transaksi?.status === 'ditolak'
                  }"
                  >{{ transaksi?.status }}</span
                >
              </td>
              <td class="px-4 py-4">{{ useLocalDate(transaksi?.updatedAt, 'short') }}</td>
              <td class="px-4 py-4">
                <NuxtLink :to="`/admin/dashboard/transaksi/${transaksi?.id}`" class="font-medium text-blue-500 dark:text-blue-500 hover:underline">Detail</NuxtLink>
              </td>
            </tr>
            <tr v-else>
              <td class="text-center py-6" colspan="9">Tidak ada transaksi !</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paginations :page-number="transaksiStore.pageNumberTransaksi" :page-size="pageSize" :rows-total="rowsTotal" :change-page-func="changePage" :reset-page-value-func="resetPageValue" />
    </div>
  </div>
</template>
stores/myTransaksiAdminStore
