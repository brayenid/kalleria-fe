export const useElementsStore = defineStore('elements', () => {
  const sidebarDashboardUser = ref<HTMLElement | null>(null)

  return {
    sidebarDashboardUser
  }
})
