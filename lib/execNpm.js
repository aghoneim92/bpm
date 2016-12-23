const exec = require('./exec')
const fs = require('fs')
const updateBabelRC = require('./updateBabelRC')

const {
  BABEL_RC,
  noBabelRCError,
} = require('./constants')

const cb = ({
  cmd,
  plugins,
  presets,
}) => () => {
  console.log(`Checking for ${BABEL_RC}`)
  if (fs.existsSync(BABEL_RC)) {
    const babelRC = updateBabelRC.perform({
      cmd,
      plugins,
      presets,
    })
    console.log('Writing new .babelrc')
    fs.writeFileSync(BABEL_RC, JSON.stringify(babelRC))
  } else {
    console.error(noBabelRCError)
  }
}

module.exports.execNpm = ({
  npmCmd,
  cmd,
  plugins,
  presets,
}) =>
  exec.exec(npmCmd).then(
    cb({
      cmd,
      plugins,
      presets,
    })
  )

module.exports.cb = cb
