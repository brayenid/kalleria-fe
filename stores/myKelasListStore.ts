export const useKelasListStore = defineStore('kelasList', () => {
  const pageNumberKelas: Ref<number> = ref(1)
  const searchKelas: Ref<string> = ref('')

  return {
    pageNumberKelas,
    searchKelas
  }
})
