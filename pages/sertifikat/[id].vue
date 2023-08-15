<script setup>
import QRious from 'qrious'

definePageMeta({
  layout: false
})
useSeoMeta({
  title: 'Cetak Sertifikat'
})

const { $axiosAuth: axios } = useNuxtApp()
const route = useRoute()
const sertifikatDetail = ref('')

const qr = ref()

onMounted(async () => {
  try {
    const sertifikatKelasUser = (await axios.get(`/sertifikat/${route.params.id}`)).data.data
    sertifikatDetail.value = sertifikatKelasUser
    new QRious({
      element: qr.value,
      value: `https://lpk.kalleriagroup.com/sertifikat/${sertifikatDetail.value.id}`
    })
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

@media print {
  @page {
    margin-top: 0;
    margin-bottom: 0;
  }
  body {
    padding-top: 72px;
    padding-bottom: 72px;
  }
}
</style>

<template>
  <div class="bg-blue-900 w-full h-screen flex justify-center items-center p-6">
    <div class="h-full w-full bg-white p-6">
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
</template>
