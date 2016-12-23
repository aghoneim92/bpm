const modulePrefixes = {
  presets: 'preset',
  plugins: 'plugin',
  'plugins-transform': 'plugin-transform',
  'plugins-syntax': 'plugin-syntax',
}

module.exports = ({
  moduleNames = [],
  argName,
} = {
  moduleNames: [],
}) =>
  moduleNames.map(
    moduleName => `babel-${modulePrefixes[argName]}-${moduleName}`
  ).join(' ')

module.exports.modulePrefixes = modulePrefixes
