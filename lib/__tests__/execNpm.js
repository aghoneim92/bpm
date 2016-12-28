const { execNpm } = require('../execNpm')

const { expect } = require('chai')
const { spy, stub } = require('sinon')
const R = require('ramda')
const exec = require('../exec')
const fs = require('fs')
const constants = require('../constants')
const updateBabelRC = require('../updateBabelRC')

const { NPM_TIMEOUT } = constants

const makeArgs = cmd => ({
  npmCmd: `npm ${
    cmd
  } -D -E babel-preset-latest babel-plugin-transform-class-properties`,
  cmd,
  presets: ['latest'],
  plugins: ['transform-class-properties'],
})

const doExec = R.compose(execNpm, makeArgs)

const commands = {
  install: 'i',
  uninstall: 'un',
  update: 'up',
}

describe('execNpm', function () {
  this.timeout(NPM_TIMEOUT)

  R.toPairs(commands).forEach(
    ([command, alias]) => {
      it(
        `runs npm ${command}`,
        () => {
          const execSpy = spy(exec, 'exec')
          stub(console, 'log')
          spy(fs, 'existsSync')
          stub(fs, 'writeFileSync')
          spy(updateBabelRC, 'perform')

          return doExec(alias).then(
            () => expect(execSpy.getCall(0).args[0].includes(alias)).to.be.true
          ).finally(
            () => execSpy.restore()
          )
        }
      )
      it(
        'then checks for .babelrc',
        () => {
          expect(fs.existsSync).to.have.been.calledWith(constants.BABEL_RC)
          expect(fs.existsSync.returnValues[0]).to.be.true
          fs.existsSync.restore()
        }
      )

      it(
        'updates .babelrc in memory',
        () => {
          expect(updateBabelRC.perform).to.have.been.called
          updateBabelRC.perform.restore()
        }
      )

      it(
        'writes a new .babelrc',
        () => {
          expect(fs.writeFileSync.getCall(0).args[0]).to.equal(constants.BABEL_RC)
          fs.writeFileSync.restore()
          console.log.restore()
        }
      )
    }
  )
})
