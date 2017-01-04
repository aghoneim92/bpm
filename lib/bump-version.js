#!/usr/bin/env node

const pkg = require('../package.json')
const { writeFileSync } = require('fs')
const beautify = require('json-beautify')

writeFileSync(
  './package.json',
  beautify(
    Object.assign(
      {},
      pkg,
      {
        version: process.argv[2],
      }
    ),
    null,
    2,
    80
  )
)
