# bpm [![Build Status](https://travis-ci.org/aghoneim92/bpm.svg?branch=master)](https://travis-ci.org/aghoneim92/bpm) [![Coverage Status](https://coveralls.io/repos/github/aghoneim92/bpm/badge.svg?branch=master)](https://coveralls.io/github/aghoneim92/bpm?branch=master) [![DL/M](https://img.shields.io/npm/dm/babel-package-manager.svg)]() [![DL](https://img.shields.io/npm/dt/babel-package-manager.svg)]() [![License](https://img.shields.io/npm/l/babel-package-manager.svg)]() [![Contributors](https://img.shields.io/github/contributors/aghoneim92/bpm.svg)]() [![Dependencies](https://img.shields.io/david/aghoneim92/bpm.svg)]() [![Dev Dependencies](https://img.shields.io/david/dev/aghoneim92/bpm.svg)]() [![Issue Closure](https://img.shields.io/issuestats/i/github/aghoneim92/bpm.svg)]() [![Pull Closure](https://img.shields.io/issuestats/p/github/aghoneim92/bpm.svg)]() [![Code Quality](https://api.codacy.com/project/badge/Grade/b7bcff3bc8b14464ad1fb5dc4b00f08f)](https://www.codacy.com/app/ahmedghoneim92/bpm?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=aghoneim92/bpm&amp;utm_campaign=Badge_Grade)

Babel Package Manager

Automagically install babel presets/plugins and save to both package.json and .eslintrc

## Usage

### CLI
```bash
yarn global add babel-package-manager
-- or --
npm i -g babel-package-manager

alias bpm='babel-package-manager'
bpm install --presets latest stage-0 react
bpm i --plugins transform-es2015-modules-umd --presets latest
bpm i --plugins-transform class-properties --pluginx-syntax flow
bpm un --presets es2015 --plugins-syntax flow
```

###API
> see [jsdoc](https://raw.githubusercontent.com/aghoneim92/bpm/tree/docs/jsdoc/index.html)

```javascript
const bpm = require('babel-package-manager')
bpm({
  args: {
    plugins: ['transform-class-properties'],
    presets: ['latest', 'stage-0', 'react']
  },
  cmd: 'install'
}).then(
  () => console.log('success!')
).catch(
  () => console.log('fail!')
)
```

## License
MIT - See [LICENSE.md](https://github.com/aghoneim92/bpm/blob/master/LICENSE.md)

## Author
Ahmed Ghoneim <ahmedghoneim92@gmail.com>
