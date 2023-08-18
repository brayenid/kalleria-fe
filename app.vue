<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Kalleria` : 'Kalleria - LPK Siap Kerja dan Terlengkap di Kutai Barat'
  }
})

useSeoMeta({
  description: 'Lembaga Pendidikan, Pelatihan, dan Kursus siap kerja dan terlengkap di Kutai Barat.',
  ogTitle: 'LPK Kalleria',
  ogDescription: useRuntimeConfig().public.ogDesc,
  ogImage: useRuntimeConfig().public.ogImage,
  ogUrl: 'https://lpk.kalleriagroup.com',
  ogSiteName: 'LPK Kalleria Kutai Barat',
  author: 'Kalleria Group',
  twitterTitle: 'LPK Kalleria',
  twitterDescription: useRuntimeConfig().public.ogDesc,
  twitterImage: useRuntimeConfig().public.ogImage
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
