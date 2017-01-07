const gulp = require('gulp')
const child_process = require('child_process')
const { version } = require('./package.json')
const { readFileSync } = require('fs')

const {
  env: {
    TRAVIS_BRANCH,
    TRAVIS_BUILD_ID: BUILD_ID,
    TRAVIS_PULL_REQUEST_BRANCH,
  },
} = process

const BRANCH = TRAVIS_PULL_REQUEST_BRANCH || TRAVIS_BRANCH

const commands = [{
  cmd: 'istanbul cover _mocha -- lib/__tests__/*.js',
  name: 'coverage',
}, {
  cmd: 'cat coverage/lcov.info | coveralls',
  deps: ['coverage'],
  name: 'publish-coverage',
}, {
  cmd: 'jsdoc lib/* --destination jsdoc',
  name: 'jsdoc',
}, {
  cmd: BRANCH === 'master' ?
          `git commit -m "added jsdoc and coverage report to docs
- Travis Build [#${BUILD_ID}](https://travis-ci.org/aghoneim92/bpm/builds/${BUILD_ID})" && git push deploy gh-pages --force`
        : '',
  name: 'git-push',
}, {
  cmd: 'npm view babel-package-manager version > ./version',
  name: 'npm-version',
}, {
  cmd: cb => {
    if (BRANCH === 'master') {
      const npmVersion = Number(readFileSync('./version').toString().trim())
      if (version > npmVersion) {
        execCmd({
          name: 'npm-publish',
          cmd: 'npm publish',
        })(cb)
      }
    }
  },
  name: 'npm-publish',
  deps: ['npm-version'],
}, {
  name: 'bump-version',
  cmd: 'lib/bump-version.sh',
}]

const standardCb = (name, cb) =>
  err => {
    if (err != null) {
      cb(err)
    } else {
      console.log(`ran ${name} successfully`)
      cb()
    }
  }

const execCmd = ({ cmd, name }) =>
  cb =>
    typeof cmd === 'function' ?
      cmd(cb)
    : child_process.exec(
        cmd,
        standardCb(name, cb)
      )

const makeTask = ({ cmd, deps, name }) =>
  gulp.task(
    name, deps, execCmd({ cmd, name })
  )

commands.forEach(makeTask)
