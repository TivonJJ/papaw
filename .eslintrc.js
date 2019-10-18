module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
    rules: {
        "no-console": "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        "prettier/prettier": [
            "warn",
            {
                singleQuote: true,
                trailingComma: 'all',
                tabWidth: 4,
                semicolons: true,
                htmlWhitespaceSensitivity: 'strict'
            }
        ]
    },
    parserOptions: {
        parser: "@typescript-eslint/parser"
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            env: {
                jest: true
            }
        }
    ]
};
