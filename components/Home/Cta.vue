<script setup></script>

<style lang="postcss" scoped>
.cta-button {
  @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
}
</style>

<template>
  <section id="cta" class="bg-blue-950 text-gray-50 p-8 py-20">
    <div class="container mx-auto text-center flex flex-col gap-8">
      <div>
        <h2 class="mb-4 text-3xl font-bold">Mari Bergabung Bersama Kami</h2>
        <p class="text-gray-200 font-light sm:text-x">Belajar dengan pembelajaran terupdate dengan fasilitas penunjang yang mendukung!</p>
      </div>
      <div class="flex gap-3 justify-center item-center flex-wrap">
        <NuxtLink to="/daftar" class="cta-button">Daftar Sekarang</NuxtLink>
        <a href="https://wa.link/kmoz97" target="_blank" class="cta-button">Hubungi Kami</a>
      </div>
    </div>
  </section>
</template>
