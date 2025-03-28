import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { js, react: pluginReact },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: ["js/recommended", pluginReact.configs.recommended],
  },
]);
