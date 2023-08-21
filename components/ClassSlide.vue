<script setup>
import { useAuthStore } from '~/stores/myAuthStore'
const props = defineProps({
  img: String,
  kelasId: String,
  kelasTitle: String,
  kelasType: String,
  kelasPrice: Number
})

const authStore = useAuthStore()
const { $Swal: Swal } = useNuxtApp()

const pushToRoute = async () => {
  if (!authStore.accessToken) {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Anda Belum Terdaftar',
      text: 'Untuk bisa membeli kelas, anda harus terdaftar. Ayo bergabung bersama LPK Kalleria!',
      showConfirmButton: true,
      confirmButtonText: 'Daftar',
      showCloseButton: true
    })
    if (isConfirmed) {
      return navigateTo('/daftar')
    }
    return
  }
  return navigateTo(`/dashboard/kelas/${props.kelasId}`)
}
</script>

<template>
  <div class="group">
    <p class="font-light text-xs absolute top-0 right-0 w-max p-1 bg-orange-200 group-hover:-translate-y-full transition-transform">{{ kelasType }}</p>
    <div class="overflow-hidden flex items-center justify-center">
      <NuxtImg class="group-hover:scale-110 transition-all object-cover h-full" loading="lazy" :src="`${useRuntimeConfig().public.beEndpoint}/${img}`" :alt="kelasTitle" />
    </div>
    <div class="group-hover:rounded-t-md transition-transform absolute bottom-0 bg-white w-full">
      <div class="p-2 justify-start text-center">
        <h4 class="font-semibold sm:text-md">{{ kelasTitle }}</h4>
      </div>
      <div class="w-full h-full max-h-0 overflow-hidden group-hover:max-h-[138px] transition-all">
        <p class="mb-2 flex justify-center items-center gap-2"><IconsMoney class="!text-green-500" />{{ useCurrency(kelasPrice) }}</p>
        <button @click="pushToRoute" class="text-blue-500 bg-blue-50 hover:bg-blue-100 outline-none font-medium focus:bg-blue-200 text-sm w-full px-5 py-2.5 text-center">Beli Kelas</button>
      </div>
    </div>
  </div>
</template>
