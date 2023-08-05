<script setup>
const props = defineProps({
  numberOfSkeleton: Number
})
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-2">
    <div v-for="index in props.numberOfSkeleton" :key="index" class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-blue-300 transition-all dark:bg-gray-800 dark:border-gray-700">
      <div class="w-14 h-4 bg-gray-100 mb-5 rounded-md"></div>
      <div class="h-[200px] w-full bg-gray-200 rounded-md mb-5"></div>
      <div class="h-[50px] w-full bg-gray-200 rounded-md"></div>
      <div class="flex justify-end">
        <div class="h-4 w-16 bg-gray-200 rounded-md mt-5"></div>
      </div>
    </div>
  </div>
</template>
