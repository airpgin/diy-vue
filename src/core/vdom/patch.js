import { isUndef, isDef } from '../util/index'
import VNode from './vnode'

export function createPatchFunction (backend) {

  const { modules, nodeOps } = backend

  function createEle (vnode, parentEle) {
    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    console.log(tag);
    if (isDef(tag)) {
      vnode.ele = nodeOps.createElement(tag, vnode)
      insert(parentEle, vnode.ele)
    }
  }

  function insert (parent, ele, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {

      } else {
        nodeOps.appendChild(parent, ele)
      }
    }
  }

  function emptyNodeAt(ele) {
    return new VNode(nodeOps.tagName(ele).toLowerCase(), {}, [], undefined, ele)
  }


  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(oldVnode)) {
      console.log('没有老 vnode')
    } else {
      const isRealElement = isDef(oldVnode.nodeType)
      if (isRealElement) {
        oldVnode = emptyNodeAt(oldVnode)
      }
      const oldEle = oldVnode.ele
      const parentEle = nodeOps.parentNode(oldEle)
      console.log(parentEle, '---');
      createEle(vnode, parentEle)
    }
  }
}