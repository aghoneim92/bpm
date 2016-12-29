const checkForYarn = require('../checkForYarn')
const { expect } = require('chai')
const { spy, stub } = require('sinon')
const child_process = require('child_process')
const constants = require('../constants')

describe('checkForYarn', () => {
  it('rejects if env YARN is not set to \'true\'', () => {
    const logStub = stub(console, 'log')
    constants.YARN = 'false'
    return checkForYarn.default().then(
      yarn => expect(yarn).to.be.false
    ).finally(
      () => logStub.restore()
    )
  })

  const cmd = 'yarn --version'

  it(`otherwise executes ${cmd}`, () => {
    const logStub = stub(console, 'log')
    const execSpy = spy(child_process, 'exec')
    const cbStub = stub(checkForYarn.cb, 'cb', (resolve, reject) =>
      spy(err => err ? reject(err) : resolve())
    )
    constants.YARN = 'true'
    return checkForYarn.default().then(
      yarn => {
        expect(execSpy).to.have.been.called
        expect(execSpy.getCall(0).args[0]).to.equal(cmd)
        expect(cbStub).to.have.been.called
        const [cbSpy] = cbStub.returnValues
        expect(cbSpy).to.have.been.called
        const {args: [err]} = cbSpy.getCall(0)
        expect(yarn).to.equal(!err)
      }
    ).finally(
      () => {
        logStub.restore()
        execSpy.restore()
        cbStub.restore()
      }
    )
  })
})
