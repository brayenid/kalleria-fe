<script setup>
import { useTransaksiStore } from '~/stores/myTransaksiUserStore'

definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})

const transaksiStore = useTransaksiStore()
const { $axiosAuth: axios } = useNuxtApp()
const transaksiList = ref([])
const route = useRoute()

// PROPERTY WAJIB PAGINATION COMP
const pageNumber = ref(transaksiStore.pageNumberTransaksi)
const pageSize = 5
const rowsTotal = ref(0)

// FUNGSI WAJIB UNTUK DIPASS DI PAGINATION COMP
const changePage = (number) => {
  transaksiStore.$patch({ pageNumberTransaksi: number })
}

const resetPageValue = () => {
  transaksiStore.$patch({ pageNumberTransaksi: 1 })
}

transaksiStore.$subscribe(async (mutation, state) => {
  const response = (await axios.get(`/transaksi/user?pageSize=${pageSize}&pageNumber=${state.pageNumberTransaksi}`)).data.data
  transaksiList.value = response.rows
})

onMounted(async () => {
  const response = (await axios.get(`/transaksi/user?pageSize=${pageSize}&pageNumber=${pageNumber.value}`)).data.data
  transaksiList.value = response.rows
  rowsTotal.value = response.total
})
</script>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Transaksi" />
    <div class="relative overflow-x-auto shadow rounded-md">
      <div class="h-[400px] overflow-y-auto">
        <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-2 py-3"></th>
              <th scope="col" class="px-4 pl-0 py-3">ID Transaksi</th>
              <th scope="col" class="px-4 py-3">Nama Transaksi</th>
              <th scope="col" class="px-4 py-3">Kelas</th>
              <th scope="col" class="px-4 py-3">Harga</th>
              <th scope="col" class="px-4 py-3">Status</th>
              <th scope="col" class="px-4 py-3">Tanggal</th>
              <th scope="col" class="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="transaksiList.length" v-for="transaksi in transaksiList" :key="transaksi.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-4 py-4"><IconsClock v-if="transaksi?.status === 'pending'" /></td>
              <td class="px-4 pl-0 py-4">{{ transaksi?.id }}</td>
              <td class="px-4 py-4">{{ transaksi?.namaTransaksi }}</td>
              <td class="px-4 py-4">{{ transaksi?.kelasId }}</td>
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
              <td class="px-4 py-4">{{ useShortenDate(transaksi?.updatedAt) }}</td>
              <td class="px-4 py-4">
                <div v-if="transaksi?.status === 'pending' || transaksi?.status === 'ditolak'">
                  <NuxtLink :to="`/dashboard/transaksi/upload/${transaksi?.id}`" class="font-medium text-blue-500 dark:text-blue-500 hover:underline">Kirim Bukti Bayar</NuxtLink>
                </div>
                <div v-if="transaksi?.status === 'diterima'">
                  <a :href="`/print/transaksi/${transaksi?.id}`" target="_blank" class="font-medium text-blue-500 dark:text-blue-500 hover:underline">Cetak Transaksi</a>
                </div>
              </td>
            </tr>
            <tr v-else>
              <td class="text-center py-4" colspan="9">Belum ada transaksi !</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paginations :page-number="transaksiStore.pageNumberTransaksi" :page-size="pageSize" :rows-total="rowsTotal" :change-page-func="changePage" :reset-page-value-func="resetPageValue" />
    </div>
  </div>
</template>
