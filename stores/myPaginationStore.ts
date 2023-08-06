export const usePaginationStore = defineStore('pagination', () => {
  const pageNumberTransaksiUser: Ref<number> = ref(1)
  const pageNumberKelasAdmin: Ref<number> = ref(1)
  const pageNumberUsers: Ref<number> = ref(1)

  const searchUser: Ref<string> = ref('')
  return {
    pageNumberTransaksiUser,
    pageNumberKelasAdmin,
    pageNumberUsers,
    searchUser
  }
})
