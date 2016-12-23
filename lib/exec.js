const childProcess = require('child_process')
const chalk = require('chalk')
const PrettyError = require('pretty-error')
const R = require('ramda')
const Promise = require('bluebird')

const getPe = R.once(
  () => R.construct(PrettyError)()
)

const cb = (resolve, reject, cmd) => (err, stdout, stderr) => {
  if (err) {
    console.error(getPe().render(err))
    reject(err)
  } else {
    console.log(chalk.bgBlue(stdout))
    if (stderr && stderr.length) {
      console.error(stderr)
    }

    console.log(`Successfully ran ${cmd}`)
    resolve(stdout)
  }
}
module.exports.exec = cmd => new Promise(
  (resolve, reject) => childProcess.exec(cmd, cb(resolve, reject, cmd))
)
module.exports.cb = cb
