<script setup>
const images = [
  { name: 'komputer-1.jpeg', title: 'Ruang Komputer' },
  { name: 'komputer-2.jpeg', title: 'Ruang Komputer' },
  { name: 'teori-1.jpeg', title: 'Ruang Teori' },
  { name: 'teori-2.jpeg', title: 'Ruang Teori' },
  { name: 'teori-3.jpeg', title: 'Ruang Teori' }
]
</script>

<style lang="postcss" scoped>
.slide {
  @apply cursor-grab;
}
</style>

<template>
  <section id="ruangan" class="bg-white pt-8 dark:bg-gray-900">
    <div class="max-w-screen-lg overflow-hidden mx-auto">
      <div class="mx-auto text-center mb-8 lg:mb-12">
        <h2 class="mb-4 text-3xl font-bold">Ruang Belajar</h2>
        <p class="mb-5 px-6 font-light text-gray-600 sm:text-xl">Kami menyediakan ruang belajar yang nyaman untuk keberlangsungan belajar anda.</p>
      </div>
      <div>
        <div class="p-6 md:px-4 max-w-full">
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
            <SwiperSlide v-for="(img, index) in images" :key="index" class="slide">
              <Slide :img="img.name" img-title="Ruang Komputer" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>
