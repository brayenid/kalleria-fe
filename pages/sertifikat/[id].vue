<script setup>
import QRious from 'qrious'
import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
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
const isLoading = ref(false)

const generatePDF = async () => {
  isLoading.value = true
  // Fetch an existing PDF document
  const url = `${useRuntimeConfig().public.feEndpoint}/certif/sertifikat.pdf`

  // Fetch Fonts
  const poppinsRegularUrl = await fetch(`${useRuntimeConfig().public.feEndpoint}/fonts/Poppins-Regular.ttf`).then((res) => res.arrayBuffer())
  const poppinsBoldUrl = await fetch(`${useRuntimeConfig().public.feEndpoint}/fonts/Poppins-Bold.ttf`).then((res) => res.arrayBuffer())

  // Load a PDFDocument from the existing PDF bytes
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  pdfDoc.registerFontkit(fontkit)

  // Embed font
  const poppinsRegular = await pdfDoc.embedFont(poppinsRegularUrl)
  const poppinsBold = await pdfDoc.embedFont(poppinsBoldUrl)

  // Get the first page of the document
  const pages = pdfDoc.getPages()
  const page = pages[0]
  const textSizeName = 30
  const textSizeDesc = 12
  const textSizeDate = 12
  const { width, height } = page.getSize()

  // Name set
  const name = useCapital(sertifikatDetail.value?.nama)
  const textWidthName = poppinsBold.widthOfTextAtSize(name, textSizeName)
  const textXName = (width - textWidthName) / 2
  const textYName = 360

  // Desc set
  const desc = `Yang telah menyelesaikan ${sertifikatDetail.value?.namaKelas} di LPK Kalleria`
  const textWidthDesc = poppinsBold.widthOfTextAtSize(desc, textSizeDesc)
  const textXDesc = (width - textWidthDesc) / 2
  const textYDesc = 320

  // Desc set
  const desc2 = `dalam ${sertifikatDetail.value?.maksimalPertemuan} pertemuan kelas.`
  const textWidthDesc2 = poppinsBold.widthOfTextAtSize(desc2, textSizeDesc)
  const textXDesc2 = (width - textWidthDesc2) / 2
  const textYDesc2 = 300

  // Date set
  const date = useLocalDateDetail(sertifikatDetail.value?.tanggal)
  const textWidthDate = poppinsBold.widthOfTextAtSize(date, textSizeDate)
  const textXDate = (width - textWidthDate) / 2
  const textYDate = 180

  // QR Set
  const qrText = `${useRuntimeConfig().public.feEndpoint}/sertifikat/${route.params.id}`
  const qr = new QRious({ value: qrText })
  const qrImage = await pdfDoc.embedPng(qr.toDataURL())

  // Draw a string of text
  page.drawText(name, {
    x: textXName,
    y: textYName,
    size: textSizeName,
    font: poppinsBold,
    color: rgb(62 / 255, 64 / 255, 149 / 255)
  })

  page.drawText(desc, {
    x: textXDesc,
    y: textYDesc,
    size: textSizeDesc,
    font: poppinsRegular,
    color: rgb(24 / 255, 24 / 255, 27 / 255)
  })

  page.drawText(desc2, {
    x: textXDesc2,
    y: textYDesc2,
    size: textSizeDesc,
    font: poppinsRegular,
    color: rgb(24 / 255, 24 / 255, 27 / 255)
  })

  page.drawText(date, {
    x: textXDate,
    y: textYDate,
    size: textSizeDate,
    font: poppinsRegular,
    color: rgb(24 / 255, 24 / 255, 27 / 255)
  })

  // Menggambar gambar QR di tengah halaman
  const qrX = width - qrImage.width
  const qrY = height - 590 // Menggeser gambar QR di atas teks
  const qrImageWidth = 100
  const qrImageHeight = 100
  page.drawImage(qrImage, { x: qrX, y: qrY, width: qrImageWidth, height: qrImageHeight })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Trigger the browser to download the PDF document
  const fileName = `SERTIFIKAT-KALLERIA_${(sertifikatDetail.value?.nama).toUpperCase()}_${(sertifikatDetail.value?.namaKelas).toUpperCase()}.pdf`
  download(pdfBytes, fileName, 'application/pdf')
  isLoading.value = false
}

onMounted(async () => {
  try {
    const sertifikatKelasUser = (await axios.get(`/sertifikat/${route.params.id}`)).data.data
    sertifikatDetail.value = sertifikatKelasUser
    if (!sertifikatDetail.value) throw new Error('Not Found')
  } catch (error) {
    throw createError({ status: 404, message: 'Not Found', fatal: true })
  }
})
</script>

<template>
  <div class="flex justify-center">
    <Loading v-if="isLoading" />
    <div class="w-full max-w-screen-md flex flex-col items-center gap-2 mt-6 px-2">
      <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="/images/kalleria-logo.png" alt="logo" />
        Kalleria
      </a>
      <div class="bg-white p-4 rounded shadow">
        <h1 class="mb-4 font-semibold text-lg text-center">Validitas Sertifikat</h1>
        <p>
          Sertifikat ini benar telah diterbitkan oleh LPK Kalleria sebagai bentuk validitas kelulusan <span class="font-semibold">{{ sertifikatDetail?.nama }}</span> pada
          <span class="font-semibold">{{ sertifikatDetail?.namaKelas }}</span> yang diterbitkan pada {{ useLocalDateDetail(sertifikatDetail?.tanggal) }}. Jumlah pertemuan yang telah dilalui oleh siswa pada kelas ini adalah sebanyak
          {{ sertifikatDetail?.maksimalPertemuan }} pertemuan.
        </p>
        <div class="text-center mt-6">
          <button class="button-primary" @click="generatePDF">Cetak PDF</button>
        </div>
      </div>
    </div>
  </div>
</template>
