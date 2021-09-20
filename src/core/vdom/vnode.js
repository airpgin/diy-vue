export default class VNode {
  constructor(tag, data, children, text, ele, context, componentOptions, asyncFactory) {
    this.tag = tag
    this.data = data
    
    this.ele = ele
    this.children = children
    this.context = context
  }
}