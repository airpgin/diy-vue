export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    let vnode
    vnode = {tag: 'div', content: 'Hello World'}
    console.log('当前 vmode: ', vnode);
    return vnode
  }
}