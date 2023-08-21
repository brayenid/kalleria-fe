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
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-swiper', '@nuxt/image', 'nuxt-gtag'],
  css: ['~/assets/css/main.css', '@vuepic/vue-datepicker/dist/main.css'],
  pinia: {
    autoImports: ['defineStore']
  },
  gtag: {
    id: 'G-Z7WS4FK725'
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  ssr: true,
  routeRules: {
    '/sudo/**': {
      ssr: false
    },
    '/admin/**': {
      ssr: false
    },
    '/dashboard/**': {
      ssr: false
    },
    '/print/**': {
      ssr: false
    },
    '/sertifikat/**': {
      ssr: false
    }
  },
  runtimeConfig: {
    public: {
      beEndpoint: process.env.BE_ENDPOINT,
      feEndpoint: process.env.FE_ENDPOINT,
      ogImage: process.env.OG_IMAGE,
      ogDesc: process.env.OG_DESC
    }
  }
})
