<script setup>
import { usePaginationStore } from '~/stores/myPaginationStore'

definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const { $axiosAuth: axios, $scrollTo: scrollTo } = useNuxtApp()
const paginationStore = usePaginationStore()
const kelasList = ref([])
const isLoading = ref(true)
const route = useRoute()
const kelasListEl = ref()

// MELAKUKAN DELAY PADA PENCARIAN SUPAYA MENGHEMAT PEMANGGILAN KE SERVER DENGAN MENGUBAH STATE PINIA UNTUK
// MEN-TRINGGER PENCARIAN PADA METODE SUBSCIBING DI ATAS
let timer
const debounceSearch = async (value, delay = 1000) => {
  paginationStore.$patch({ pageNumberKelas: 1 })
  clearTimeout(timer)
  timer = setTimeout(async () => {
    paginationStore.$patch({ searchKelas: value })
  }, delay)
}

// PAGINATION MANDATORY STATE
const pageNumber = ref(paginationStore.pageNumberKelas)
const pageSize = 6
const rowsTotal = ref(0)

// PAGINATION MANDATORY FUNC
const changePage = (number) => {
  const scroll = scrollTo(kelasListEl.value, 500, {
    offset: -70
  })
  paginationStore.$patch({ pageNumberKelas: number })
  setTimeout(() => {
    scroll()
  }, 1000)
}

const resetPageValue = () => {
  paginationStore.$patch({ pageNumberKelas: 1 })
}

paginationStore.$subscribe(async (mutation, state) => {
  const response = (await axios.get(`/kelas?pageSize=${pageSize}&pageNumber=${state.pageNumberKelas}&search=${state.searchKelas}`)).data.data
  kelasList.value = response.rows
})

onMounted(async () => {
  const response = (await axios.get(`/kelas?pageSize=${pageSize}&pageNumber=${pageNumber.value}`)).data.data
  if (response) {
    isLoading.value = false
  }

  rowsTotal.value = response.total
  kelasList.value = response.rows
})
</script>

<style lang="postcss" scoped>
.kelas-list {
  @apply p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-blue-300 transition-all dark:bg-gray-800 dark:border-gray-700;
}
</style>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="kelas" :start-index="2" :slice-link="2" />
    <section ref="kelasListEl" class="bg-white dark:bg-gray-900 shadow rounded-md">
      <div class="p-8 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 class="mb-4 text-3xl lg:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">Daftar Kelas</h2>
        </div>
        <div class="bg-white">
          <SearchInput class="mb-8 border-b border-gray-200" :search-func="debounceSearch" placeholder-search="Cari kelas..." />
        </div>
        <div class="min-h-[300px]">
          <div class="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 mb-6">
            <article v-if="kelasList.length" class="kelas-list" v-for="kelas in kelasList" :key="kelas.id">
              <div class="flex justify-between items-center mb-5 text-gray-500">
                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <IconsTag class="!w-4 !h-4 mr-2" />
                  {{ kelas.tipeKelas }}
                </span>
              </div>
              <div class="h-[160px] overflow-hidden flex items-center justify-center my-5 rounded-md">
                <NuxtLink :to="`/admin/dashboard/kelas/detail/${kelas.id}`">
                  <img :src="`${useRuntimeConfig().public.beEndpoint}/${kelas.thumbnailKelas}`" class="object-center" :alt="kelas.namaKelas" />
                </NuxtLink>
              </div>
              <h2 class="mb-4 text-2xl font-semibold tracking-tight text-gray-800 dark:text-white">
                <NuxtLink :to="`/admin/dashboard/kelas/detail/${kelas.id}`">{{ kelas.namaKelas }}</NuxtLink>
              </h2>
              <div class="flex justify-end items-center">
                <NuxtLink :to="`/admin/dashboard/kelas/detail/${kelas.id}`" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                  Lihat Detail
                  <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </NuxtLink>
              </div>
            </article>
            <div v-else-if="!kelasList.length && !isLoading" class="w-full col-span-3">
              <NotFoundBoy message="Belum Ada Kelas!" />
            </div>
          </div>
          <div v-if="isLoading">
            <UserDashboardKelasSkeleton :number-of-skeleton="6" />
          </div>
          <Paginations :page-number="paginationStore.pageNumberKelas" :page-size="pageSize" :rows-total="rowsTotal" :change-page-func="changePage" :reset-page-value-func="resetPageValue" />
        </div>
      </div>
    </section>
  </div>
</template>
