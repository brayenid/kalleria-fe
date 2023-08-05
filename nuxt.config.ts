// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  devServer: {
    port: 5173
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  pages: true,
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  pinia: {
    autoImports: ['defineStore']
  },
  routeRules: {
    '/**': {
      prerender: true
    }
  }
})
