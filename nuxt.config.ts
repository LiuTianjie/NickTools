// https://nuxt.com/docs/api/configuration/nuxt-config
import { nickPreset } from "./nickPreset";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "nuxt-monaco-editor",
    "@primevue/nuxt-module",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
  ],
  primevue: {
    options: {
      theme: {
        preset: nickPreset,
        options: {
          darkModeSelector: ".dark",
        },
      },
    },
    autoImport: true,
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
  devServer: {
    port: 5551,
  },
});