<script setup>
const props = defineProps({
  img: String,
  imgTitle: String
})
</script>

<template>
  <div>
    <div class="h-[220px] overflow-hidden flex items-center justify-center my-5 rounded-md">
      <NuxtImg loading="lazy" :src="`/images/ruang/${img}`" class="object-center" :alt="imgTitle" />
    </div>
    <h4 class="text-center">{{ imgTitle }}</h4>
  </div>
</template>
