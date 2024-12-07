import { createVNode, render, h } from "vue";
import GlobalPopup from "~/components/popups/GlobalPopup.vue";
import { v4 as uuidv4 } from "uuid";
import { useNuxtApp } from "#app"; // 引入 useNuxtApp

const openPopup = function (component: any, data?: any) {
  const id = uuidv4();
  if (process.server) return;

  const nuxtApp = useNuxtApp(); // 获取 Nuxt 应用实例
  const appContext = nuxtApp.vueApp._context; // 获取应用上下文

  const vm = createVNode({
    setup() {
      return () => h(GlobalPopup, { id }, () => h(component, { ...data }));
    },
  });

  if (appContext) {
    vm.appContext = appContext;
  }

  const div = document.createElement("div");
  div.id = id;
  document.body.appendChild(div);
  render(vm, div);
};

export { openPopup };
