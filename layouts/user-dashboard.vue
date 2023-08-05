<script setup>
import { initDropdowns, initCollapses, initDrawers } from 'flowbite'

useSeoMeta({
  title: 'Dashboard User'
})

defineNuxtLink({
  activeClass: 'active-link'
})
onMounted(async () => {
  initCollapses()
  initDropdowns()
  initDrawers()
})
</script>

<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <UserDashboardNav />
    <UserDashboardSidebar />
    <main class="p-8 md:ml-64 h-auto pt-24">
      <slot />
    </main>
  </div>
</template>
