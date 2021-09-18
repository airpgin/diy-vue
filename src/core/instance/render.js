import { createElement } from '../vdom/create-element'

export function initRender(vm) {
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
}

export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vm = this

    const { render, _parentVnode } = vm.$options
    console.log(render);

    let vnode
    vnode = render.call(vm._renderProxy, vm.$createElement)
    console.log('-----------');
    console.log('render 中', vnode);

    return vnode
  }
}