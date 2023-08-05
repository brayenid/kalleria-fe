<script setup>
const props = defineProps({
  path: String,
  startIndex: Number,
  sliceLink: Number,
  lastPoint: String
})

const originalPath = computed(() => {
  const splitedPath = props.path.split('/')
  return splitedPath.slice(1, splitedPath.length - 1)
})

const parsedPath = computed(() => {
  const splitedPath = props.path.split('/')
  const startIndex = props.startIndex || 1
  return splitedPath.slice(startIndex, splitedPath.length - 1)
})

const generatedBreadcrumbLink = (index) => {
  const sliceLink = props.sliceLink || 1
  const path = originalPath.value.slice(0, index + sliceLink)
  return `/${path.join('/')}`
}

const capitalizeEveryWord = (string) => {
  return string?.replace(/\b\w/g, (char) => char.toUpperCase())
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <nav class="flex px-5 py-3 text-gray-700 rounded-md bg-white mb-4 shadow-sm dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
      <ol class="flex gap-2 items-center flex-wrap">
        <li v-for="(breadPath, index) in parsedPath" :key="index" class="flex items-center">
          <NuxtLink :to="generatedBreadcrumbLink(index)" class="mr-3 flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"> {{ capitalizeEveryWord(breadPath) }} </NuxtLink>
          <svg class="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
        </li>
        <li aria-current="page">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ capitalizeEveryWord(props.lastPoint) }}</p>
        </li>
      </ol>
    </nav>
  </div>
</template>
