<script setup>
definePageMeta({
  middleware: 'auth-user',
  layout: 'user-dashboard'
})
onMounted(async () => {
  await navigateTo('/dashboard/transaksi')
})
</script>

<template>
  <div>
    <p>redirecting ...</p>
  </div>
</template>
