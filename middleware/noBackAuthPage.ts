import { useAuthStore } from '~/stores/myAuthStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  if (authStore.accessToken) {
    if (to.fullPath === from.fullPath) {
      await navigateTo('/')
    }
    await navigateTo(from.fullPath)
  }
})
