#! /usr/bin/env node
const pkg = require('../package.json')
const updateNotifier = require('update-notifier')
const colors = require('colors')
const getUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const getAll = require('../lib/getAll')
const classifyModules = require('../lib/classifyModules')
const addPrefix = require('../lib/addPrefix')
const {execNpm} = require('../lib/execNpm')

const {
  optionDefinitions,
  USAGE,
} = require('../lib/constants')

updateNotifier({pkg}).notify()

const outputUsage = () => console.log(colors.yellow(getUsage(USAGE)))

if (process.argv.length <= 2) {
  outputUsage()
} else {
  const cmd = process.argv[2]
  const args = commandLineArgs(optionDefinitions)
  if (args.help) {
    outputUsage()
  } else {
    const all = getAll(args)
    const moduleLists = all.map(addPrefix)
    const {
      plugins,
      presets,
    } = classifyModules(moduleLists).reduce(
      (a, b) => ({
        plugins: (a.plugins || []).concat(b.plugins || []),
        presets: (b.presets || []).concat(b.presets || []),
      }), {}
    )
    if (all.length) {
      const npmCmd = `npm ${cmd} -D ${moduleLists.join(' ')}`

      console.log(`running ${npmCmd}...`)
      execNpm({
        npmCmd,
        cmd,
        plugins,
        presets,
      })
    } else {
      console.log(
        `No plugins/presets specified.
        Please provide some with --plugins or --presets.`
      )
    }
  }
}
