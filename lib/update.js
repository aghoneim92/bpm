module.exports.default = ({
  plugins,
  presets,
}) =>
  console.log(
    `Updated${
      plugins ?
      ` plugins ${plugins.join(' ')}`
    : ''
    }${
      plugins && presets ?
      ' and'
    : ''
    }${
      presets ?
      ` presets ${presets.join(' ')}`
    : ''
    } in package.json`
  )
