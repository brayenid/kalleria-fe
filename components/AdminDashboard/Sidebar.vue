<script setup>
defineNuxtLink({
  activeClass: 'active-link'
})

const role = useCookie('role')

const sidebarEl = ref()

onMounted(() => {
  const menuLinkElements = document.querySelectorAll('.menu-link')
  const menuSubLinkElements = document.querySelectorAll('.menu-link_sub-link')

  menuLinkElements.forEach((element) => {
    element.setAttribute('data-drawer-hide', 'drawer-navigation')
  })

  menuSubLinkElements.forEach((element) => {
    element.setAttribute('data-drawer-hide', 'drawer-navigation')
  })
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
  <aside
    class="fixed top-0 left-0 z-[39] w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidenav"
    ref="sidebarEl"
    id="drawer-navigation"
  >
    <div class="overflow-y-auto py-5 px-3 pb-20 h-full bg-white dark:bg-gray-800">
      <ul class="space-y-2">
        <li>
          <NuxtLink to="/admin/dashboard" class="menu-link group">
            <IconsList class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 whitespace-nowrap">Utama</span>
          </NuxtLink>
        </li>
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
            <li>
              <NuxtLink to="/admin/dashboard/presensi" class="menu-link_sub-link group">Daftar Presensi Kelas</NuxtLink>
            </li>
            <li>
              <a href="/admin/presensi" target="_blank" class="menu-link_sub-link group">Presensi Harian</a>
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
              <NuxtLink to="/admin/dashboard/siswa" class="menu-link_sub-link group">Data Siswa</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/dashboard/kelasuser" class="menu-link_sub-link group">Kelas Siswa</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/dashboard/sertifikat" class="menu-link_sub-link group">Sertifikat</NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <button
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="transaksi-dropdown"
            data-collapse-toggle="transaksi-dropdown"
          >
            <IconsTransaction class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Transaksi</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul id="transaksi-dropdown" class="hidden py-2 space-y-2">
            <li>
              <NuxtLink to="/admin/dashboard/transaksi" class="menu-link_sub-link group">Data Transaksi</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/dashboard/transaksi/tunai" class="menu-link_sub-link group">Beli Tunai</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
        <li v-if="role === 'sudo'">
          <button
            type="button"
            class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="admins-dropdown"
            data-collapse-toggle="admins-dropdown"
          >
            <IconsUserShield class="group-hover:text-gray-800" />
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Admin</span>
            <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul id="admins-dropdown" class="hidden py-2 space-y-2">
            <li>
              <NuxtLink to="/sudo/dashboard/admin/tambah" class="menu-link_sub-link group">Tambah Admin</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sudo/dashboard/admin" class="menu-link_sub-link group">Data Admin</NuxtLink>
            </li>
          </ul>
        </li>
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
              <NuxtLink to="/admin/dashboard/kredensial" class="menu-link_sub-link group">Ubah Password</NuxtLink>
            </li>
            <li v-if="role === 'sudo'">
              <NuxtLink to="/sudo/dashboard/reset/user" class="menu-link_sub-link group">Reset User</NuxtLink>
            </li>
            <li v-if="role === 'sudo'">
              <NuxtLink to="/sudo/dashboard/reset/admin" class="menu-link_sub-link group">Reset Admin</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
      <p class="text-xs text-center text-gray-500">© 2023 LPK Kalleria.</p>
    </div>
  </aside>
</template>
