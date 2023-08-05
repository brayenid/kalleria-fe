import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '~/stores/myAuthStore'
import jwt_decode from 'jwt-decode'

export default defineNuxtPlugin(async () => {
  axios.defaults.baseURL = 'http://localhost:3000'
  const authStore = useAuthStore()
  const axiosAuth: AxiosInstance = axios.create()
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
    }
  }

  axiosAuth.interceptors.request.use(async (config: InternalAxiosRequestConfig<any>) => {
    const decoded: any = jwt_decode(authStore.accessToken)
    const currentTime = new Date().getTime()
    const isCurrentTokenExpired = decoded.exp * 1000 < currentTime

    if (isCurrentTokenExpired) {
      try {
        const { data }: AxiosResponse<any> = await axios.get(`/auth/${role.value}`, {
          withCredentials: true
        })

        authStore.$patch({ accessToken: data.data.accessToken })
        config.headers.Authorization = authStore.getAccessToken
      } catch (error) {
        console.log('Session over')
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
