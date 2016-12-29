const install = require('./install')
const uninstall = require('./uninstall')
const update = require('./update')

module.exports = ({
   cmd,
   babelRC,
   plugins,
   presets,
 }) => {
  switch (cmd) {
    case 'install':
    case 'i':
      install.default({ babelRC, plugins, presets })
      break
    case 'uninstall':
    case 'un':
      uninstall.default({ babelRC, plugins, presets })
      break
    case 'update':
      update.default({ plugins, presets })
      break
  }
}
