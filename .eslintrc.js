module.exports = {
  extends: 'standard',
  installedESLint: true,
  env: {
    node: true,
    mocha: true
  },
  plugins: [
    'standard',
    'promise',
  ],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-return-assign': 0,
    'operator-linebreak': 0,
    'no-extend-native': 0,
  },
}
