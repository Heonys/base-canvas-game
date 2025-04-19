import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "*.config.js"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierPlugin,
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {},
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": "warn",
    },
  },
);
