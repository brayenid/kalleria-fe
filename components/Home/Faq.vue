<script setup>
import { initAccordions } from 'flowbite'

onMounted(() => {
  initAccordions()
})
</script>

<style lang="postcss" scoped>
a {
  @apply !text-blue-600 hover:underline;
}
.faq-content {
  @apply mb-2 text-gray-800;
}
</style>

<template>
  <section id="faq" class="bg-[url('/svg/bg-blue-2.svg')] bg-cover py-12">
    <div class="max-w-screen-md mx-auto p-6 pt-0 md:px-4">
      <h2 class="text-2xl font-bold text-white text-center py-12 pt-0">Pertanyaan Yang Sering Diajukan</h2>
      <div id="accordion-open" data-accordion="collapse">
        <h3 id="accordion-open-heading-1">
          <button
            type="button"
            class="flex bg-white items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            data-accordion-target="#accordion-open-body-1"
            aria-expanded="true"
            aria-controls="accordion-open-body-1"
          >
            Bagaimana saya bisa mendaftar?
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h3>
        <div id="accordion-open-body-1" class="hidden" aria-labelledby="accordion-open-heading-1">
          <div class="p-5 bg-white border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <p class="faq-content">
              LPK Kalleria membuat sistem yang memudahkan anda untuk mendaftar, membeli, hingga melihat progres kelas. Proses daftar dapat anda lakukan secara mandiri melalui halaman <a href="/daftar" target="_blank">daftar</a>, atau anda
              dapat mengunjungi kantor LPK Kalleria untuk bantuan pendaftaran. Jika anda kesulitan, anda bisa lihat <a href="/tutorial/daftar" target="_blank">tutorial pendaftaran berikut</a>.
            </p>
          </div>
        </div>
        <h3 id="accordion-open-heading-2">
          <button
            type="button"
            class="flex bg-white items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            data-accordion-target="#accordion-open-body-2"
            aria-expanded="false"
            aria-controls="accordion-open-body-2"
          >
            Bagaimana saya bisa membeli kelas?
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h3>
        <div id="accordion-open-body-2" class="hidden" aria-labelledby="accordion-open-heading-2">
          <div class="p-5 bg-white border border-b-0 border-gray-200 dark:border-gray-700">
            <p class="faq-content">
              Dalam pembelian kelas, anda dapat datang langsung ke kantor LPK Kalleria untuk membeli kelas atau membeli secara mandiri dengan cara, setelah anda mendaftar dengan data yang valid, anda akan memiliki akses ke dashboard anda,
              di sana anda akan menemukan halaman beli kelas.
            </p>
            <p class="faq-content">
              Pilih kelas yang ingin dibeli, klik beli kelas, buka halaman transaksi, lihat transaksi dengan status "dibayar", klik kirim bukti bayar, lakukan transfer ke nomor rekening yang terlihat di halaman tersebut, tunggu hasil
              tinjauan admin, jika status anda diterima pada transaksi, anda sudah dapat mengikuti kelas. Atau anda dapat melihat <a href="/tutorial/belikelas" target="_blank">tutorial beli kelas</a>.
            </p>
          </div>
        </div>
        <h3 id="accordion-open-heading-3">
          <button
            type="button"
            class="flex bg-white items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 border-b-0 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            data-accordion-target="#accordion-open-body-3"
            aria-expanded="false"
            aria-controls="accordion-open-body-3"
          >
            Bagaimana kelas dilaksanakan, apakah secara online atau offline?
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h3>
        <div id="accordion-open-body-3" class="hidden" aria-labelledby="accordion-open-heading-3">
          <div class="p-5 bg-white border border-b-0 border-gray-200 dark:border-gray-700">
            <p class="faq-content">Kelas akan dilaksanakan secara offline.</p>
          </div>
        </div>
        <h3 id="accordion-open-heading-4">
          <button
            type="button"
            class="flex bg-white items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            data-accordion-target="#accordion-open-body-4"
            aria-expanded="false"
            aria-controls="accordion-open-body-4"
          >
            Apa yang dimaksud sampai bisa?
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h3>
        <div id="accordion-open-body-4" class="hidden" aria-labelledby="accordion-open-heading-4">
          <div class="p-5 bg-white border border-t-0 border-gray-200 dark:border-gray-700">
            <p class="faq-content">Dalam beberapa kelas, anda akan belajar sampai pada tahap anda bisa, walaupun maksimal pertemuan kelas anda telah terlampaui. Anda tidak akan dikenakan biaya tambahan untuk hal ini.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
