<script setup>
onMounted(() => {
  const featureEls = document.querySelectorAll('.feature-item')

  let i = 0
  featureEls.forEach((feature) => {
    if (i % 3 === 0) {
      i = 0
    }
    const index = i.toString()
    feature.setAttribute('data-aos-delay', Number(index + '00'))
    i += 2
  })
})
</script>

<style lang="postcss" scoped>
.container-icon {
  @apply w-full flex justify-center items-center mb-6 h-10;
}
.icon {
  @apply !w-10 h-10  text-center;
}
.feature-item {
  @apply text-center p-4 border border-gray-200 rounded-md;
}
</style>

<template>
  <section id="features" class="bg-white dark:bg-gray-900">
    <div class="py-8 px-8 mx-auto max-w-screen-lg sm:py-16 lg:px-6">
      <div class="w-full text-center mb-8 lg:mb-16">
        <h2 class="mb-4 text-3xl font-bold">Mengapa Kami?</h2>
        <p class="text-gray-500 sm:text-xl dark:text-gray-400">Dari sekian kelebihan, ada beberapa hal yang kami berikan untuk menjawab pertanyaan "mengapa anda memilih kami?"</p>
      </div>
      <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0">
        <div class="feature-item" data-aos="zoom-in">
          <div class="container-icon">
            <IconsSledgehammer class="icon !text-red-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Legal</h3>
          <p class="text-gray-500 dark:text-gray-400">Kami memiliki legalitas/ijin untuk menyelenggarakan lembaga pelatihan dan kursus.</p>
        </div>
        <div class="feature-item" data-aos="zoom-in">
          <div class="container-icon">
            <IconsStarAngle class="icon !text-yellow-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Banyak Pilihan Program</h3>
          <p class="text-gray-500 dark:text-gray-400">Kami menyediakan berbagai pilihan program yang dapat anda ikuti.</p>
        </div>
        <div class="feature-item" data-aos="zoom-in">
          <div class="container-icon">
            <IconsTarget class="icon !text-blue-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Materi Edukatif Sesuai Kebutuhan</h3>
          <p class="text-gray-500 dark:text-gray-400">Kami memberikan materi yang edukatif dan terbarukan serta sesuai dengan kondisi saat ini.</p>
        </div>
        <div class="feature-item" data-aos="zoom-in">
          <div class="container-icon">
            <IconsGroup class="icon !text-purple-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">SDM Kompeten, Sabar, dan Profesional</h3>
          <p class="text-gray-500 dark:text-gray-400">Kami memiliki tenaga SDM mumpuni yang dapat mendampingi anda dalam proses pembelajaran.</p>
        </div>
        <div class="feature-item" data-aos="zoom-in">
          <div class="container-icon">
            <IconsMoney class="icon !text-green-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Potongan Harga</h3>
          <p class="text-gray-500 dark:text-gray-400">Kami memiliki event potongan harga yang bisa anda dapatkan.</p>
        </div>
        <div class="feature-item" data-aos="zoom-in">
          <div class="container-icon">
            <IconsCheck class="icon !text-orange-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Fasilitas Lengkap</h3>
          <p class="text-gray-500 dark:text-gray-400">Kami menyediakan fasilitas lengkap, mumpuni, dan juga terbarukan yang dapat menunjang proses belajar anda.</p>
        </div>
        <div class="feature-item" data-aos="zoom-in">
          <div class="container-icon">
            <IconsLocation class="icon !text-lime-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Lokasi Strategis</h3>
          <p class="text-gray-500 dark:text-gray-400">Tempat belajar strategis di area kota dan mudah dijangkau.</p>
        </div>
        <div class="feature-item" data-aos="zoom-in">
          <div class="container-icon">
            <IconsClock class="icon !text-teal-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Waktu Belajar Fleksibel</h3>
          <p class="text-gray-500 dark:text-gray-400">Waktu belajar berorientasi pada anda, sehingga pembelajaran dapat dilakukan saat anda memiliki waktu.</p>
        </div>
        <div class="feature-item" data-aos="zoom-in">
          <div class="container-icon">
            <IconsTrophy class="icon !text-emerald-500" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">Bergaransi Sampai Bisa</h3>
          <p class="text-gray-500 dark:text-gray-400">Merupakan penawaran unggulan kami, kami menjamin anda dapat mengikuti pembelajaran sampai bisa.</p>
        </div>
      </div>
    </div>
  </section>
</template>
