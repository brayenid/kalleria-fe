export const useUsersStore = defineStore('usersStore', () => {
  const pageNumberUsers: Ref<number> = ref(1)
  const searchUser: Ref<string> = ref('')

  return {
    pageNumberUsers,
    searchUser
  }
})
