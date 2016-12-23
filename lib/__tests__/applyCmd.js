const uninstall = require('../uninstall')
const install = require('../install')
const { spy } = require('sinon')
const parallel = require('mocha.parallel')
const schedule = require('../schedule')
const { expect } = require('chai')
const { readFileSync } = require('fs')

const {
  env: {
    BABEL_RC = './.babelrc',
  },
} = process

parallel('applyCmd', () => {
  const installSpy = spy(install, 'install')
  const uninstallSpy = spy(uninstall, 'uninstall')
  let applyCmd
  before(
    schedule(
      () => {
        applyCmd = require('../applyCmd')
      }
    )
  )

  const cmd = 'install'
  const babelRC = JSON.parse(readFileSync(BABEL_RC))
  const plugins = ['transform-class-properties']

  after(
    schedule(
      () => {
        installSpy.restore()
        uninstallSpy.restore()
      }
    )
  )
})
