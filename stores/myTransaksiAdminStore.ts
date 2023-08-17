export const useTransaksiStore = defineStore('transaksiAdmin', () => {
  const pageNumberTransaksi: Ref<number> = ref(1)
  const searchTransaksi: Ref<string> = ref('')
  const filterTransaksi: Ref<string> = ref('')
  return {
    pageNumberTransaksi,
    searchTransaksi,
    filterTransaksi
  }
})
