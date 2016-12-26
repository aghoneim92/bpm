const gulp = require('gulp')
const child_process = require('child_process')

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
- Travis Build [#${BUILD_ID}](https://travis-ci.org/aghoneim92/bpm/builds/${BUILD_ID})" && git push deploy docs --force`
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
