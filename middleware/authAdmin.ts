import { AxiosResponse } from 'axios'
import { useAuthStore } from '~/stores/myAuthStore'
import jwt_decode from 'jwt-decode'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $axios: axios, $axiosAuth: axiosAuth } = useNuxtApp()
  const authStore = useAuthStore()
  if (!authStore.accessToken) {
    try {
      const { data }: AxiosResponse<any> = await axios.get('/auth/admin', {
        withCredentials: true
      })

      authStore.$patch({ accessToken: data.data.accessToken })

      return navigateTo(to.fullPath)
    } catch (error) {
      return navigateTo('/login')
    }
  }

  const userRole: any = await authStore?.getUserInfo
  if (userRole?.role !== 'admin') {
    return navigateTo('/')
  }

  const decoded: any = jwt_decode(authStore.accessToken)
  const currentTime = new Date().getTime()
  const isCurrentTokenExpired = decoded.exp * 1000 < currentTime

  if (isCurrentTokenExpired) {
    try {
      const { data }: AxiosResponse<any> = await axios.get('/auth/admin', {
        withCredentials: true
      })

      authStore.$patch({ accessToken: data.data.accessToken })
    } catch (error) {
      return navigateTo('/login')
    }
  }
})
