import { AxiosResponse } from 'axios'
import { useAuthStore } from '~/stores/myAuthStore'
import jwt_decode from 'jwt-decode'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $axios: axios } = useNuxtApp()
  const authStore = useAuthStore()
  const role = useCookie('role')

  if (!authStore.accessToken) {
    return navigateTo('/login')
  }

  const decoded: any = jwt_decode(authStore.accessToken)
  const currentTime = new Date().getTime()
  const isCurrentTokenExpired = decoded.exp * 1000 < currentTime

  if (isCurrentTokenExpired) {
    try {
      const { data }: AxiosResponse<any> = await axios.get(`/auth/${role.value}`, {
        withCredentials: true
      })

      authStore.$patch({ accessToken: data.data.accessToken })
    } catch (error: any) {
      console.log(error.message)
      authStore.$patch({ accessToken: '' })
      return navigateTo('/login')
    }
  }
})
