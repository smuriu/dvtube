// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      deezer: {
        app_id: '',
        redirect_uri: '',
        perms: 'basic_access'
      }
    }
  },
  typescript: {
    // for use with vscode volar extension
    shim: false
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
