import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '~/stores/myAuthStore'
import jwt_decode from 'jwt-decode'

export default defineNuxtPlugin(async () => {
  axios.defaults.baseURL = useRuntimeConfig().public.beEndpoint
  const authStore = useAuthStore()
  const axiosAuth: AxiosInstance = axios.create()
  const cancelTokenSource = axios.CancelToken.source()

  const role = useCookie('role')

  // MENDAPATKAN TOKEN PERTAMA
  if (role.value) {
    let headers
    if (process.server) {
      headers = {
        ...useRequestHeaders(['cookie'])
      }
    }

    try {
      const { accessToken }: any = (
        await axios.get(`/auth/${role.value}`, {
          withCredentials: true,
          headers: {
            ...headers
          }
        })
      ).data.data

      authStore.$patch({ accessToken })
    } catch (error) {
      console.log('see you ...')
      await navigateTo('/login')
    }
  }

  axiosAuth.interceptors.request.use(async (config: InternalAxiosRequestConfig<any>) => {
    const decoded: any = jwt_decode(authStore.accessToken)
    const currentTime = new Date().getTime()
    const isCurrentTokenExpired = decoded.exp * 1000 < currentTime

    if (isCurrentTokenExpired) {
      try {
        const { data }: AxiosResponse<any> = await axios.get(`/auth/${role.value}`, {
          withCredentials: true,
          cancelToken: cancelTokenSource.token
        })

        authStore.$patch({ accessToken: data.data.accessToken })
        config.headers.Authorization = authStore.getAccessToken
      } catch (error) {
        cancelTokenSource.cancel('Cancel : Session over')
        authStore.$patch({ accessToken: '' })
        await navigateTo('/login')
      }
    }

    config.headers.Authorization = authStore.getAccessToken
    return config
  })

  return {
    provide: {
      axios,
      axiosAuth
    }
  }
})
