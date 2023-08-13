<script setup>
import { usePaginationStore } from '~/stores/myPaginationStore'
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const route = useRoute()
const { $axiosAuth: axios } = useNuxtApp()

const paginationStore = usePaginationStore()
const usersList = ref([])
// PROPERTY WAJIB PAGINATION COMP
const pageNumber = ref(paginationStore.pageNumberUsers)
const pageSize = 2
const rowsTotal = ref(0)

// FUNGSI WAJIB UNTUK DIPASS DI PAGINATION COMP
const changePage = (number) => {
  paginationStore.$patch({ pageNumberUsers: number })
}

const resetPageValue = () => {
  paginationStore.$patch({ pageNumberUsers: 1 })
}

// MEMBACA TIAP PERUBAHAN PADA STATE
paginationStore.$subscribe(async (mutation, state) => {
  const response = (await axios.get(`/users?pageSize=${pageSize}&pageNumber=${state.pageNumberUsers}&search=${state.searchUser}`)).data.data
  usersList.value = response.rows
  rowsTotal.value = response.total
})

// MELAKUKAN DELAY PADA PENCARIAN SUPAYA MENGHEMAT PEMANGGILAN KE SERVER DENGAN MENGUBAH STATE PINIA UNTUK
// MEN-TRINGGER PENCARIAN PADA METODE SUBSCIBING DI ATAS
let timer
const debounceSearch = async (value, delay = 500) => {
  paginationStore.$patch({ pageNumberUsers: 1 })
  clearTimeout(timer)
  timer = setTimeout(async () => {
    paginationStore.$patch({ searchUser: value })
  }, delay)
}

onMounted(async () => {
  const response = (await axios.get(`/users?pageSize=${pageSize}&pageNumber=${pageNumber.value}`)).data.data
  usersList.value = response.rows
  rowsTotal.value = response.total
})
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Daftar Siswa" :start-index="2" :slice-link="2" />
    <div class="relative overflow-x-auto shadow rounded-md">
      <div class="p-2 bg-white">
        <SearchInput :search-func="debounceSearch" placeholder-search="Cari : id, nama, username..." />
      </div>
      <div class="h-[400px] overflow-y-auto">
        <table class="w-full text-sm text-left border-t border-gray-100 text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">ID User</th>
              <th scope="col" class="px-4 py-3">Username</th>
              <th scope="col" class="px-4 py-3">Nama</th>
              <th scope="col" class="px-4 py-3">Asal Sekolah</th>
              <th scope="col" class="px-4 py-3">Bergabung</th>
              <th scope="col" class="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="usersList.length" v-for="user in usersList" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-4 py-4">{{ user?.id }}</td>
              <td class="px-4 py-4">{{ user?.username }}</td>
              <td class="px-4 py-4">{{ user?.nama }}</td>
              <td class="px-4 py-4">{{ user?.asalSekolah }}</td>
              <td class="px-4 py-4">{{ new Date(user?.createdAt).getFullYear() }}</td>
              <td class="px-4 py-4">
                <NuxtLink :to="`/admin/dashboard/siswa/${user?.id}`" class="font-medium text-blue-500 dark:text-blue-500 hover:underline">Detail</NuxtLink>
              </td>
            </tr>
            <tr v-else>
              <td class="text-center py-4" colspan="9">Belum ada siswa !</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paginations :page-number="paginationStore.pageNumberUsers" :page-size="pageSize" :rows-total="rowsTotal" :change-page-func="changePage" :reset-page-value-func="resetPageValue" />
    </div>
  </div>
</template>
