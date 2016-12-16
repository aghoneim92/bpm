# bpm
Babel Package Manager

Automagically install babel presets/plugins and save to both package.json and .eslintrc
## Usage
```
alias bpm='babel-package-manager'
bpm install --presets latest stage-0 react
bpm i --plugins transform-es2015-modules-umd --presets latest
bpm i --plugins-transform class-properties --pluginx-syntax flow
bpm un --presets es2015 --plugins-syntax flow
```
## License
MIT - See LICENSE.md
## Author
Ahmed Ghoneim <ahmedghoneim92@gmail.com>
