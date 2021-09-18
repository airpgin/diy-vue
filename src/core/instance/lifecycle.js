import Watcher from '../observer/watcher'
import { noop } from '../util/index'

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    console.log('_updata 的作用是将 虚拟DOM 转换为 真实DOM');
    console.log(vnode);
    console.log(hydrating);
    const vm = this
    const prevNode = vm._node
    if (!prevNode) {
      // 第一次挂载
      vm.__patch__(vm.$el, vnode, hydrating, false)
    } else {
      // 之后进行更新
    }
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

  updateComponent()


  new Watcher(vm, updateComponent, noop, {}, true)

  return vm
}