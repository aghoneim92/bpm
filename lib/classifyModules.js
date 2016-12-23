module.exports = moduleLists =>
  moduleLists.map(
    moduleList =>
      moduleList.includes('preset') ? ({
        presets: moduleList.split(' '),
      }) : ({
        plugins: moduleList.split(' '),
      })
  )
