<script setup>
import config from '~/config'

definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})

const { $axiosAuth: axios } = useNuxtApp()
const kelasList = ref([])
const isLoading = ref(true)
const route = useRoute()

onMounted(async () => {
  const response = (await axios.get('/kelas')).data.data
  if (response) {
    isLoading.value = false
  }
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
    <Breadcrumbs :path="route.path" last-point="kelas" />
    <section class="bg-white dark:bg-gray-900 shadow rounded-md">
      <div class="p-8 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 class="mb-4 text-3xl lg:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">Daftar Kelas</h2>
          <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Berikut adalah daftar kelas yang dapat diikuti, pilih satu (klik kelas) lalu selesaikan pembayaran, buka halaman transaksi, kirim bukti bayar, belajar!</p>
        </div>
        <div class="min-h-[300px]">
          <div class="grid gap-8 lg:grid-cols-2">
            <article class="kelas-list" v-for="kelas in kelasList" :key="kelas.id">
              <div class="flex justify-between items-center mb-5 text-gray-500">
                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <IconsTag class="!w-4 !h-4 mr-2" />
                  {{ kelas.tipeKelas }}
                </span>
              </div>
              <div class="max-h-[200px] overflow-hidden flex items-center justify-center my-5 rounded-md">
                <img :src="`${config.API_BASE_URL}/${kelas.thumbnailKelas}`" class="object-center" :alt="kelas.namaKelas" />
              </div>
              <h2 class="mb-4 text-2xl font-semibold tracking-tight text-gray-800 dark:text-white">
                <NuxtLink :to="`/dashboard/kelas/${kelas.id}`">{{ kelas.namaKelas }}</NuxtLink>
              </h2>
              <div class="flex justify-end items-center">
                <NuxtLink :to="`/dashboard/kelas/${kelas.id}`" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                  Lihat Detail
                  <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </NuxtLink>
              </div>
            </article>
          </div>
          <div v-if="isLoading">
            <UserDashboardKelasSkeleton :number-of-skeleton="4" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
