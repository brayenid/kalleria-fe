<script setup>
import { useAuthStore } from '~/stores/myAuthStore'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <div v-if="authStore?.accessToken">
      <NavbarUsersPopup />
    </div>
    <div v-else>
      <ul class="hidden md:flex gap-2 mr-4">
        <li>
          <NuxtLink class="bg-transparent border border-blue-500 text-blue-500 text-sm p-2 px-3 rounded-md hover:bg-blue-100" to="/daftar">Daftar</NuxtLink>
        </li>
        <li>
          <NuxtLink class="bg-blue-500 border border-transparent text-gray-50 text-sm p-2 px-3 rounded-md hover:bg-blue-600" to="/login">Masuk</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
