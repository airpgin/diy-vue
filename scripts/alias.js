const path = require('path')

// 该函数的作用会拿到上一级目录对应文件的绝对路径
// __dirname 当前文件所在的绝对路径 不包含文件名
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  // web 最后就是对应 'src/platforms/web' 的绝对路径
  web: resolve('src/platforms/web')
}
