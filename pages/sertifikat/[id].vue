<script setup>
import QRious from 'qrious'
import { toPng } from 'html-to-image'
import download from 'downloadjs'

definePageMeta({
  layout: false
})
useSeoMeta({
  title: 'Cetak Sertifikat'
})

const { $axios: axios } = useNuxtApp()
const route = useRoute()
const sertifikatDetail = ref('')
const certEl = ref()

const qr = ref()

const toImg = async () => {
  const dataUrl = await toPng(certEl.value)
  download(dataUrl, `sertifikat-${route.params.id}.png`)
}

const print = () => {
  window.print()
}

onMounted(async () => {
  new QRious({
    element: qr.value,
    value: `https://lpk.kalleriagroup.com/sertifikat/${sertifikatDetail.value.id}`
  })
  try {
    const sertifikatKelasUser = (await axios.get(`/sertifikat/${route.params.id}`)).data.data
    sertifikatDetail.value = sertifikatKelasUser
    if (!sertifikatDetail.value) throw new Error('Not Found')
  } catch (error) {
    throw createError({ status: 404, message: 'Not Found', fatal: true })
  }
})
</script>

<style scoped>
.gradient-header {
  background: rgb(248, 237, 63);
  background: -moz-linear-gradient(85deg, rgba(248, 237, 63, 0.3) 0%, rgba(255, 255, 255, 1) 50%, rgba(248, 237, 63, 0.3) 100%);
  background: -webkit-linear-gradient(85deg, rgba(248, 237, 63, 0.3) 0%, rgba(255, 255, 255, 1) 50%, rgba(248, 237, 63, 0.3) 100%);
  background: linear-gradient(85deg, rgba(248, 237, 63, 0.3) 0%, rgba(255, 255, 255, 1) 50%, rgba(248, 237, 63, 0.3) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f8ed3f",endColorstr="#f8ed3f",GradientType=1);
}
.print-area-container {
  @apply min-w-[1024px] h-[720px] p-14;
}
@media print {
  .print-control {
    @apply hidden;
  }
  .print-area-container {
    @apply min-w-[1024px] !h-screen p-0;
  }
}
</style>

<template>
  <div>
    <div class="print-control fixed w-full p-2 bg-gray-100 z-50 text-center top-0 flex justify-center items-center gap-2">
      <button @click="toImg" class="p-1 px-2 bg-red-50 border border-red-600 rounded text-red-600 hover:bg-red-200">PNG</button>
      <button @click="print" class="p-1 px-2 bg-green-50 border border-green-600 rounded text-green-600 hover:bg-green-200">Cetak</button>
    </div>
    <div class="print-area-container">
      <div ref="certEl" class="bg-blue-900 w-full h-full flex justify-center items-center p-6">
        <div class="bg-white p-6 w-full h-full">
          <div class="bg-yellow-300 h-full p-1">
            <div class="bg-white h-full p-2 flex flex-col justify-between relative">
              <header class="gradient-header flex justify-between items-center p-4">
                <div class="flex items-center gap-4">
                  <img class="w-28" src="/images/kalleria-logo.png" alt="logo" />
                </div>
                <div class="absolute left-0 w-full flex justify-center items-center">
                  <img class="w-16" src="/images/medal.png" alt="" />
                </div>
                <h1 class="text-3xl text-yellow-400 font-bold text-right uppercase">
                  Sertifikat <br />
                  Kompetensi <br />
                  Kelulusan
                </h1>
              </header>
              <div class="text-center h-64 flex flex-col justify-center gap-6">
                <p class="text-lg font-light">Diberikan Kepada :</p>
                <p class="text-5xl font-bold text-blue-800">{{ sertifikatDetail?.nama }}</p>
                <p class="text-md max-w-lg mx-auto font-light">
                  Yang telah berhasil menyelesaikan <span class="font-semibold">{{ sertifikatDetail?.namaKelas }}</span> di LPK Kalleria dalam {{ sertifikatDetail?.maksimalPertemuan }} pertemuan kelas.
                </p>
              </div>
              <footer class="text-center font-light relative">
                <div>
                  <p>Kutai Barat, {{ useLocalDateDetail(sertifikatDetail?.tanggal) }}</p>
                  <br />
                  <br />
                  <p class="font-semibold">LPK Kalleria</p>
                </div>
                <canvas ref="qr" class="w-28 absolute bottom-0 right-0"></canvas>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
