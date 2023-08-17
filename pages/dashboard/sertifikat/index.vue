<script setup>
import { useSertifikatStore } from '~/stores/mySertifikatUserStore'

definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})

const sertifikatStore = useSertifikatStore()
const { $axiosAuth: axios } = useNuxtApp()
const sertifikatList = ref([])
const route = useRoute()

// PROPERTY WAJIB PAGINATION COMP
const pageNumber = ref(sertifikatStore.pageNumberSertifikat)
const pageSize = 10
const rowsTotal = ref(0)

// FUNGSI WAJIB UNTUK DIPASS DI PAGINATION COMP
const changePage = (number) => {
  sertifikatStore.$patch({ pageNumberSertifikat: number })
}

const resetPageValue = () => {
  sertifikatStore.$patch({ pageNumberSertifikat: 1 })
}

sertifikatStore.$subscribe(async (mutation, state) => {
  const response = (await axios.get(`/sertifikat/users?pageSize=${pageSize}&pageNumber=${state.pageNumberSertifikat}`)).data.data
  sertifikatList.value = response.rows
})

onMounted(async () => {
  const response = (await axios.get(`/sertifikat/users?pageSize=${pageSize}&pageNumber=${pageNumber.value}`)).data.data
  sertifikatList.value = response.rows
  rowsTotal.value = response.total
})
</script>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Sertifikat" />
    <div class="relative overflow-x-auto shadow rounded-md">
      <div class="h-[400px] overflow-y-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">Kelas</th>
              <th scope="col" class="px-4 py-3">Tanggal</th>
              <th scope="col" class="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="sertifikatList.length" v-for="sertifikat in sertifikatList" :key="sertifikat.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-4 py-4">{{ sertifikat?.namaKelas }}</td>
              <td class="px-4 py-4">{{ useShortenDate(sertifikat?.tanggal) }}</td>
              <td class="px-4 py-4"><a class="text-blue-600 hover:underline" :href="`/sertifikat/${sertifikat?.id}`" target="_blank">Lihat</a></td>
            </tr>
            <tr v-else>
              <td class="text-center py-4" colspan="3">Belum ada sertifikat !</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paginations :page-number="sertifikatStore.pageNumberSertifikat" :page-size="pageSize" :rows-total="rowsTotal" :change-page-func="changePage" :reset-page-value-func="resetPageValue" />
    </div>
  </div>
</template>
stores/mySertifikatUserStore
