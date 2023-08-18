<template>
  <section id="jumbotron" class="bg-white">
    <div class="flex flex-col md:flex-row text-center md:text-left items-center justify-between max-w-screen-lg px-4 pt-16 mx-auto">
      <div class="pb-9">
        <h1 class="text-gray-800 max-w-2xl mb-6 text-4xl font-extrabold tracking-normal !leading-tight md:text-4xl lg:text-5xl">
          Selamat Datang di <br />
          <span class="text-blue-500">LPK Kalleria</span>
        </h1>
        <p class="max-w-2xl px-12 mb-6 font-light text-gray-600 lg:mb-8 md:px-0 md:text-lg dark:text-gray-400">Lembaga Pendidikan, Pelatihan, dan Kursus siap kerja dan terlengkap di Kutai Barat.</p>
        <a
          href="/#products"
          v-scroll-to="{ element: '#products', offset: -60 }"
          class="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 mr-3 text-base font-medium text-center text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 transition-all dark:focus:ring-blue-900"
        >
          Mulai
          <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </a>
      </div>
      <div data-aos="zoom-in" class="md:mt-0 md:col-span-5 md:flex">
        <NuxtImg class="max-w-sm" src="/images/girl-thinking-animated.png" alt="girl-thinking" />
      </div>
    </div>
  </section>
</template>
