<script setup>
defineProps({
  titleText: String
})
</script>

<template>
  <div>
    <NuxtLink to="/" class="flex items-center">
      <img src="/images/kalleria-logo.png" class="h-8 mr-3" alt="Kalleria Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ titleText }}</span>
    </NuxtLink>
  </div>
</template>
