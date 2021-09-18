import VNode from './vnode'

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

export function createElement (context, tag, data, children, normalizationType, alwaysNormalize) {
  console.log('createElement 函数执行了');
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (context, tag, data, children, normalizationType) {
  if (normalizationType === ALWAYS_NORMALIZE) {
    //
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    //
  }

  let vnode, ns

  if (typeof tag === 'string') {
    // TODO
    vnode = new VNode(tag, data, children, undefined, undefined, context)
    return vnode
  }
}