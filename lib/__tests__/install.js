import { install } from '../install'
import { spy, stub } from 'sinon'
import { expect } from 'chai'

describe('install', () => {
  const babelRC = {
    plugins: ['transform-class-properties'],
    presets: ['latest'],
  }
  const plugins = ['transform-flow-strip-types']
  const presets = ['stage-0', 'react']

  it('checks for plugin/preset in .babelrc', () => {
    const logStub = stub(console, 'log')
    const includesSpy = spy(Array.prototype, 'includes')

    try {
      install({
        babelRC,
        plugins,
        presets,
      })
      plugins.forEach(
        plugin =>
          expect(includesSpy).to.have.been.calledWith(plugin)
      )
      presets.forEach(
        preset =>
          expect(includesSpy).to.have.been.calledWith(preset)
      )
    } finally {
      includesSpy.restore()
      logStub.restore()
    }
  })

  it('adds plugin/preset if it doesn\'t exist', () => {
    expect(babelRC.plugins).to.include.members(plugins)
    expect(babelRC.presets).to.include.members(presets)
  })
})
