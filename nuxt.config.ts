// https://nuxt.com/docs/api/configuration/nuxt-config
import { nickPreset } from './nickPreset';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "nuxt-monaco-editor",
    "@primevue/nuxt-module",
  ],
  primevue: {
    options: {
        theme: {
            preset: nickPreset,
        },
    },
    autoImport: true
},
  devServer: {
    port: 5551,
  },
});