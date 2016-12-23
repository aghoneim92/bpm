import { uninstall } from '../uninstall'
import { expect } from 'chai'

describe('uninstall', () => {
  it('removes plugin/preset from .babelrc', () => {
    const plugins = ['transform-class-properties']
    const babelRC = {
      plugins,
      presets: [],
    }
    uninstall({
      babelRC,
      plugins,
    })
    expect(
      babelRC.plugins
    ).not.to.include.members(plugins)
  })
})
