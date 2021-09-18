const path = require('path')
const aliases = require('./alias')

const resolve = p => {
  // base 是第一个文件夹
  // 如果路径 p 是 'web/entry-runtime-with-compiler.js' base 就是 web
  const base = p.split('/')[0]
  // 查看 aliases 中是否有 web 选项
  if (aliases[base]) {
    // 第二个参数返回的是 splice 方法 从 路径p 后面的斜杠后开始切割 所以是 'entry-runtime-with-compiler.js'
    // 所以最后返回的就是 入口文件的绝对路径
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

function genConfig (name) {
  // name 是 web 之类的东西
  // 所以 opts 是 web 对应的配置对象
  const opts = builds[name]
  console.log(opts);
  const config = {
    // 入口文件的绝对路径
    input: opts.entry,
    output: {
      // 最后打包输出生成的文件绝对路径
      file: opts.dest,
      format: opts.format,
      name: 'Vue'
    }
  }
  return config
}

const builds = {
  'web-full-dev': {
    // entry 最后会是入口文件的绝对路径
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
  }
}
exports.getAllBuilds = () => Object.keys(builds).map(genConfig)

console.log(builds['web-full-dev'].entry);