<script setup>
const props = defineProps({
  message: String
})
</script>

<template>
  <div class="text-center flex flex-col items-center justify-center">
    <img class="max-w-[250px] mb-2" src="/svg/notfound-boy.png" alt="notfound" />
    <p class="text-md font-semibold mb-4">{{ message }}</p>
  </div>
</template>
