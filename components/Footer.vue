<template>
  <div>
    <footer class="bg-white dark:bg-gray-900">
      <div class="mx-auto w-full max-w-screen-lg p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 text-center md:text-left md:mb-0">
            <p class="flex items-center justify-center md:items-start md:justify-start">
              <img src="/images/kalleria-logo.png" class="h-8 mr-3 inline" alt="Kalleria Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kalleria</span>
            </p>
            <div class="text-gray-500 mt-4 text-sm">
              <p>+62-812-1183-1970</p>
              <p>kalleriagroup@gmail.com</p>
              <p>Jl. D.I Panjaitan, RT 014, Busur, Kecamatan Barong Tongkok</p>
            </div>
          </div>
          <div class="text-center md:text-left">
            <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
            <ul class="text-gray-600 flex flex-col gap-1">
              <li>
                <NuxtLink to="/privacy" class="hover:underline text-sm">Privacy Policy</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/tos" class="hover:underline text-sm">Terms &amp; Conditions</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="text-center md:text-left">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 LPK Kalleria. All Rights Reserved. </span>
        </div>
      </div>
    </footer>
  </div>
</template>
