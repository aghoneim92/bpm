const { stub } = require('sinon')
const { expect } = require('chai')

const { default: update } = require('../update')

describe('update', () => it('logs updated modules to the console', () => {
  const logStub = stub(console, 'log')
  const plugins = ['transform-class-properties']
  const presets = ['react', 'stage-0', 'env']
  update({
    plugins,
    presets,
  })
  try {
    expect(logStub.getCall(0).args[0]).to.include(plugins.join(' ')).and.to.include(
      presets.join(' ')
    )
  } finally {
    logStub.restore()
  }
}))
