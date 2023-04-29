module.exports = {
  globals: {
    garoon: "readonly",
  },
  rules: {
    quotes: ["error", "double"],
    "require-atomic-updates": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.spec.ts"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        quotes: ["error", "double"],
        "require-atomic-updates": "off",
        "no-undef": "off",
        "object-curly-spacing": ["error", "always"],
        "@typescript-eslint/no-explicit-any": ["off"],
        indent: "off",
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "parent",
              "sibling",
              "index",
              "object",
              "type",
            ],
            pathGroups: [
              {
                pattern: "{react,react-dom/**,react-router-dom}",
                group: "builtin",
                position: "before",
              },
              {
                pattern: "@src/**",
                group: "parent",
                position: "before",
              },
            ],
            pathGroupsExcludedImportTypes: ["builtin"],
            alphabetize: {
              order: "asc",
            },
            "newlines-between": "always",
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports" },
        ],
      },
    },
  ],
};
