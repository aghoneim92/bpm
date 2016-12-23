module.exports.install = ({
  babelRC, plugins, presets,
}) => {
  plugins.forEach(
    plugin => {
      if (!babelRC.plugins.includes(plugin)) {
        babelRC.plugins = babelRC.plugins.concat([ plugin ])
        console.log(`Added plugins ${plugins.concat(' ')} to .babelrc`)
      }
    }
  )
  presets.forEach(
    preset => {
      if (!babelRC.presets.includes(preset)) {
        babelRC.presets = babelRC.presets.concat([ preset ])
        console.log(`Added presets ${presets.concat(' ')} to .babelrc`)
      }
    }
  )
}
