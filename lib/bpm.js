const getAll = require('./getAll')
const addPrefix = require('./addPrefix')
const classifyModules = require('./classifyModules')
const { execNpm } = require('./execNpm')
const R = require('ramda')

/**
 * bpm - Automagically install/uninstall babel presets/plugins updating
 * both package.json and .babelrc
 *
 * @param  {Object} args arguments
 * @param {Array} args.plugins plugins to install
 * @param  {Array} args.presets presets to install
 * @param {String} cmd npm command name or alias (one of install, i, uninstall, un, update, up)
 *
)
 */
module.exports.bpm = function bpm ({args, cmd}) {
  const moduleLists = getAll(args).map(addPrefix)
  const {
    plugins,
    presets,
  } = classifyModules(moduleLists).reduce(
    R.mergeWith(R.concat), {}
  )
  if (moduleLists.length) {
    const npmCmd = `npm ${cmd} -D ${moduleLists.join(' ')}`

    console.log(`running ${npmCmd}...`)
    return execNpm({
      npmCmd,
      cmd,
      plugins,
      presets,
    })
  } else {
    return Promise.reject(new Error(`No plugins/presets specified.
      Please provide some with --plugins or --presets.`))
  }
}
