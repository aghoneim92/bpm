const { readFileSync } = require('fs')
const applyCmd = require('./applyCmd')

const {
  BABEL_RC,
} = require('./constants')

module.exports.perform = ({
  cmd,
  plugins,
  presets,
}) => {
  const babelRC = JSON.parse(readFileSync(BABEL_RC))

  babelRC.plugins = babelRC.plugins || []
  babelRC.presets = babelRC.presets || []
  applyCmd({
    cmd,
    babelRC,
    plugins: plugins.map(
      str => str.replace('babel-plugin-', '')
    ),
    presets: presets.map(
      str => str.replace('babel-preset-', '')
    )}
  )

  return babelRC
}
