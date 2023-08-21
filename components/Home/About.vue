<template>
  <section id="about" class="flex justify-center p-8 py-16 md:py-24 bg-[url('/svg/bg-dot.svg')] bg-cover">
    <div class="container flex flex-col md:flex-row gap-16 justify-center items-start">
      <div data-aos="zoom-in" class="flex justify-center items-center w-full">
        <NuxtImg class="w-52 md:w-60" src="/images/kalleria-logo.png" alt="logo kalleria" />
      </div>
      <div class="text-center md:text-left">
        <h2 class="mb-4 text-3xl font-bold">Siapa Kami?</h2>
        <article class="mb-6 font-light text-gray-600 lg:mb-8 md:text-lg dark:text-gray-4004">
          Kami adalah Lembaga Kursus dan Pelatihan profesional di Kutai Barat yang berkomitmen untuk mencetak Sumber Daya Manusia yang berkualitas dengan tenaga pengajar yang sukses dan handal di bidang masing-masing.
        </article>
        <div>
          <NuxtLink
            to="/about"
            class="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 mr-3 text-base font-medium text-center text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 transition-all dark:focus:ring-blue-900"
          >
            Kenali Lebih Jauh
            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
