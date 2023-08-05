import jwt_decode from 'jwt-decode'

export const useAuthStore = defineStore('auth', () => {
  const accessToken: Ref<string> = ref('')
  const getAccessToken: ComputedRef<string> = computed(() => `Bearer ${accessToken.value}`)
  const getUserInfo: ComputedRef<null | object> = computed(async () => {
    return accessToken.value ? jwt_decode(accessToken.value) : null
  })

  const isNotifyTransaksi = ref(false)

  return {
    accessToken,
    getAccessToken,
    getUserInfo,
    isNotifyTransaksi
  }
})
