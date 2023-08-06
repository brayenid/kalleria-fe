<script setup>
import { useAuthStore } from '~/stores/myAuthStore'

const authStore = useAuthStore()
</script>

<style scoped lang="postcss">
.link {
  @apply bg-blue-500 text-gray-50 text-sm p-2 rounded-md hover:bg-blue-600;
}
</style>

<template>
  <div>
    <div v-if="authStore?.accessToken">
      <NavbarUsersPopup />
    </div>
    <div v-else>
      <ul class="hidden md:flex gap-2 mr-4">
        <li>
          <NuxtLink class="link" to="/register">Daftar</NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/login">Masuk</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
