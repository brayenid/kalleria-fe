<script setup lang="ts">
useSeoMeta({
  title: 'Daftar Akun',
  description: 'Mendaftar menjadi bagian dari Kalleria LPK'
})

definePageMeta({
  middleware: 'no-back-auth-page'
})
</script>

<style scoped lang="postcss">
h1 {
  @apply text-3xl mb-4;
}
p {
  @apply text-sm text-center font-thin;
}
</style>

<template>
  <div class="p-8">
    <div class="w-full flex flex-col justify-center bg-white border border-gray-100 rounded-md shadow-md md:flex-row">
      <div class="flex-[1] p-12 border-b-2 border-r-0 md:border-r-2 md:border-b-0 border-gray-200 border-dashed">
        <RegisterTimeline />
      </div>
      <div class="flex-[2] px-8 py-12">
        <RegisterForm />
      </div>
    </div>
  </div>
</template>
