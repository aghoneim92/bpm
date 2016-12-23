#! /usr/bin/env node
const pkg = require('../package.json')
const updateNotifier = require('update-notifier')
const colors = require('colors')
const getUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const {bpm} = require('../lib/bpm')
const PrettyError = require('pretty-error')

const pe = new PrettyError()

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
    bpm({args, cmd}).catch(
      e => console.error(pe.render(e))
    )
  }
}
