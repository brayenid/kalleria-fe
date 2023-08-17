export const useTransaksiStore = defineStore('transaksiUser', () => {
  const pageNumberTransaksi: Ref<number> = ref(1)

  return {
    pageNumberTransaksi
  }
})
