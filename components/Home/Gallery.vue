<style lang="postcss" scoped>
.slide {
  @apply cursor-grab;
}
</style>

<template>
  <section id="ruangan" class="bg-white pt-8 dark:bg-gray-900">
    <div class="max-w-screen-lg overflow-hidden mx-auto">
      <div class="mx-auto text-center mb-8 lg:mb-12">
        <h2 class="mb-4 px-6 text-4xl tracking-tight font-extrabold text-gray-800">Ruang Belajar</h2>
        <p class="mb-5 px-6 font-light text-gray-600 sm:text-xl">Kami menyediakan ruang belajar yang nyaman untuk keberlangsungan belajar anda.</p>
      </div>
      <div>
        <div class="p-4">
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
              500: {
                slidesPerView: 2
              },
              750: {
                slidesPerView: 3
              }
            }"
          >
            <SwiperSlide class="slide">
              <Slide img="komputer-1.jpeg" img-title="Ruang Komputer" />
            </SwiperSlide>
            <SwiperSlide class="slide">
              <Slide img="komputer-2.jpeg" img-title="Ruang Komputer" />
            </SwiperSlide>
            <SwiperSlide class="slide">
              <Slide img="teori-1.jpeg" img-title="Ruang Teori" />
            </SwiperSlide>
            <SwiperSlide class="slide">
              <Slide img="teori-2.jpeg" img-title="Ruang Teori" />
            </SwiperSlide>
            <SwiperSlide class="slide">
              <Slide img="teori-3.jpeg" img-title="Ruang Teori" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>
