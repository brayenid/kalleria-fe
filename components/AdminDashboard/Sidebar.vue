<script setup>
defineNuxtLink({
  activeClass: 'active-link'
})
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
  <aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidenav" id="drawer-navigation">
    <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
      <ul class="space-y-2">
        <li>
          <button
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="kelas-dropdown"
            data-collapse-toggle="kelas-dropdown"
          >
            <IconsAdd class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Manajemen Kelas</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul id="kelas-dropdown" class="hidden py-2 space-y-2">
            <li>
              <NuxtLink to="/admin/dashboard/kelas/tambah" class="menu-link_sub-link group">Tambah Kelas</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/dashboard/kelas" class="menu-link_sub-link group">Daftar Kelas</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <button
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="siswa-dropdown"
            data-collapse-toggle="siswa-dropdown"
          >
            <IconsGroup class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Kesiswaan</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul id="siswa-dropdown" class="hidden py-2 space-y-2">
            <li>
              <NuxtLink to="/admin/dashboard/presensi" class="menu-link_sub-link group">Presensi Kelas</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/dashboard/siswa" class="menu-link_sub-link group">Data Siswa</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <NuxtLink to="/admin/dashboard/transaksi" class="menu-link group">
            <IconsTransaction class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 whitespace-nowrap">Transaksi</span>
          </NuxtLink>
        </li>
      </ul>
      <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
        <li>
          <a href="#" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <IconsQuestion class="group-hover:text-gray-800" />
            <span class="ml-3">Bantuan</span>
          </a>
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
