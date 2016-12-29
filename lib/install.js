const keys = ['plugins', 'presets']

module.exports.default = options => keys.forEach(
  key => {
    const option = options[key]
    const { babelRC } = options
    const filtered = option.filter(
      item =>
        !babelRC[key].some(
          installed =>
            item === installed
         || Array.isArray(installed) && installed.includes(item)
        )
    )
    babelRC[key] = babelRC[key].concat(filtered)
    console.log(`Added ${key} ${filtered.join(', ')} to .babelrc`)
  }
)
