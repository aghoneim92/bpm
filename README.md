# bpm <img src="https://travis-ci.org/aghoneim92/bpm.svg?branch=master"/> [![Coverage Status](https://coveralls.io/repos/github/aghoneim92/bpm/badge.svg?branch=master)](https://coveralls.io/github/aghoneim92/bpm?branch=master)
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
> see [jsdoc](https://raw.githubusercontent.com/aghoneim92/bpm/tree/master/jsdoc/index.html)

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
