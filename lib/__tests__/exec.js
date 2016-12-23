const { expect } = require('chai')
const { spy, stub } = require('sinon')
const childProcess = require('child_process')
const R = require('ramda')
const exec = require('../exec')
const _chalk = require('chalk')
const Promise = require('bluebird')

const chalk = {
  bgBlue: _chalk.bgBlue.bind(_chalk),
}

describe('exec', () => {
  const cmd = 'ls'

  it('execs the specified cmd',
    () => {
      const execSpy = spy(childProcess, 'exec')
      const logStub = stub(console, 'log')

      return exec.exec(cmd).then(
        () => expect(execSpy.getCall(0).args[0]).to.equal(cmd)
      ).finally(
        () => {
          execSpy.restore()
          logStub.restore()
        }
      )
    }
  )

  let serial = Promise.resolve()

  it('outputs a pretty error',
    () => serial = serial.then(() => {
      let retSpy
      const cbStub = stub(exec, 'cb', (resolve, reject, cmd) =>
        retSpy = spy(args => exec.cb(resolve, reject, cmd)(...args))
      )
      const pe = ({ render: () => null })
      const constructStub = stub(R, 'construct', () => () => pe)
      const errStub = stub(console, 'error')
      const renderSpy = spy(pe, 'render')

      return exec.exec('asfdfasf').then(
        () => {
          expect(cbStub).to.have.been.called
          const [cbRet] = retSpy.returnValues
          const [[{args: {err}}]] = cbRet.calls
          expect(pe.render).to.have.been.calledWith(err)
          expect(errStub).to.have.been.calledWith(pe.render(err))
        }
      ).catch(
        () => null
      ).finally(
        () => {
          cbStub.restore()
          constructStub.restore()
          errStub.restore()
          renderSpy.restore()
        }
      )
    })
  )

  it('outputs stdout in a blue background',
    () => serial = serial.then(() => {
      let retSpy
      const blueSpy = spy(chalk, 'bgBlue')
      const cbStub = stub(exec, 'cb', (resolve, reject, cmd) =>
        retSpy = spy(args => exec.cb(resolve, reject, cmd)(...args))
      )
      const logStub = stub(console, 'log')

      return exec.exec(cmd).then(
        () => {
          expect(cbStub).to.have.been.called
          const [cbRet] = retSpy.returnValues
          const [[{args: {stdout}}]] = cbRet.calls
          expect(blueSpy).to.have.been.calledWith(stdout)
          expect(logStub).to.have.been.calledWith(chalk.bgBlue(stdout))
        }
      ).catch(
        () => null
      ).finally(
        () => {
          blueSpy.restore()
          cbStub.restore()
        }
      )
    })
  )

  it('outputs stderr',
    () => serial = serial.then(() => {
      let retSpy
      const cbStub = stub(exec, 'cb', (resolve, reject, cmd) =>
        retSpy = spy(args => exec.cb(resolve, reject, cmd)(...args))
      )
      const errStub = stub(console, 'error')

      return exec.exec(cmd).then(
        () => {
          expect(cbStub).to.have.been.called
          const [cbRet] = retSpy.returnValues
          const [[{args: {stderr}}]] = cbRet.calls
          if (stderr && stderr.length) {
            expect(errStub).to.have.been.calledWithMatch(stderr)
          }
        }
      ).catch(
        () => null
      ).finally(
        () => {
          console.log.restore()
          errStub.restore()
          cbStub.restore()
        }
      )
    })
  )
})
