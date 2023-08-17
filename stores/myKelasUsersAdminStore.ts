export const useKelasUsersStore = defineStore('kelasUsersAdmin', () => {
  const pageNumberKelasUsers: Ref<number> = ref(1)
  const searchKelasUsers: Ref<string> = ref('')

  return {
    pageNumberKelasUsers,
    searchKelasUsers
  }
})
