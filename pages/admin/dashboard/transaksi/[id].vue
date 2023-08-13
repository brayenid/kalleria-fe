<script setup>
definePageMeta({
  middleware: 'auth-admin',
  layout: 'admin-dashboard'
})

const { $axiosAuth: axios, $Swal: Swal } = useNuxtApp()
const transaksiDetail = ref()
const route = useRoute()

const maksimalPertemuan = ref(18)

const acceptPayment = async () => {
  const payload = {
    status: 'diterima',
    maksimalPertemuan: maksimalPertemuan.value
  }
  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    title: 'Yakin Menerima',
    text: 'Setelah pembayaran diterima, user secara otomatis masuk ke dalam kelas.',
    showConfirmButton: true,
    confirmButtonText: 'Terima',
    showCancelButton: true,
    cancelButtonText: 'Batal'
  })

  if (isConfirmed) {
    try {
      await axios.put(`/transaksi/${route.params.id}`, payload)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Berhasil menerima pembayaran',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      })
      await navigateTo('/admin/dashboard/transaksi')
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Gagal menerima pembayaran',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      })
    }
  }
}

const declinePayment = async () => {
  const payload = {
    status: 'ditolak',
    maksimalPertemuan: maksimalPertemuan.value
  }
  const { isConfirmed } = await Swal.fire({
    icon: 'warning',
    title: 'Yakin Menolak',
    text: 'Sebelum menolak, sebaiknya hubungi siswa terlebih dahulu.',
    showConfirmButton: true,
    confirmButtonText: 'Tolak',
    showCancelButton: true,
    cancelButtonText: 'Batal'
  })

  if (isConfirmed) {
    try {
      await axios.put(`/transaksi/${route.params.id}`, payload)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Pembayaran ditolak',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      })
      await navigateTo('/admin/dashboard/transaksi')
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Gagal menolak pembayaran',
        showCancelButton: true,
        cancelButtonText: 'Tutup'
      })
    }
  }
}

onMounted(async () => {
  try {
    const responseTransaksiDetail = (await axios.get(`/transaksi/detail/${route.params.id}`))?.data?.data
    transaksiDetail.value = responseTransaksiDetail
  } catch (error) {
    throw createError({ statusCode: 404, message: 'Transaksi tidak ditemukan', fatal: true })
  }
})
</script>

<style lang="postcss" scoped>
a {
  @apply text-blue-600 hover:underline;
}
table tr {
  @apply bg-white dark:bg-gray-800 border-b border-gray-100;
}
table td {
  @apply px-6 py-4;
}
</style>

<template>
  <div>
    <Breadcrumbs :path="route.path" last-point="Detail Transaksi" :start-index="2" :slice-link="2" />
    <div class="relative overflow-hidden p-8 w-full bg-white shadow rounded-md">
      <h1 class="text-center text-lg font-semibold mb-5">Detail Transaksi</h1>
      <div class="p-4 mb-5 max-w-xl mx-auto text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <span class="font-medium">Info!</span> Lakukan peninjauan dengan teliti pada transaksi berikut, jika terdapat transaksi yang tidak valid (Tidak terdapat pada mutasi rekening, bukti bayar tidak jelas) maka sebaiknya segera hubungi
        user (lihat kontak pada profil user) <span class="font-semibold">jangan langsung menolak</span>. Jika transaksi diterima, maka user akan langsung masuk pada kelas dan dapat menjalani kelas dan mengisi presensi.
        <span class="font-semibold">Jangan lupa mengisi maksimal pertemuan.</span>
      </div>
      <div class="border border-gray-200 overflow-x-auto rounded-md max-w-2xl mx-auto">
        <table class="text-sm text-left w-full text-gray-800 dark:text-gray-400">
          <tbody>
            <tr>
              <td>ID Transaksi</td>
              <td>: {{ transaksiDetail?.id }}</td>
            </tr>
            <tr>
              <td>Nama Transaksi</td>
              <td>: {{ transaksiDetail?.namaTransaksi }}</td>
            </tr>
            <tr>
              <td>ID Siswa</td>
              <td>
                : <a :href="`/admin/dashboard/siswa/${transaksiDetail?.userId}`" target="_blank">{{ transaksiDetail?.userId }}</a>
              </td>
            </tr>
            <tr>
              <td>ID Kelas</td>
              <td>: {{ transaksiDetail?.kelasId }}</td>
            </tr>
            <tr>
              <td>Status Pembelian</td>
              <td>: {{ transaksiDetail?.status }}</td>
            </tr>
            <tr>
              <td>Harga Kelas</td>
              <td>: {{ useCurrency(transaksiDetail?.hargaKelas) }}</td>
            </tr>
            <tr>
              <td>Bukti Pembayaran</td>
              <td>
                : <a v-if="transaksiDetail?.urlBuktiBayar" :href="`${useRuntimeConfig().public.beEndpoint}/${transaksiDetail?.urlBuktiBayar}`" target="_blank">Buka Bukti Bayar</a>
                <span v-else>Tidak ada bukti pembayaran</span>
              </td>
            </tr>
            <tr>
              <td>Diterima Oleh</td>
              <td>: {{ transaksiDetail?.acceptedBy || 'Belum ditinjau' }}</td>
            </tr>
            <tr>
              <td>Pembuatan Transaksi</td>
              <td>: {{ useLocalDate(transaksiDetail?.createdAt) }}</td>
            </tr>
            <tr>
              <td>Update Transaksi</td>
              <td>: {{ useLocalDate(transaksiDetail?.updatedAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="max-w-2xl mx-auto flex flex-wrap gap-2 justify-center items-center my-4">
        <div v-if="transaksiDetail?.status === 'dibayar' || transaksiDetail?.status === 'ditolak'" class="flex">
          <label for="maksimalPertemuan" class="text-sm">Maksimal Pertemuan</label>
          <input
            type="number"
            min="18"
            id="maksimalPertemuan"
            v-model="maksimalPertemuan"
            placeholder="Maksimal pertemuan (Nilai dasar 18)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          @click="acceptPayment"
          v-if="transaksiDetail?.status === 'dibayar' || transaksiDetail?.status === 'ditolak'"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Terima Pembayaran
        </button>
        <button
          @click="declinePayment"
          v-if="transaksiDetail?.status === 'dibayar' && transaksiDetail?.status !== 'ditolak'"
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Tolak
        </button>
        <a
          v-if="transaksiDetail?.status === 'diterima'"
          :href="`/print/transaksi/${transaksiDetail?.id}`"
          target="_blank"
          class="focus:outline-none !text-white bg-green-700 hover:!no-underline hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
        >
          Cetak Transaksi
        </a>

        <button
          v-if="transaksiDetail?.status === 'pending'"
          type="button"
          class="focus:outline-none text-white bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:focus:ring-gray-900"
          disabled
        >
          Belum Ada Bukti Bayar
        </button>
      </div>
    </div>
  </div>
</template>
