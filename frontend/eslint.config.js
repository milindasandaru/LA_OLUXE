module.exports = [
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'public/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'off'
    }
  }
]
