// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  rules: {
    eqeqeq: "error",
    // Funktionsrümpfe sind Übungs-Platzhalter: ungenutzte Parameter sind erlaubt.
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
  },
});
