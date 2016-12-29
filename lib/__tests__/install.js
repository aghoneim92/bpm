const { default: install } = require('../install')
const { stub } = require('sinon')
const { expect } = require('chai')

describe('install', () => {
  const babelRC = {
    plugins: ['transform-class-properties'],
    presets: ['latest'],
  }
  const plugins = ['transform-flow-strip-types']
  const presets = ['stage-0', 'react']

  it('adds plugins/presets to .babelrc if they don\'t exist', () => {
    const logStub = stub(console, 'log')

    try {
      install({
        babelRC,
        plugins,
        presets,
      })
      expect(babelRC.plugins).to.include.members(plugins)
      expect(babelRC.presets).to.include.members(presets)
    } finally {
      logStub.restore()
    }
  })
})
