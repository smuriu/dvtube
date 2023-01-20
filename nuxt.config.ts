// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    deezer: {
      app_secret: process.env.DEEZER_APP_SECRET
    },
    public: {
      deezer: {
        app_id: process.env.DEEZER_APP_ID,
        redirect_uri: process.env.DEEZER_REDIRECT_URI,
        perms: 'basic_access'
      }
    }
  },
  typescript: {
    // for use with vscode volar extension
    shim: false
  },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss'
  ],
  colorMode: {
    preference: 'night',
    dataValue: 'theme',
    classSuffix: ''
  }
})
