<script setup>
import { initDropdowns, initCollapses } from 'flowbite'

onMounted(() => {
  initCollapses()
  initDropdowns()
})
</script>

<style scoped lang="postcss">
.menu_link {
  @apply block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700;
}
</style>

<template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900 fixed w-full top-0 z-40 shadow-md shadow-slate-100">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavbarTitleLogo title-text="Kalleria" />
        <div class="flex items-center lg:order-2">
          <NavbarUsersArea />
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <IconsHamburger />
          </button>
        </div>
        <div class="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="navbar-user">
          <ul class="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NuxtLink to="/" class="menu_link" aria-current="page">Beranda</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/register" class="menu_link">Tentang</NuxtLink>
            </li>
            <li>
              <a href="#" class="menu_link">Kelas</a>
            </li>
            <li>
              <a href="#" class="menu_link">Informasi Pendaftaran</a>
            </li>
            <li class="block md:hidden">
              <NuxtLink to="/register" class="menu_link">Daftar</NuxtLink>
            </li>
            <li class="block md:hidden">
              <NuxtLink to="/login" class="menu_link">Masuk</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="mt-12">
      <slot />
    </div>
  </div>
</template>
