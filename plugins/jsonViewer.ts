import JsonViewer from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";
export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;
  app.use(JsonViewer);
});
