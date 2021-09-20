export function createElement (tagName, vnode) {
  const ele = document.createElement(tagName)
  return ele
}

export function appendChild (node, child) {
  node.appendChild(child)
}

export function parentNode (node) {
  console.log(node);
  return node.parentNode
}

export function tagName (node) {
  return node.tagName
}