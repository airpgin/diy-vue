import Watcher from '../observer/watcher'
import { noop } from '../util/index'

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydratig) {
    console.log('_updata 的作用是将 虚拟DOM 转换为 真实DOM');
  }
}

export function mountComponent (vm, el, hydrating) {
  vm.$el = el

  let updateComponent
  updateComponent = () => {
    // _render 的作用是 生成 虚拟DOM
    // _update 的作用是 将虚拟DOM 转换为 真实DOM
    vm._update(vm._render(), hydrating)
  }

  // updateComponent()

  new Watcher(vm, updateComponent, noop, {}, true)

  return vm
}