module.exports = {
  // --------------------------------
  // 呼び出したいルール（パッケージ）
  // --------------------------------
  // ES5 & kintone の場合
  // extends: "@cybozu/eslint-config/presets/kintone-customize-es5",

  // ES6以上 & kintone の場合
  extends: ["@cybozu", "@cybozu/eslint-config/globals/kintone"],

  // node & kintone の場合
  // extends: ["@cybozu/eslint-config/presets/node", "@cybozu/eslint-config/globals/kintone"],

  // --------------------------------
  // グローバル変数の定義
  // --------------------------------
  globals: {
    garoon: "readonly",
  },

  // --------------------------------
  //  ルール
  // --------------------------------
  rules: {
    quotes: ["error", "double"],
    "require-atomic-updates": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
  },

  // --------------------------------
  //  TypeScript用の設定
  // --------------------------------
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.spec.ts"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "prettier",
      ],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        quotes: ["error", "double"],
        "require-atomic-updates": "off",
        "import/no-unresolved": "off",
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
