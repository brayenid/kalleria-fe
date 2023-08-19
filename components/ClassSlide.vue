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
    <div class="min-h-[170px] max-h-[180px] overflow-hidden flex items-start justify-center mb-3">
      <NuxtImg class="group-hover:-translate-y-3 transition-all" loading="lazy" :src="`${useRuntimeConfig().public.beEndpoint}/${img}`" :alt="kelasTitle" />
    </div>
    <div class="flex flex-col gap-4 p-4 justify-start text-center h-[140px]">
      <div>
        <h4 class="font-semibold text-md">{{ kelasTitle }}</h4>
        <p class="font-light text-sm">Tipe Kelas : {{ kelasType }}</p>
      </div>
      <p class="mb-2 flex justify-center items-center gap-2"><IconsMoney class="!text-green-500" />{{ useCurrency(kelasPrice) }}</p>
    </div>
    <button @click="pushToRoute" class="text-blue-500 bg-blue-50 hover:bg-blue-100 outline-none font-medium focus:bg-blue-200 text-sm w-full px-5 py-2.5 text-center">Beli Kelas</button>
  </div>
</template>
