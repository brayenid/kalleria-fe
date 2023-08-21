<template>
  <div>
    <footer class="bg-white dark:bg-gray-900">
      <div class="mx-auto w-full container p-4 pb-6 lg:pb-8 pt-0">
        <hr class="mb-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mb-8" />
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
            <div class="mt-4 flex justify-center md:justify-start">
              <a href="https://instagram.com/lpk.kalleria/" title="Ikuti kami di Instagram" target="_blank" aria-label="instagram" rel="noopener noreferrer">
                <IconsInstagram />
              </a>
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
        <div class="text-center flex gap-3 justify-between items-center flex-wrap text-sm text-gray-500 dark:text-gray-400">
          <p class="w-full block text-center md:w-auto md:inline">© 2023 LPK Kalleria. All Rights Reserved.</p>
          <p class="w-full block text-center md:w-auto md:inline">Developed By : <a class="hover:underline" href="https://brayenluhat.xyz" target="_blank" rel="noopener noreferrer">Brayen Luhat</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>
