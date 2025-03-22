import { eslintConfig } from "@eslint/eslintrc";
import next from "eslint-config-next";

export const { configs } = await eslintConfig.config({
  extends: ["next"],
  ignorePatterns: ["node_modules", ".next", "out"],
});

export default [
  ...configs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
    },
  },
];
