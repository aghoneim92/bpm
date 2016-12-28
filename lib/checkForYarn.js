const child_process = require('child_process')
const constants = require('./constants')
const Promise = require('bluebird')

const cb = {
  cb: (resolve, reject) => err => err ? reject(err) : resolve(),
}

module.exports.default = () => new Promise(
  (resolve, reject) => {
    if (constants.YARN !== 'true') {
      reject()
    } else {
      console.log('Checking for Yarn...')
      child_process.exec('yarn --version', cb.cb(resolve, reject))
    }
  }
).then(
  () => {
    console.log('Yarn found!')
    return true
  }
).catch(
  () => {
    console.log('Yarn not found!')
    return false
  }
)
module.exports.cb = cb
