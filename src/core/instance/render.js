export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vm = this

    const { render, _parentVnode } = vm.$options

    let vnode
    vnode = render.call(vm._renderProxy, vm.$createElement)
    console.log('render 中', vnode);

    return vnode
  }
}