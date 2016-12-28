const R = require('ramda')
const fs = require('fs')

const emptyBabelRC = {
  plugins: [],
  presets: [],
}

module.exports.emptyBabelRC = emptyBabelRC

module.exports.default = path => {
  const { mergeWith, concat } = R
  const { existsSync, readFileSync } = fs

  if (existsSync(path)) {
    return mergeWith(
      concat,
      JSON.parse(readFileSync(path)),
      emptyBabelRC
    )
  } else return emptyBabelRC
}
