<script setup>
const kelasList = ref([])
const kelasTotal = ref()
const { $axios: axios } = useNuxtApp()

onMounted(async () => {
  const response = (await axios.get('/kelas?pageSize=20')).data.data
  kelasList.value = response.rows
  kelasTotal.value = response.total
})
</script>
<style lang="postcss" scoped>
.slide {
  @apply bg-gray-50 rounded-md shadow-sm cursor-grab overflow-hidden;
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
        <h2 class="mb-4 text-white text-3xl font-bold">Program Belajar Yang Kami Tawarkan</h2>
        <p class="mb-5 px-6 font-light text-gray-200 sm:text-xl">Kami menawarkan {{ kelasTotal ? kelasTotal : 'beberapa' }} produk program belajar unggulan untuk anda.</p>
      </div>
      <div class="md:flex items-end px-6 lg:px-0">
        <div data-aos="zoom-in" class="hidden md:inline flex-[1]">
          <NuxtImg src="/images/girl-thinking-again2.png" alt="girl thinking 2" />
        </div>
        <div class="flex-[1] max-w-full lg:max-w-[700px] py-4">
          <Swiper
            class="!pb-12"
            :modules="[SwiperAutoplay, SwiperPagination]"
            :slides-per-view="1"
            :autoplay="{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }"
            :pagination="{
              enabled: true,
              clickable: true
            }"
            :loop="true"
            :space-between="30"
            :breakpoints="{
              540: {
                slidesPerView: 2
              },
              910: {
                slidesPerView: 3
              },
              1024: {
                slidesPerView: 2
              }
            }"
          >
            <SwiperSlide class="slide !h-auto" v-for="kelas in kelasList" :key="kelas.id">
              <ClassSlide :kelas-id="kelas.id" :kelas-type="kelas.tipeKelas" :img="kelas.thumbnailKelas" :kelas-title="kelas.namaKelas" :kelas-price="kelas.hargaKelas" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>
