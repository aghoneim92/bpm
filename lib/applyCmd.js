const {install} = require('./install')
const {uninstall} = require('./uninstall')

module.exports = ({
   cmd,
   babelRC,
   plugins,
   presets,
 }) => {
  switch (cmd) {
    case 'install':
    case 'i':
      install({ babelRC, plugins, presets })
      break
    case 'uninstall':
    case 'un':
      uninstall({ babelRC, plugins, presets })
      break
    case 'update':
      console.log(`Updated plugins ${plugins.join(' ')} and presets ${presets.join(' ')} in package.json`)
      break
  }
}
