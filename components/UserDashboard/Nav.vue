<template>
  <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-40">
    <div class="flex flex-wrap justify-between items-center">
      <div class="flex justify-start items-center">
        <button
          data-drawer-target="drawer-navigation"
          data-drawer-toggle="drawer-navigation"
          aria-controls="drawer-navigation"
          class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <IconsDrawer />
          <span class="sr-only">Toggle sidebar</span>
        </button>
        <NavbarTitleLogo data-drawer-hide="drawer-navigation" title-text="Kalleria" class="mr-4" />
      </div>
      <div class="flex items-center lg:order-2">
        <!-- Users Pop Up -->
        <NavbarUsersPopup class="ml-4" />
      </div>
    </div>
  </nav>
</template>
