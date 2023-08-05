export const usePaginationStore = defineStore('pagination', () => {
  const pageNumberTransaksiUser: Ref<number> = ref(1)
  const pageNumberKelasAdmin: Ref<number> = ref(1)
  return {
    pageNumberTransaksiUser,
    pageNumberKelasAdmin
  }
})
