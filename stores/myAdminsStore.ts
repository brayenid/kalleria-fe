export const useAdminsStore = defineStore('admins', () => {
  const pageNumberAdmins: Ref<number> = ref(1)
  const searchAdmin: Ref<string> = ref('')
  return {
    pageNumberAdmins,
    searchAdmin
  }
})
