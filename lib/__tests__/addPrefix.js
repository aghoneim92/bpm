const parallel = require('mocha.parallel')
const schedule = require('../schedule')
const { expect } = require('chai')
const addPrefix = require('../addPrefix')

const { modulePrefixes } = addPrefix

const moduleNames = ['latest', 'stage-0', 'react']
const argName = 'presets'

parallel('addPrefix', () => {
  expect(
    () => addPrefix()
  ).to.not.throw
  expect(
    () => addPrefix({})
  ).to.not.throw
  const result = addPrefix({
    moduleNames,
    argName,
  }).split(' ')
  it('returns a space-separated string', schedule(
    () => expect(result.length).to.equal(
      moduleNames.length
    )
  ))
  it('adds a prefix to each module name depending on argName', schedule(
    () =>
      expect(
        result.every(
          prefixedName => prefixedName.includes(modulePrefixes[argName])
        )
      ).to.be.true
    )
  )
})
