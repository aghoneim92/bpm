#!/usr/bin/env node

const pkg = require('../package.json')
const { writeFileSync } = require('fs')

writeFileSync(
  './package.json',
  JSON.stringify(
    Object.assign(
      {},
      pkg,
      {
        version: process.argv[1],
      }
    )
  )
)
