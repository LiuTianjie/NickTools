import presetUno from "@unocss/preset-uno";
import { transformerDirectives, transformerVariantGroup } from "unocss";
import { defineConfig } from "unocss";

export default defineConfig({
  presets: [
    presetUno({
      dark: "class",
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
