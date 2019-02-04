const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const argv = process.argv
      const mode = argv[argv.indexOf('--project-mode') + 1]
      args[0]['process.env'].MODE = `"${mode}"`
      args[0]['process.env'].BASE_API = '"http://47.94.138.75:8000"'
      return args
    })
  }
}
