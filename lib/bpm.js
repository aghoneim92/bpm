const getAll = require('./getAll')
const addPrefix = require('./addPrefix')
const classifyModules = require('./classifyModules')
const { execNpm } = require('./execNpm')
const R = require('ramda')
const { default: checkForYarn } = require('./checkForYarn')

const yarnCmd = {
  install: 'add',
  i: 'add',
  uninstall: 'remove',
  un: 'remove',
  update: 'upgrade',
  up: 'upgrade',
}
const yarnArgs = cmd => (cmd === 'install' || cmd === 'i') ? ' -D' : ''

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
    const joined = moduleLists.join(' ')
    return checkForYarn().then(
      yarn => yarn ?
        `yarn ${yarnCmd[cmd]}${yarnArgs(cmd)} ${joined}`
      : `npm ${cmd} -D ${joined}`
    ).then(
      npmCmd => {
        console.log(`running ${npmCmd}...`)
        return execNpm({
          npmCmd,
          cmd,
          plugins,
          presets,
        })
      }
    )
  } else {
    return Promise.reject(
      new Error(
        `No plugins/presets specified.
Please provide some with --plugins or --presets.`
      )
    )
  }
}
