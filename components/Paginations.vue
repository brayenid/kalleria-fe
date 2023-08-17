<script setup>
const props = defineProps({
  pageNumber: Number,
  pageSize: Number,
  showNumber: Number,
  rowsTotal: Number,
  changePageFunc: Function,
  resetPageValueFunc: Function
})

// JUMLAH ANGKA YANG DITAMPILKAN DI PAGINASI, JIKA CEIL DATA TOTAL / BESAR HALAMAN >= 3 MAKA GUNAKAN 3 ANGKA SEBAGAI BESARAN PENAMPIL PAGINASI MIS : PADA HAL. 1 TAMP. 1,2,3..AKHIR JIKA HAL. 4 TAMP. 3,4,5...AKHIR. JIKA DATA CEIL DATA TOTAL / BESAR HALAMAN < 3 MAKA TAMPILKAN CEIL DATA TOTAL / BESAR HALAMAN.
const paginationToShow = computed(() => {
  const maximumPagination = 3
  const showValue = Math.ceil(props.rowsTotal / props.pageSize)
  if (showValue >= maximumPagination) {
    return maximumPagination
  } else {
    return showValue
  }
})

// DIGUNAKAN TOMBOL AWAL UNTUK MELAKUKAN DISABLE PADA BUTTON
const isFirstNumber = computed(() => {
  return props.pageNumber === 1
})

const isLastNumber = computed(() => {
  return props.pageNumber === Math.ceil(props.rowsTotal / props.pageSize)
})

// UNTUK MENAMPILKAN ANGKA TERAKHIR PAGINASI, BISA DIGUNAKAN SBG BUTTON AKHIR [TIDAK DIGUNAKAN]
const lastPaginationNumber = computed(() => {
  return Math.ceil(props.rowsTotal / props.pageSize)
})

// KEDUA FUNGSI INI MENGEMBALIKAN RANGE DATA YANG DIAMBIL PADA HAL. YANG BERSANGKUTAN
const shownPageRangesStart = computed(() => {
  const range = props.pageNumber === 1 ? 1 : props.pageNumber * props.pageSize - props.pageSize + 1
  return range < props.rowsTotal ? range : props.rowsTotal
})
const shownPageRangesEnd = computed(() => {
  const rangeEnd = props.pageNumber * props.pageSize
  return rangeEnd < props.rowsTotal ? rangeEnd : props.rowsTotal
})

// MENGEMBALIKAN BOOLEAN APAKAH DEKAT/MENCAPAI AKHIR, TIDAK BERLAKU JIKA NOMOR PAGINASI YANG DITAMPILKAN < 3
const isNearLastPagination = computed(() => {
  return lastPaginationNumber.value - props.pageNumber < 1 && paginationToShow.value >= 3
})

// DILAKUKAN UNTUK GENERATE ARRAY SPY DAPAT DIITERASI UNTUK DITAMPILKAN SEBAGAI DAFTAR NOMOR PADA TOMBOL PAGINASI
const paginationNumberMargin = computed(() => {
  const result = []
  if (props.pageNumber <= 2) {
    for (let i = 1; i <= paginationToShow.value; i++) {
      result.push(i)
    }
    return result
  }
  if (isNearLastPagination.value) {
    for (let i = props.pageNumber - 2; i <= paginationToShow.value + props.pageNumber - 2; i++) {
      if (i <= lastPaginationNumber.value) {
        result.push(i)
      }
    }
    return result
  }
  for (let i = props.pageNumber - 1; i <= paginationToShow.value + props.pageNumber - 2; i++) {
    if (i <= lastPaginationNumber.value) {
      result.push(i)
    }
  }
  return result
})

// MENGEMBALIKAN BOOLEAN UNTUK DIGUNAKAN PADA CLASS DINAMIS UNTUK MENGETAHUI BUTTON PAGINASI MANA YANG AKTIF
const isPaginationEqualsPage = (pagination) => {
  return pagination === props.pageNumber ? true : false
}

onUnmounted(() => {
  // MERESET NILAI PAGE NUMBER PADA STORE
  props?.resetPageValueFunc()
})
</script>

<template>
  <nav class="flex flex-col gap-2 items-center justify-between p-4 sm:flex-row sm:gap-0" aria-label="Table navigation">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
      >Menampilkan <span class="font-semibold text-gray-900 dark:text-white">{{ shownPageRangesStart }} - {{ shownPageRangesEnd }}</span> dari <span class="font-semibold text-gray-900 dark:text-white">{{ props.rowsTotal }}</span></span
    >
    <ul class="inline-flex -space-x-px text-sm h-8">
      <li>
        <button
          @click="props.changePageFunc(1)"
          class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :disabled="isFirstNumber"
        >
          Awal
        </button>
      </li>
      <li v-for="(item, index) in paginationNumberMargin" :key="index">
        <button
          @click="props.changePageFunc(item)"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="{ '!bg-gray-100': isPaginationEqualsPage(item) }"
        >
          {{ item }}
        </button>
      </li>
      <li>
        <button
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-default"
          disabled
        >
          ...
        </button>
      </li>
      <li>
        <button
          @click="props.changePageFunc(lastPaginationNumber)"
          class="flex items-center justify-center px-3 h-8 leading-tight rounded-r-lg text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="{ '!bg-gray-100': isPaginationEqualsPage(lastPaginationNumber) }"
          :disabled="isLastNumber || !rowsTotal"
        >
          Akhir
        </button>
      </li>
    </ul>
  </nav>
</template>
