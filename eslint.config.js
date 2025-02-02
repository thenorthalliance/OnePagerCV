import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginVue.configs["flat/essential"],
    rules: {
      "vue/multi-word-component-names": "off", // Disables multi-word component name rule
    },
  },
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
];
