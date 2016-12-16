module.exports = {
  extends: 'standard',
  installedESLint: true,
  plugins: [
    'standard',
    'promise',
  ],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
  },
}
