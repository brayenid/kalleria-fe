<script setup>
useSeoMeta({
  description: 'Lembaga Pendidikan, Pelatihan, dan Kursus siap kerja dan terlengkap di Kutai Barat.',
  ogTitle: 'LPK Kalleria',
  ogDescription: useRuntimeConfig().public.ogDesc,
  ogImage: useRuntimeConfig().public.ogImage,
  ogUrl: 'https://lpk.kalleriagroup.com',
  ogSiteName: 'LPK Kalleria Kutai Barat'
})
</script>
<template>
  <div>
    <HomeJumbotron />
    <HomeAbout />
    <HomeFeatures />
    <HomeProducts />
    <HomeFaq />
    <HomeCta />
  </div>
</template>
