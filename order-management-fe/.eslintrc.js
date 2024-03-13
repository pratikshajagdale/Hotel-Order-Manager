module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    // Enforce semicolons at the end of import statements and lines
    'semi': ['error', 'always'],
    // Enforce 4 spaces indentation
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    // Enforce spaces instead of tabs
    'no-tabs': 'error'
  }
}
