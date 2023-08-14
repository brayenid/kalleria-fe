import { useAuthStore } from '~/stores/myAuthStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  if (authStore.accessToken) {
    if (to.fullPath === from.fullPath) {
      return navigateTo('/')
    }
    return navigateTo(from.fullPath)
  }
})
