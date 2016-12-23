import uninstall from '../uninstall'
import install from '../install'
import { spy } from 'sinon'
import parallel from 'mocha.parallel'
import schedule from '../schedule'
import { expect } from 'chai'
import { readFileSync } from 'fs'

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
