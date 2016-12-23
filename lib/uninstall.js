const { without } = require('ramda')

module.exports.uninstall = ({
  babelRC, plugins, presets,
}) => {
  if (plugins) {
    babelRC.plugins = without(plugins, babelRC.plugins)
  }
  if (presets) {
    babelRC.presets = without(presets, babelRC.presets)
  }
}
