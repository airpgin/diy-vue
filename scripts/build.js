const rollup = require('rollup')
const fs = require('fs')
// 拿到所有的配置对象所组成的数组
let builds = require('./config').getAllBuilds()

console.log(builds);

build(builds)

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }
  next()
}

function buildEntry (config) {
  const output = config.output
  const { file, banner } = output
  const isProd = /(min|prod)\.js$/.test(file)
  return rollup.rollup(config)
    .then(bundle => {
      /* 这里是 rollup.rollup(config) 所返回的 bundle 对象
      {
  cache: { modules: [ [Object] ], plugins: [Object: null prototype] {} },
  close: [AsyncFunction: close],
  closed: false,
  generate: [AsyncFunction: generate],
  watchFiles: [
    '/Users/p103000/Learn/diy-vue/src/platforms/web/entry-runtime-with-compiler.js'
  ],
  write: [AsyncFunction: write]
}
       */
      return bundle.generate(output)
    })
    .then(({ output: [{ code }] }) => {
      // code 就是所有打包之后的代码文本
      /* 下面就是 bundle.generate(output) 返回的对象
      {
  output: [
    {
      exports: [],
      facadeModuleId: '/Users/p103000/Learn/diy-vue/src/platforms/web/entry-runtime-with-compiler.js',
      isDynamicEntry: false,
      isEntry: true,
      isImplicitEntry: false,
      modules: [Object: null prototype],
      name: [Getter],
      type: 'chunk',
      code: '(function (factory) {\n' +
        "\ttypeof define === 'function' && define.amd ? define(factory) :\n" +
        '\tfactory();\n' +
        "}((function () { 'use strict';\n" +
        '\n' +
        '\n' +
        '\n' +
        '})));\n',
      dynamicImports: [],
      fileName: 'vue.js',
      implicitlyLoadedBefore: [],
      importedBindings: {},
      imports: [],
      map: null,
      referencedFiles: []
    }
  ]
}
      */
      // { output: [{ code }] }
      return write(file, code)

    })
}

function write (dest, code, zip) {
  return new Promise((resolve, reject) => {

    function report (extra) {
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      report()
    })
  })
}

function logError (e) {
  console.log(e)
}