<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'

const isLoading = ref(true)

onMounted(() => {
  AOS.init({
    once: true
  })
  isLoading.value = false
})
</script>

<template>
  <div class="max-w-full overflow-hidden">
    <Loading v-if="isLoading" :no-backdrop="true" />
    <HomeJumbotron />
    <HomeAbout />
    <HomeFeatures />
    <HomeProducts />
    <HomeGallery />
    <HomeFaq />
    <HomeCta />
  </div>
</template>
