const { default: readBabelRC, emptyBabelRC } = require('../readBabelRC')
const { BABEL_RC } = require('../constants')
const fs = require('fs')
const { spy } = require('sinon')
const { expect } = require('chai')
const parallel = require('mocha.parallel')
const R = require('ramda')

parallel('readBabelRC', () => {
  it('checks for file at provided path', () => {
    const existsSpy = spy(fs, 'existsSync')
    readBabelRC(BABEL_RC)
    try {
      expect(existsSpy).to.have.been.calledWith(BABEL_RC)
    } finally {
      existsSpy.restore()
    }
  })

  if (fs.existsSync(BABEL_RC)) {
    it('merges babelRC contents with an empty one', () => {
      const mergeSpy = spy(R, 'mergeWith')
      readBabelRC(BABEL_RC)
      try {
        expect(mergeSpy).to.have.been.calledWithMatch(
          R.concat,
          JSON.parse(fs.readFileSync(BABEL_RC)),
          emptyBabelRC
        )
      } finally {
        mergeSpy.restore()
      }
    })
  }

  it('otherwise returns an empty babelRC', () =>
    expect(readBabelRC('')).to.deep.equal(emptyBabelRC)
  )
})
