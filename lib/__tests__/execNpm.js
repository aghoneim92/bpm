import { execNpm } from '../execNpm'

import { expect } from 'chai'
import { spy, stub } from 'sinon'
import R from 'ramda'
import exec from '../exec'
import parallel from 'mocha.parallel'
import fs from 'fs'
import constants, { NPM_TIMEOUT } from '../constants'
import updateBabelRC from '../updateBabelRC'

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

parallel('execNpm', function () {
  let serial = Promise.resolve()
  this.timeout(NPM_TIMEOUT)

  R.toPairs(commands).forEach(
    ([command, alias]) => {
      it(
        `runs npm ${command}`,
        () => serial = serial.then(() => {
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
        })
      )
      it(
        'then checks for .babelrc',
        () => serial = serial.then(() => {
          expect(fs.existsSync).to.have.been.calledWith(constants.BABEL_RC)
          expect(fs.existsSync.returnValues[0]).to.be.true
          fs.existsSync.restore()
        })
      )

      it(
        'updates .babelrc in memory',
        () => serial = serial.then(() => {
          expect(updateBabelRC.perform).to.have.been.called
          updateBabelRC.perform.restore()
        })
      )

      it(
        'writes a new .babelrc',
        () => serial = serial.then(() => {
          expect(fs.writeFileSync.getCall(0).args[0]).to.equal(constants.BABEL_RC)
          fs.writeFileSync.restore()
          console.log.restore()
        })
      )
    }
  )
})
