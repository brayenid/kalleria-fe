<style scoped lang="postcss">
.line {
  @apply absolute w-3 h-3 bg-gray-600 rounded-full mt-1.5 -left-1.5 border border-gray-500 dark:border-gray-900 dark:bg-gray-700;
}
.step {
  @apply mb-1  text-sm font-normal leading-none text-gray-800 dark:text-gray-500;
}
.title {
  @apply text-base font-semibold text-gray-700 dark:text-white;
}

.text {
  @apply text-sm font-normal text-gray-500 dark:text-gray-400 mt-2;
}
</style>

<template>
  <div class="sticky">
    <h1 class="text-lg text-center font-semibold text-gray-800 mb-10">Alur Pendaftaran</h1>
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-10 ml-4">
        <div class="line"></div>
        <p class="step">Pendaftaran</p>
        <h3 class="title">Mendaftar pada formulir di halaman ini</h3>
        <p class="mb-4 text">Sebelum dapat melakukan interaksi dalam sistem LPK seperti pembelian/mendaftar kelas, anda terlebih dahulu harus mendaftar pada formulir ini.</p>
      </li>
      <li class="mb-10 ml-4">
        <div class="line"></div>
        <p class="step">Masuk</p>
        <h3 class="title">Masuk ke akun</h3>
        <p class="text">Setelah mendaftar, anda dalam status terdaftar dan dapat melakukan interaksi dalam sistem.</p>
      </li>
      <li class="ml-4">
        <div class="line"></div>
        <p class="step">Pembelian Kelas</p>
        <h3 class="title">Membeli kelas pada halaman kelas di dashboard</h3>
        <p class="text">Setelah masuk, anda akan masuk ke dashboard pengguna, anda akan dapat melakukan pembelian/pendaftaran kelas. Lakukan pembelian, konfirmasi pembayaran, dan ikuti kelas.</p>
      </li>
    </ol>
  </div>
</template>
