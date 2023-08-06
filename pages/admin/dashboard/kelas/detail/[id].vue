<script setup>
import config from '~/config'
import { useAuthStore } from '~/stores/myAuthStore'
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const route = useRoute()

const kelasDetail = ref()

onMounted(async () => {
  try {
    const response = (await axios.get(`/kelas/${route.params.id}`)).data.data
    kelasDetail.value = response
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Kelas tidak ditemukan!',
      fatal: true
    })
  }
})
</script>

<template>
  <div>
    <Breadcrumbs :path="route.path" :last-point="kelasDetail?.namaKelas" :start-index="2" :slice-link="2" />
    <div v-if="!kelasDetail?.id">
      <UserDashboardDetailKelasSkeleton />
    </div>
    <div v-else>
      <div class="flex flex-col gap-4 bg-white p-6 rounded-md shadow lg:flex-row">
        <div class="flex-[1]">
          <div class="overflow-hidden h-min rounded-md" v-if="kelasDetail.thumbnailKelas !== null">
            <img :src="`${config.API_BASE_URL}/${kelasDetail?.thumbnailKelas}`" :alt="kelasDetail?.namaKelas" />
          </div>
        </div>
        <div class="flex-[1] xl:flex-[2]">
          <h2 class="text-3xl font-bold flex items-center gap-4 mb-4">
            <IconsBook class="!w-8 !h-8 text-red-400" />
            {{ kelasDetail?.namaKelas }}
          </h2>
          <p class="mb-2">{{ kelasDetail?.deskripsiKelas }}</p>
          <p class="font-light mb-2">Kategori : {{ kelasDetail?.tipeKelas }}</p>
          <p class="font-light mb-2">Terakhir Diubah : {{ useLocalDate(kelasDetail?.updatedAt) }}</p>
          <p class="flex justify-end items-center gap-2 text-lg font-bold"><IconsMoney class="text-green-400" /> {{ useCurrency(kelasDetail?.hargaKelas) }}</p>
        </div>
        <div class="flex flex-row gap-2 sm:flex-col">
          <NuxtLink
            :to="`/admin/dashboard/kelas/edit/${route.params.id}`"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-min sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </NuxtLink>
          <ButtonDelete class="!w-min sm:!w-full" :endpoint="`admins/kelas/${kelasDetail?.id}`" :delete-item="kelasDetail?.id" message="Kelas yang telah memiliki siswa tidak dapat dihapus!" />
        </div>
      </div>
    </div>
  </div>
</template>
