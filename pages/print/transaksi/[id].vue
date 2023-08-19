<script setup>
definePageMeta({
  middleware: 'auth-loose',
  layout: false
})

useSeoMeta({
  title: 'Cetak Transaksi'
})

const { $axiosAuth: axios } = useNuxtApp()
const transaksiDetail = ref()

const printIt = () => {
  window.print()
}

onMounted(async () => {
  try {
    const responseTransaksiDetail = (await axios.get(`/transaksi/detail/${route.params.id}`))?.data?.data
    transaksiDetail.value = responseTransaksiDetail
  } catch (error) {
    throw createError({ statusCode: 403, message: error.response.data.message, fatal: true })
  }
})

const route = useRoute()
</script>

<style lang="postcss" scoped>
p {
  @apply text-sm text-gray-800;
}
table th {
  @apply border-b border-gray-800 py-2;
}
table td {
  @apply py-2;
}
.print-control {
  @apply bg-white p-2 my-2;
}
.print-area {
  @apply border border-dashed border-gray-300 p-2 bg-white;
}

@media print {
  @page {
    margin-top: 0;
    margin-bottom: 0;
  }
  body {
    padding-top: 72px;
    padding-bottom: 72px;
  }
  .print-control {
    @apply hidden;
  }
  .print-area {
    @apply bg-transparent border-0;
  }
}
</style>

<template>
  <div class="w-[820px] min-h-[200px] mx-auto">
    <div class="print-control flex items-center">
      <button @click="printIt" title="Cetak Transaksi">
        <IconsPrint />
      </button>
    </div>
    <div class="print-area">
      <header class="flex justify-between items-start py-4 border-b-4 border-double border-gray-800">
        <div class="flex items-center gap-6">
          <div>
            <img src="/images/kalleria-logo.png" class="w-20" alt="" />
          </div>
          <div>
            <h2 class="font-semibold text-lg">LPK Kalleria</h2>
            <div class="leading-tight text-sm">
              <p>Jl. D.I Panjaitan, Busur, Kecamatan Barong Tongkok</p>
              <p>0812-1183-1970</p>
              <p>lpk.kalleria.com</p>
            </div>
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-semibold">Kwitansi</h1>
        </div>
      </header>
      <main>
        <div class="py-2">
          <p class="mb-2">Telah diterima transaksi :</p>
          <table class="text-sm w-full text-gray-800 leading-normal">
            <tbody>
              <tr>
                <td class="w-48 !py-0">ID Transaksi</td>
                <td class="!py-0">:</td>
                <td class="!py-0">{{ transaksiDetail?.id }}</td>
              </tr>
              <tr>
                <td class="w-48 !py-0">Nama Siswa</td>
                <td class="!py-0">:</td>
                <td class="!py-0">{{ transaksiDetail?.nama }}</td>
              </tr>
              <tr>
                <td class="w-48 !py-0">Diterima Oleh</td>
                <td class="!py-0">:</td>
                <td class="!py-0">{{ transaksiDetail?.acceptedBy }}</td>
              </tr>
              <tr>
                <td class="w-48 !py-0">Pada</td>
                <td class="!py-0">:</td>
                <td class="!py-0">{{ useLocalDate(transaksiDetail?.updatedAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="py-4 pt-0">
          <table class="text-sm w-full text-gray-800 border-b border-gray-600;">
            <thead>
              <tr class="text-left">
                <th>Nama Transaksi</th>
                <th>Harga Kelas</th>
                <th>Kuantitas</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left">
                <td>{{ transaksiDetail?.namaTransaksi }}</td>
                <td>{{ useCurrency(transaksiDetail?.hargaKelas) }}</td>
                <td>1</td>
                <td>{{ useCurrency(transaksiDetail?.hargaKelas) }}</td>
              </tr>
              <tr class="text-left">
                <td colspan="2"></td>
                <td colspan="1"><span class="font-semibold">Total</span></td>

                <td colspan="1">{{ useCurrency(transaksiDetail?.hargaKelas) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <footer class="flex justify-end mb-8">
        <div class="w-72 text-center">
          <p>{{ useLocalDateDetail(new Date()) }}</p>
          <br />
          <br />
          <p>LPK Kalleria</p>
        </div>
      </footer>
    </div>
  </div>
</template>
