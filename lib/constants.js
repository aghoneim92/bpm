const pkg = require('../package.json')

const {
  description,
  name,
  version,
} = pkg
const optionDefinitions = [
  { name: 'plugins', type: String, multiple: true },
  { name: 'presets', type: String, multiple: true },
  { name: 'plugins-transform', type: String, multiple: true },
  { name: 'plugins-syntax', type: String, multiple: true },
  { name: 'help', type: Boolean },
]

const {
  env: {
    BABEL_RC = './.babelrc',
    YARN = 'true', // if available
  },
} = process

const spaceSeparatedList = '[underline]{space-separated list}'

const noBabelRCError = `No .babelrc found.
Optionally set the BABEL_RC environment variable to the location of .babelrc`

const USAGE = [
  {
    header: `${name} - ${version}`,
    content: `[underline]{${description}}`,
  },
  {
    header: 'Commands',
    content: [
      {
        name: 'install',
        typeLabel: '| i',
        description: 'install presets/plugins, add to .babelrc and to package.json',
      },
      {
        name: 'uninstall',
        typeLabel: '| un',
        description: 'uninstall presets/plugins, remove from .babelrc and package.json',
      },
      {
        name: 'upgrade',
        typeLabel: '| up',
        description: 'upgrade presets/plugins, update .babelrc and package.json',
      },
    ],
  },
  {
    header: 'Options',
    optionList: [{
      name: 'presets',
      typeLabel: spaceSeparatedList,
      description: 'Presets to install',
    }, {
      name: 'plugins',
      description: 'Plugins to install',
      typeLabel: spaceSeparatedList,
    }, {
      name: 'plugins-transform',
      description: 'Transform plugins to install',
      typeLabel: spaceSeparatedList,
    }, {
      name: 'plugins-syntax',
      description: 'Syntax plugins to install',
      typeLabel: spaceSeparatedList,
    }, {
      name: 'help | --h',
      description: 'Output this message',
      typeLabel: spaceSeparatedList,
    }],
  }, {
    header: 'Setup',
    content: [
      {
        desc: 'Add the following to your .bashrc/.bash_profile/.zshrc',
        example: 'alias bpm=\'babel-package-manager\'',
      },
    ],
  }, {
    header: 'Examples',
    content: [
      {
        desc: '1. Install some presets',
        example: '$ bpm i --presets latest stage-0 react',
      },
      {
        desc: '2. Install some transform plugins',
        example: '$ bpm install --plugins-transform class-properties',
      },
    ],
  },
]

const NPM_TIMEOUT = 2 * 3600 * 1000

module.exports = {
  BABEL_RC,
  noBabelRCError,
  NPM_TIMEOUT,
  optionDefinitions,
  USAGE,
  YARN,
}
