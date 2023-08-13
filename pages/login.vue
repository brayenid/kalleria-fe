<script setup lang="ts">
useSeoMeta({
  title: 'Masuk Akun',
  description: 'Masuk akun Kalleria LPK'
})

definePageMeta({
  middleware: 'no-back-auth-page'
})
</script>

<style scoped></style>

<template>
  <div class="flex justify-center items-center p-8 min-h-[80vh]">
    <LoginForm />
  </div>
</template>
