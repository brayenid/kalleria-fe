<script setup>
useSeoMeta({
  description: 'Lembaga Pendidikan, Pelatihan, dan Kursus siap kerja dan terlengkap di Kutai Barat.',
  ogTitle: 'LPK Kalleria',
  ogDescription: useRuntimeConfig().public.ogDesc,
  ogImage: useRuntimeConfig().public.ogImage
})

const getInfoScroll = () => {
  console.log(window.scrollY)
}
</script>
<template>
  <div @scroll="getInfoScroll">
    <HomeJumbotron />
    <HomeAbout />
    <HomeFeatures />
    <HomeProducts />
    <HomeFaq />
    <HomeCta />
  </div>
</template>
