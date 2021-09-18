export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    console.log('这里就是 Vue 构造函数中 _init 所做的事情');
    if (options && options._isComponent) {
      // 如果是组件
      console.log('是组件');
    } else {
      // 不是组件的情况
      console.log('不是组件');
      vm.$options = options
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}