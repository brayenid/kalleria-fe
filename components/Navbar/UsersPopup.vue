<script setup>
import { initDropdowns, initCollapses } from 'flowbite'
import { useAuthStore } from '~/stores/myAuthStore'

const authStore = useAuthStore()
const { $Swal: Swal, $axiosAuth: axios } = useNuxtApp()
const userInfo = reactive({
  nama: null,
  email: null,
  urlImage: null,
  role: null
})

const profileImageSrc = computed(() => {
  return userInfo.urlImage ? `${useRuntimeConfig().public.beEndpoint}/${userInfo.urlImage}` : '/svg/blank-profile.svg'
})

const signOut = async () => {
  try {
    await axios.delete(`/auth/${userInfo.role}`, {
      withCredentials: true
    })
    Swal.fire({
      icon: 'success',
      title: 'Berhasil Keluar',
      text: 'Anda berhasil keluar',
      timer: 1200,
      timerProgressBar: true,
      showConfirmButton: false
    })
    authStore.$patch({ accessToken: '' })
    return navigateTo('/login')
  } catch (error) {
    const err = error.response.data.message
    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: err
    })
  }
}

const whatRoleIsLogin = (theMan) => {
  if (theMan === 'user') {
    return 'users'
  }
  if (theMan === 'admin') {
    return 'admins'
  }
  return 'sudo'
}

onMounted(async () => {
  userInfo.role = (await authStore.getUserInfo).role
  const { nama, email, urlFoto } = (await axios.get(`/${whatRoleIsLogin(userInfo.role)}/detail`)).data.data

  userInfo.nama = useShortenName(nama)
  userInfo.email = email
  userInfo.urlImage = urlFoto

  initDropdowns()
  initCollapses()
})
</script>

<style scoped>
button.as-link {
  @apply block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white;
}
</style>

<template>
  <div>
    <button
      type="button"
      class="flex mr-3 text-sm border-[2px] border-blue-300 bg-transparent rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 p-[2px]"
      id="user-menu-button"
      aria-expanded="false"
      data-dropdown-toggle="user-dropdown"
      data-dropdown-placement="bottom"
    >
      <span class="sr-only">Open user menu</span>
      <div class="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center">
        <img class="object-cover h-full" :src="profileImageSrc" alt="profile photo" />
      </div>
    </button>
    <!-- Dropdown menu -->
    <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
      <div class="px-4 py-3">
        <span class="block text-sm text-gray-900 dark:text-white">{{ userInfo?.nama }}</span>
        <div>
          <span v-if="userInfo?.role === 'user'" class="block text-sm text-gray-500 truncate dark:text-gray-400">{{ userInfo?.email }}</span>
          <span v-else-if="userInfo?.role === 'admin'" class="block text-sm text-gray-500 truncate dark:text-gray-400">Admin</span>
        </div>
      </div>
      <ul class="py-2" aria-labelledby="user-menu-button">
        <li>
          <div>
            <NuxtLink v-if="userInfo?.role === 'user'" to="/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</NuxtLink>
            <NuxtLink v-else-if="userInfo?.role === 'admin' || userInfo?.role === 'sudo'" to="/admin/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Dashboard</NuxtLink
            >
          </div>
        </li>
        <li>
          <button @click="signOut" class="as-link">Keluar</button>
        </li>
      </ul>
    </div>
  </div>
</template>
