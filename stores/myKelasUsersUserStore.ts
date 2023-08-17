export const useKelasUsersStore = defineStore('kelasUsersUser', () => {
  const pageNumberKelasUsers: Ref<number> = ref(1)

  return {
    pageNumberKelasUsers
  }
})
