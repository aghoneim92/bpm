const uninstall = require('../uninstall')
const install = require('../install')
const update = require('../update')
const { spy, stub } = require('sinon')
const applyCmd = require('../applyCmd')
const { expect } = require('chai')
const { default: readBabelRC } = require('../readBabelRC')

const {
  env: {
    BABEL_RC = './.babelrc',
  },
} = process

const cmds = [
  {name: 'install', fn: install},
  {name: 'uninstall', fn: uninstall},
  {name: 'update', fn: update},
]

describe('applyCmd', () => {
  const babelRC = readBabelRC(BABEL_RC)
  const plugins = ['transform-class-properties']
  const presets = ['react', 'stage-0', 'env']

  cmds.forEach(
    ({name, fn}) => it(`invokes ${name}`, () => {
      const fnSpy = spy(fn, 'default')
      const logStub = stub(console, 'log')
      const args = {
        cmd: name,
        babelRC,
        plugins,
        presets,
      }
      applyCmd(args)
      try {
        expect(fnSpy).to.have.been.called
        expect(args).to.include(fnSpy.getCall(0).args[0])
      } finally {
        fnSpy.restore()
        logStub.restore()
      }
    })
  )
})
