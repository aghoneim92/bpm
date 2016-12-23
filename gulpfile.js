const gulp = require('gulp')
const child_process = require('child_process')

const {
  env: {
    TRAVIS_BRANCH,
    TRAVIS_BUILD_ID,
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
          `git checkout master && git commit -m "added jsdoc and coverage - Travis Build#${TRAVIS_BUILD_ID}" && git push deploy master`
        : '',
  name: 'git-push',
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

commands.forEach(
  ({ cmd, deps, name }) => gulp.task(
    name, deps, cb => child_process.exec(
      cmd,
      standardCb(name, cb)
    )
  )
)
