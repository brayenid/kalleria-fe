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

<template>
  <section id="products" class="bg-[url('/svg/bg-blue.svg')] bg-cover pt-8 dark:bg-gray-900">
    <div class="container overflow-hidden mx-auto">
      <div class="mx-auto text-center mb-8 lg:mb-12">
        <h2 class="mb-4 text-white text-3xl font-bold">Program Belajar Yang Kami Tawarkan</h2>
        <p class="mb-5 px-6 font-light text-gray-200 sm:text-xl">Kami menawarkan {{ kelasTotal ? kelasTotal : 'beberapa' }} produk program belajar unggulan untuk anda.</p>
      </div>
      <div class="px-6 lg:px-0">
        <div class="py-4 px-0 max-w-full md-mid:max-w-[880px] lg:px-4">
          <Swiper
            class="!pb-12"
            :modules="[SwiperPagination]"
            :slides-per-view="1"
            :space-between="10"
            :pagination="{
              enabled: true,
              clickable: true
            }"
            :breakpoints="{
              540: {
                slidesPerView: 2
              },
              910: {
                slidesPerView: 3
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
