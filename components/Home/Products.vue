<style lang="postcss" scoped>
.slide {
  @apply p-6 bg-gray-50 h-[380px] rounded shadow-sm cursor-grab;
}
</style>

<style scoped>
.gradient {
  background: rgb(63, 131, 248);
  background: -moz-linear-gradient(85deg, rgba(63, 131, 248, 1) 0%, rgba(46, 113, 227, 1) 68%);
  background: -webkit-linear-gradient(85deg, rgba(63, 131, 248, 1) 0%, rgba(46, 113, 227, 1) 68%);
  background: linear-gradient(85deg, rgba(63, 131, 248, 1) 0%, rgba(46, 113, 227, 1) 68%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3f83f8",endColorstr="#2e71e3",GradientType=1);
}
</style>
<template>
  <section id="products" class="gradient pt-8 dark:bg-gray-900">
    <div class="max-w-screen-lg overflow-hidden mx-auto">
      <div class="mx-auto text-center mb-8 lg:mb-12">
        <h2 class="mb-4 px-6 text-4xl tracking-tight font-extrabold text-white">Program Belajar Yang Kami Tawarkan</h2>
        <p class="mb-5 px-6 font-light text-gray-200 sm:text-xl">Kami menawarkan beberapa produk program belajar unggulan untuk anda.</p>
      </div>
      <div class="md:flex items-end px-6 lg:px-0">
        <div class="hidden md:inline flex-[1]">
          <NuxtImg src="/images/girl-thinking-again2.png" alt="girl thinking 2" />
        </div>
        <div class="flex-[1] max-w-full lg:max-w-[700px] py-4">
          <Swiper
            :modules="[SwiperAutoplay]"
            :slides-per-view="1"
            :autoplay="{
              delay: 4000,
              disableOnInteraction: false
            }"
            :loop="true"
            :space-between="30"
            :breakpoints="{
              700: {
                slidesPerView: 2
              }
            }"
          >
            <SwiperSlide class="slide">
              <h3 class="mb-4 text-2xl font-semibold">Kelas Komputer</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-8">Pilihan terbaik untuk anda yang memiliki minat dalam dunia komputer.</p>
              <!-- List -->
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Ms. Office (Word, Excel, PPT)</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Corel Draw</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Adobe Photoshop</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Auto CAD</span>
                </li>
              </ul>
            </SwiperSlide>
            <!-- Pricing Card -->
            <SwiperSlide class="slide">
              <h3 class="mb-4 text-2xl font-semibold">Kelas Bahasa Inggris</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-8">Belajar Bahasa Inggris menjadi lebih efektif.</p>
              <!-- List -->
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Beginner, Elementary, Intermediate</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Speaking Class</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>General English</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Private Class</span>
                </li>
              </ul>
            </SwiperSlide>
            <!-- Pricing Card -->
            <SwiperSlide class="slide">
              <h3 class="mb-4 text-2xl font-semibold">Bimbingan Belajar</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-8">Pilihan terbaik untuk menemani belajar anda.</p>
              <!-- List -->
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>SD</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>SMP</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>SMA/SMK</span>
                </li>
              </ul>
            </SwiperSlide>
            <!-- Pricing Card -->
            <SwiperSlide class="slide">
              <h3 class="mb-4 text-2xl font-semibold">Kelas Mengemudi</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-8">Teman terbaik untuk belajar mengemudi.</p>
              <!-- List -->
              <ul role="list" class="mb-8 space-y-4 text-left">
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Kelas Dasar Prioritas</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Kelas Dasar Eksekutif</span>
                </li>
                <li class="flex items-center space-x-3">
                  <!-- Icon -->
                  <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Kelas Memperlancar</span>
                </li>
              </ul>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>
