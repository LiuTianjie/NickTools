import { createVNode, render } from "vue";
import GlobalPopup from "~/components/popups/GlobalPopup.vue";
import { v4 as uuidv4 } from "uuid";
import { useNuxtApp } from "#app";

const openPopup = function (component: any, data?: any) {
  const id = uuidv4();
  if (process.server) return;

  const nuxtApp = useNuxtApp();
  const appContext = nuxtApp.vueApp._context;

  const vm = createVNode(GlobalPopup, { id, component, data });

  if (appContext) {
    vm.appContext = appContext;
  }

  const div = document.createElement("div");
  div.id = id;
  document.body.appendChild(div);
  render(vm, div);
};

export { openPopup };
