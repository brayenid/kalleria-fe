<script setup>
import { useAuthStore } from '~/stores/myAuthStore'
const authStore = useAuthStore()
</script>
<style lang="postcss" scoped>
.menu-link {
  @apply flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700;
}
.menu-link_sub-link {
  @apply flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700;
}
a.router-link-active {
  @apply !bg-slate-100;
}
</style>
<template>
  <aside class="fixed top-0 left-0 z-30 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidenav" id="drawer-navigation">
    <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
      <ul class="space-y-2">
        <li>
          <NuxtLink to="/dashboard" class="menu-link group">
            <IconsUser class="group-hover:text-gray-800" />
            <span class="ml-3">Informasi Akun</span>
          </NuxtLink>
        </li>
        <li>
          <button
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-kelas"
            data-collapse-toggle="dropdown-kelas"
          >
            <IconsLibrary class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Kelas</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul id="dropdown-kelas" class="hidden py-2 space-y-2">
            <li>
              <a href="#" class="menu-link_sub-link group">Kelas Yang Diikuti</a>
            </li>
            <li>
              <a href="#" class="menu-link_sub-link group">Jadwal</a>
            </li>
          </ul>
        </li>
        <li>
          <NuxtLink to="/dashboard/transaksi" class="menu-link group">
            <IconsTransaction class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 whitespace-nowrap">Transaksi</span>
            <IconsBell v-if="authStore.isNotifyTransaksi" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dashboard/kelas" class="menu-link bg-gradient-to-r from-orange-200 to-yellow-200 hover:from-orange-300 hover:to-yellow-300">
            <IconsBasket class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 whitespace-nowrap">Beli Kelas</span>
          </NuxtLink>
        </li>
      </ul>
      <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
        <li>
          <button
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-setting"
            data-collapse-toggle="dropdown-setting"
          >
            <IconsSetting class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Akun</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul id="dropdown-setting" class="hidden py-2 space-y-2">
            <li>
              <a href="#" class="menu-link_sub-link group">Ubah Detail Akun</a>
            </li>
            <li>
              <a href="#" class="menu-link_sub-link group">Ubah Password</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <IconsQuestion class="group-hover:text-gray-800" />
            <span class="ml-3">Bantuan</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <IconsWhatsapp class="group-hover:text-gray-800" />
            <span class="ml-3">Whatsapp</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
      <p class="text-xs text-center text-gray-500">© 2023 LPK Kalleria.</p>
    </div>
  </aside>
</template>
