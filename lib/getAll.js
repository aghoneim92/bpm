const R = require('ramda')

const argNames = [
  'presets', 'plugins', 'plugins-transform', 'plugins-syntax',
]

module.exports = args => {
  const { identity, toPairs } = R
  return toPairs(args).map(
    ([key, value]) => argNames.includes(key) && value && value.length && ({
      moduleNames: value,
      argName: key,
    })
  ).filter(identity)
}

module.exports.argNames = argNames
