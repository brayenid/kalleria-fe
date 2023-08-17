export const usePresensiStore = defineStore('presensiAdmin', () => {
  const pageNumberPresensi: Ref<number> = ref(1)
  const searchPresensi: Ref<string> = ref('')

  return {
    pageNumberPresensi,
    searchPresensi
  }
})
