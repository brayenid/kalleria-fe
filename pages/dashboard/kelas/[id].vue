<script setup>
import { useAuthStore } from '~/stores/myAuthStore'
definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})

const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const route = useRoute()
const authStore = useAuthStore()

const kelasDetail = reactive({
  id: null,
  namaKelas: null,
  tipeKelas: null,
  deskripsiKelas: null,
  thumbnailKelas: null,
  hargaKelas: null
})

const getKelasTransaksi = ref([])
const isUserHaveTransaction = computed(() => {
  return getKelasTransaksi.value.length > 0 ? true : false
})

const buyKelas = async (id) => {
  try {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: 'Yakin ingin membeli kelas?',
      showCancelButton: true,
      confirmButtonText: 'Beli',
      cancelButtonText: 'Batal'
    })
    if (isConfirmed) {
      ;(await axios.post(`/transaksi/${id}`)).data.data
      const transaksi = (await axios.get(`/transaksi/kelas/${route.params.id}`)).data.data
      getKelasTransaksi.value = transaksi

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Silahkan selesaikan pembelian, cek halaman status transaksi untuk mengirim bukti pembayaran.'
      })
      const isNotify = (await axios.get('/transaksi/notify')).data.data

      authStore.$patch({ isNotifyTransaksi: isNotify })
    }
  } catch (error) {
    const err = error.response.data.message

    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: `Gagal memproses pembelian: ${err}`
    })
  }
}

onMounted(async () => {
  try {
    const { id, namaKelas, tipeKelas, deskripsiKelas, thumbnailKelas, hargaKelas } = (await axios.get(`/kelas/${route.params.id}`)).data.data
    kelasDetail.id = id
    kelasDetail.namaKelas = namaKelas
    kelasDetail.tipeKelas = tipeKelas
    kelasDetail.deskripsiKelas = deskripsiKelas
    kelasDetail.thumbnailKelas = thumbnailKelas
    kelasDetail.hargaKelas = hargaKelas

    const transaksi = (await axios.get(`/transaksi/kelas/${route.params.id}`)).data.data
    getKelasTransaksi.value = transaksi
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Kelas tidak ditemukan!',
      fatal: true
    })
  }
})
</script>

<style lang="scss" scoped></style>
<template>
  <div>
    <Breadcrumbs :last-point="kelasDetail?.namaKelas" :path="route.path" />

    <div v-if="!kelasDetail.id">
      <UserDashboardDetailKelasSkeleton />
    </div>
    <div v-else>
      <div class="flex flex-col gap-4 bg-white p-6 rounded-md shadow lg:flex-row">
        <div class="flex-[1]">
          <div class="overflow-hidden h-min rounded-md" v-if="kelasDetail.thumbnailKelas !== null">
            <img :src="`${useRuntimeConfig().public.beEndpoint}/${kelasDetail?.thumbnailKelas}`" :alt="kelasDetail?.namaKelas" />
          </div>
          <div>
            <button
              @click="buyKelas(kelasDetail.id)"
              v-if="!isUserHaveTransaction"
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm !w-full my-3 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mb-0"
            >
              Beli Kelas Ini
            </button>
            <button v-else class="text-white bg-red-700 focus:outline-none font-medium rounded-lg text-sm !w-full my-3 px-5 py-2.5 text-center dark:bg-red-600 cursor-not-allowed md:mb-0" disabled>Kelas Telah Dibeli</button>
          </div>
        </div>
        <div class="flex-[1] xl:flex-[2]">
          <h2 class="text-3xl font-bold flex items-center gap-4 mb-4">
            <IconsBook class="!w-8 !h-8 text-red-400" />
            {{ kelasDetail?.namaKelas }}
          </h2>
          <p class="mb-2">{{ kelasDetail?.deskripsiKelas }}</p>
          <p class="font-light mb-2">Kategori : {{ kelasDetail?.tipeKelas }}</p>
          <p class="flex justify-end items-center gap-2 text-lg font-bold"><IconsMoney class="text-green-400" /> {{ useCurrency(kelasDetail?.hargaKelas) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
