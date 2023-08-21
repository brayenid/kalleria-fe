<script setup></script>

<style lang="postcss" scoped>
.cta-button {
  @apply bg-blue-500 text-white  hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-3 text-center;
}
</style>

<template>
  <section id="cta" class="bg-white text-gray-800 p-8 py-32">
    <div class="container mx-auto text-center flex flex-col gap-8">
      <div>
        <h2 class="mb-4 text-3xl font-bold">Mari Bergabung Bersama Kami!</h2>
        <p class="px-6 font-light max-w-3xl mx-auto text-gray-700 sm:text-xl">Belajar dengan pembelajaran ter-update dengan fasilitas penunjang yang mendukung!</p>
      </div>
      <div class="flex flex-col gap-4 justify-center item-center md:max-w-lg mx-auto">
        <NuxtLink to="/daftar" class="cta-button">Daftar Sekarang</NuxtLink>
        <a href="https://wa.link/kmoz97" target="_blank" class="text-blue-500 text-sm hover:underline">Hubungi Kami</a>
      </div>
    </div>
  </section>
</template>
