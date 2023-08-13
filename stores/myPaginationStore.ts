export const usePaginationStore = defineStore('pagination', () => {
  const pageNumberTransaksiUser: Ref<number> = ref(1)
  const pageNumberTransaksiAdmin: Ref<number> = ref(1)
  const pageNumberKelasAdmin: Ref<number> = ref(1)
  const pageNumberUsers: Ref<number> = ref(1)
  const pageNumberKelasUsers: Ref<number> = ref(1)
  const pageNumberPresensi: Ref<number> = ref(1)
  const pageNumberAdmins: Ref<number> = ref(1)

  const searchUser: Ref<string> = ref('')
  const searchAdmin: Ref<string> = ref('')
  const searchTransaksi: Ref<string> = ref('')
  const searchPresensi: Ref<string> = ref('')

  const filterTransaksi: Ref<string> = ref('')
  return {
    pageNumberTransaksiUser,
    pageNumberTransaksiAdmin,
    pageNumberKelasAdmin,
    pageNumberUsers,
    pageNumberKelasUsers,
    pageNumberPresensi,
    pageNumberAdmins,
    searchAdmin,
    searchUser,
    searchTransaksi,
    searchPresensi,
    filterTransaksi
  }
})
