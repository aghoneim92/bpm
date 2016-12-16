#! /usr/bin/env node
const { exec } = require('child_process')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const pkg = require('../package.json')
const updateNotifier = require('update-notifier')
const program = require('commander')
const PrettyError = require('pretty-error')
const { identity, toPairs, without } = require('ramda')
const colors = require('colors')
const { bgBlue } = require('chalk')

const {
  description,
  name,
  version,
} = pkg

updateNotifier({pkg}).notify()

const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'plugins', type: String, multiple: true },
  { name: 'presets', type: String, multiple: true },
  { name: 'plugins-transform', type: String, multiple: true },
  { name: 'plugins-syntax', type: String, multiple: true },
]

const pe = new PrettyError()

const {
  env: {
    BABEL_RC = './.babelrc',
  },
} = process

const install = ({
  babelRC, plugin, preset,
}) => {
  const toCheckIn = plugin ? 'plugins' : 'presets'
  const toCheckFor = plugin || preset
  if (!babelRC[toCheckIn].includes(toCheckFor)) {
    babelRC[toCheckIn] = babelRC[toCheckIn].concat([ toCheckFor ])
    console.log(`Added ${toCheckIn.replace(/s$/, '')} ${
      toCheckFor
    } to .babelrc`)
  }
}

const uninstall = ({
  babelRC, plugin, preset,
}) => {
  const uninstalledType = plugin ? 'plugins' : 'presets'
  const uninstalled = plugin || preset
  babelRC[uninstalledType] = without(
    [ plugin ],
    babelRC[uninstalledType]
  )
  console.log(`Removed ${
    uninstalledType.replace(/s$/, '')
  } ${uninstalled} from .babelrc`)
}

const applyCmd = ({
  cmd, babelRC, plugin, preset,
}) => {
  switch (cmd) {
    case 'install':
    case 'i':
      install({ babelRC, plugin, preset })
      break
    case 'uninstall':
    case 'un':
      uninstall({ babelRC, plugin, preset })
      break
    case 'update':
      console.log(`Updated plugin ${plugin} in package.json`)
      break
  }
}

const apply = ({
  cmd, babelRC,
}) => ({
  plugin, preset,
}) => applyCmd({ cmd, babelRC, plugin, preset })

const props = [
  'presets', 'plugins', 'plugins-transform', 'plugins-syntax',
]

const modulePrefix = {
  presets: 'preset',
  plugins: 'plugin',
  'plugins-transform': 'plugin-transform',
  'plugins-syntax': 'plugin-syntax',
}

const getAll = program => toPairs(program).map(
    ([key, value]) => props.includes(key) ? ({
      key,
      value,
    }) : false
  ).filter(identity).map(({
    key: moduleType,
    value: moduleNames,
  }) =>
    moduleNames.map(
      moduleName => `babel-${modulePrefix[moduleType]}-${moduleName}`
    ).join(' ')
  ).join(' ')

program
  .usage(`
    ${name} - ${version}
    ${description}
    <command> --presets [presets] --plugins [plugins] --plugins-transform [plugins-transform] --plugins-syntax [plugins-syntax]
  `)
if (process.argv.length <= 2) {
  program.outputHelp(colors.yellow)
} else {
  const cmd = process.argv[2]
  const args = commandLineArgs(optionDefinitions)
  const all = getAll(args)
  const allAsObj = all.split(' ').map(
    module => module.replace('babel-', '')
  ).map(
    module => module.includes('preset') ? ({
      preset: module,
    }) : ({
      plugin: module,
    })
  )
  if (all.length) {
    const npmCmd = `npm ${cmd} -D -E ${all}`
    console.log(`running ${npmCmd}...`)
    exec(
      npmCmd,
      (err, stdout, stderr) => {
        if (err) {
          console.error(pe.render(err))
        } else {
          console.log(bgBlue(stdout))
          console.error(stderr)

          console.log(`Successfully ran ${npmCmd}`)

          console.log(`Checking for ${BABEL_RC}`)
          if (existsSync(BABEL_RC)) {
            const babelRC = JSON.parse(readFileSync(BABEL_RC))
            babelRC.plugins = babelRC.plugins || []
            babelRC.presets = babelRC.presets || []
            allAsObj.forEach(
              apply({ cmd, babelRC })
            )
            console.log('Writing new .babelrc')
            writeFileSync(BABEL_RC, JSON.stringify(babelRC))
          } else {
            console.log(
              `No babelRC found.
              Optionally set the BABEL_RC environment variable to the location of .babelrc`
            )
          }
        }
      }
    )
  } else {
    console.log(
      `No plugins/presets specified.
      Please provide some with --plugins or --presets. Run --help to get more info.`
    )
  }
}
