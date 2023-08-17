export const useSertifikatStore = defineStore('sertifikatAdmin', () => {
  const pageNumberSertifikat: Ref<number> = ref(1)
  const searchSertifikat: Ref<string> = ref('')

  return {
    pageNumberSertifikat,
    searchSertifikat
  }
})
