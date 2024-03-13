module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard',
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
  rules: {
    // Enforce semicolons at the end of import statements and lines
    'semi': ['error', 'always'],
    // Enforce 4 spaces indentation
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    // Enforce spaces instead of tabs
    'no-tabs': 'error'
  }
}
