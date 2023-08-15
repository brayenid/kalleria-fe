<script setup>
import { usePaginationStore } from '~/stores/myPaginationStore'

definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})

const { $axiosAuth: axios, $scrollTo: scrollTo } = useNuxtApp()
const paginationStore = usePaginationStore()
const kelasUserList = ref([])
const isLoading = ref(true)
const route = useRoute()
const kelasUserEl = ref()
const sertifikatList = ref([])

// PAGINATION MANDATORY STATE
const pageNumber = ref(paginationStore.pageNumberKelasUsers)
const pageSize = 6
const rowsTotal = ref(0)

// PAGINATION MANDATORY FUNC
const changePage = (number) => {
  const scroll = scrollTo(kelasUserEl.value, 500, {
    offset: -70
  })
  paginationStore.$patch({ pageNumberKelasUsers: number })
  setTimeout(() => {
    scroll()
  }, 1000)
}

const resetPageValue = () => {
  paginationStore.$patch({ pageNumberKelasUsers: 1 })
}

paginationStore.$subscribe(async (mutation, state) => {
  const response = (await axios.get(`/kelasuser/user?pageSize=${pageSize}&pageNumber=${state.pageNumberKelasUsers}`)).data.data
  kelasUserList.value = response.rows
})

onMounted(async () => {
  const response = (await axios.get(`/kelasuser/user?pageSize=${pageSize}&pageNumber=${pageNumber.value}`)).data.data
  if (response) {
    isLoading.value = false
  }
  rowsTotal.value = response.total
  kelasUserList.value = response.rows

  const sertifikatResponse = (await axios.get('/sertifikat/users')).data.data
  sertifikatList.value = sertifikatResponse
})
</script>

<style lang="postcss" scoped>
.kelas-list {
  @apply p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-blue-300 transition-all dark:bg-gray-800 dark:border-gray-700;
}
</style>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="kelas" />
    <section ref="kelasUserEl" class="bg-white dark:bg-gray-900 shadow rounded-md">
      <div class="p-8 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 class="mb-4 text-3xl lg:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">Daftar Kelas Yang Diikuti</h2>
          <p class="font-light text-gray-500 sm:text-md dark:text-gray-400">
            Berikut adalah daftar kelas yang diikuti. Terdapat angka kehadiran dan angka maksimal pertemuan (Mis. 0/18), ketika kehadiran telah mencapai maksimal pertemuan, anda lulus kelas tersebut.
          </p>
        </div>
        <div class="min-h-[300px]">
          <div class="grid gap-8 lg:grid-cols-3 mb-6">
            <article v-if="kelasUserList.length" class="kelas-list" v-for="kelasUser in kelasUserList" :key="kelasUser.id">
              <div class="flex justify-between items-center mb-5 text-gray-500">
                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <IconsTag class="!w-4 !h-4 mr-2" />
                  {{ kelasUser?.tipeKelas }}
                </span>
              </div>
              <div class="h-[160px] overflow-hidden flex items-center justify-center my-5 rounded-md">
                <NuxtLink :to="`/dashboard/kelas/${kelasUser?.kelasId}`">
                  <img :src="`${useRuntimeConfig().public.beEndpoint}/${kelasUser?.thumbnailKelas}`" class="object-center" :alt="kelasUser?.namaKelas" />
                </NuxtLink>
              </div>
              <h2 class="mb-4 text-2xl font-semibold tracking-tight text-gray-800 dark:text-white">{{ kelasUser?.namaKelas }}</h2>
              <div class="flex justify-between items-center">
                <div>
                  <NuxtLink
                    v-if="kelasUser?.presensi === kelasUser?.maksimalPertemuan"
                    :to="`/dashboard/kelasuser/${kelasUser?.id}`"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Klaim Sertifikat
                  </NuxtLink>
                </div>
                <div>
                  <div class="flex justify-end items-center gap-4">
                    <IconsCheck v-if="kelasUser?.presensi === kelasUser?.maksimalPertemuan" class="text-green-500" />
                    <p>{{ kelasUser?.presensi }} / {{ kelasUser?.maksimalPertemuan }}</p>
                  </div>
                </div>
              </div>
            </article>
            <div v-else-if="!kelasUserList.length && !isLoading" class="w-full col-span-3">
              <NotFoundBoy message="Belum Mengikuti Kelas!" />
            </div>
          </div>
          <div v-if="isLoading">
            <UserDashboardKelasSkeleton :number-of-skeleton="6" />
          </div>
          <Paginations :page-number="paginationStore.pageNumberKelasUsers" :page-size="pageSize" :rows-total="rowsTotal" :change-page-func="changePage" :reset-page-value-func="resetPageValue" />
        </div>
      </div>
    </section>
  </div>
</template>
