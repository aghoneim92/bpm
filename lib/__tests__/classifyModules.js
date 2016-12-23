const { expect } = require('chai')
const parallel = require('mocha.parallel')

const classifyModules = require('../classifyModules')
const schedule = require('../schedule')

const moduleLists = [
  'babel-preset-react babel-preset-latest babel-preset-stage-0',
  'babel-plugin-transform-class-properties',
]

parallel('classifyModules', () => {
  it('classifies each module as preset or plugin', schedule(
    () => {
      const result = classifyModules(moduleLists)

      moduleLists.forEach(
        (moduleList, index) =>
        moduleList.includes('preset') ?
        expect(result[index].presets).to.deep.equal(moduleList.split(' '))
      : expect(result[index].plugins).to.deep.equal(moduleList.split(' '))
      )
    }
  ))
})
