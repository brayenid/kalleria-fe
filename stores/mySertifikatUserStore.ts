export const useSertifikatStore = defineStore('sertifikatUser', () => {
  const pageNumberSertifikat: Ref<number> = ref(1)

  return {
    pageNumberSertifikat
  }
})
