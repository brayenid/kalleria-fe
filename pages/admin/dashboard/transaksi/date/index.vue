<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
definePageMeta({
  middleware: 'auth-admin',
  layout: false
})

useSeoMeta({
  title: 'Cetak Total Transaksi'
})

const { $axiosAuth: axios } = useNuxtApp()

const transaksiList = ref([])
const countTotal = (value) => {
  const mappedHarga = value.map((transaksi) => transaksi.hargaKelas)
  const sumMappedHarga = mappedHarga.reduce((total, currentValue) => total + currentValue, 0)
  return sumMappedHarga
}
const date = ref('')
const from = ref('')
const to = ref('')
const totalTransaksi = ref(0)

const setDateRange = () => {
  from.value = date.value[0]
  to.value = date.value[1]
}

const printIt = () => {
  window.print()
}

const formatDateFromYYYYMMDD = (inputDate) => {
  const parts = inputDate.split('-')
  if (parts.length === 3) {
    const year = parts[0]
    const month = parts[1]
    const day = parts[2]
    return `${day}/${month}/${year}`
  } else {
    return 'Invalid Date Format'
  }
}

watch([from, to], async ([latestFrom, latestTo]) => {
  const response = (await axios.get(`/transaksi/date?from=${latestFrom}&to=${latestTo}`)).data.data
  transaksiList.value = response
  totalTransaksi.value = countTotal(response)
})
</script>

<style lang="postcss" scoped>
table td,
table th {
  @apply px-4 py-2 font-normal border border-gray-800;
}
.print-area {
  @apply bg-white border border-dashed border-gray-200 mt-2 p-2;
}
.print-control {
  @apply flex items-center gap-4 bg-white;
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
    @apply border-0 p-0;
  }
}
</style>

<style lang="postcss">
.dp-custom-2 {
  @apply !rounded-none !border-0;
}
</style>

<template>
  <div class="w-[820px] mx-auto">
    <div class="print-control">
      <VueDatePicker
        id="tanggalLahir"
        input-class-name="dp-custom-2"
        v-model="date"
        placeholder="Pilih rentang tanggal transaksi"
        :enable-time-picker="false"
        format="dd/MM/yyyy"
        preview-format="dd/MM/yyyy"
        model-type="yyyy-MM-dd"
        @update:model-value="setDateRange"
        range
      ></VueDatePicker>
      <button class="p-2" @click="printIt" title="Cetak Transaksi">
        <IconsPrint />
      </button>
    </div>
    <div class="print-area">
      <div class="text-center w-full py-8">
        <h1 class="text-lg font-semibold uppercase">Rekap Transaksi LPK Kalleria</h1>
        <p v-if="from && to" class="text-sm">({{ formatDateFromYYYYMMDD(from) }} - {{ formatDateFromYYYYMMDD(to) }})</p>
      </div>
      <table class="w-full text-xs text-left border-t border-gray-100 text-gray-800">
        <thead class="text-xs uppercase">
          <tr>
            <th class="text-center">No</th>
            <th>Nama Transaksi</th>
            <th>Nama Siswa</th>
            <th>ID Kelas</th>
            <th>Status Transaksi</th>
            <th>Tanggal (Settle)</th>
            <th>Nominal Transaksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="transaksiList.length" v-for="(transaksi, index) in transaksiList" :key="transaksi.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ transaksi.namaTransaksi }}</td>
            <td>{{ transaksi.nama }}</td>
            <td>{{ transaksi.kelasId }}</td>
            <td>{{ transaksi.status }}</td>
            <td>{{ useLocalDate(transaksi.updatedAt) }}</td>
            <td>{{ useCurrency(transaksi.hargaKelas) }}</td>
          </tr>
          <tr v-if="!transaksiList.length">
            <td colspan="7" class="!text-center">Belum ada transaksi yang ditampilkan!</td>
          </tr>
          <tr v-if="totalTransaksi">
            <td colspan="5"></td>
            <td>Total</td>
            <td>{{ useCurrency(totalTransaksi) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
