const keys = ['plugins', 'presets']

module.exports.default = options => keys.forEach(
  key => {
    const option = options[key]
    const { babelRC } = options
    const filtered = option.filter(
      plugin =>
        !babelRC.plugins.some(
          installedPlugin =>
            plugin === installedPlugin || Array.isArray(plugin) && plugin.includes(installedPlugin)
        )
    )
    babelRC[key] = babelRC[key].concat(filtered)
    console.log(`Added ${key} ${filtered.join(', ')} to .babelrc`)
  }
)
