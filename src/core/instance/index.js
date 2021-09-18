import { initMixin } from './init'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle'

function Vue (options) {
  if (/*process.env.NODE_ENV !== 'production' && */ !(this instanceof Vue)) {
    console.error('请不要把我当成普通函数调用！');
  }
  // 执行初始化
  this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue