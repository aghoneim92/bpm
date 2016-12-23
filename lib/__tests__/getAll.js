import getAll, { argNames } from '../getAll'
import R, { range, dissoc } from 'ramda'
import { generate } from 'randomstring'
import { expect } from 'chai'
import { spy } from 'sinon'
import schedule from '../schedule'
import parallel from 'mocha.parallel'

const MAX_VALUES = 10
const MAX_VALUE_LENGTH = 4

const argNamesToArgs = argNames => argNames.map(
  prop => ({
    [prop]: range(1, ~~(Math.random() * MAX_VALUES)).map(
      () => generate(MAX_VALUE_LENGTH)
    ),
  })
).reduce(
  (a, b) => Object.assign({}, a, b),
  {}
)
const args = argNamesToArgs(argNames)
const getMissingArgs = () => dissoc(
  'plugins-syntax',
  args,
)
const missingArgs = getMissingArgs()

parallel('getAll', () => {
  it('converts the args object to entries',
    schedule(
      () => {
        const toPairsSpy = spy(R, 'toPairs')
        getAll(args)
        expect(toPairsSpy).to.have.been.called
        R.toPairs.restore()
      }
    )
  )

  it('ignores missing or empty args', schedule(
    () => {
      spy(R, 'identity')
      const all = getAll(missingArgs)
      argNames.forEach(
        _argName => {
          const findResult = all.find(({ argName }) => argName === _argName)
          const arg = missingArgs[_argName]
          if (arg && arg.length) {
            expect(findResult).to.exist
            expect(R.identity).to.have.been.calledWithMatch(findResult)
          } else {
            expect(findResult).to.not.exist
          }
        }
      )
      R.identity.restore()
    }
  ))
})
