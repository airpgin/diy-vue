import Vue from './runtime/index'
import { query } from './util/index'


const mount = Vue.prototype.$mount

Vue.prototype.$mount = function (el, hydrating) {
  el = el && query(el)

  const options = this.$options
  if (!options.render) {
    let template = options.template
    if (template) {
      console.log(template);
      if (typeof template === 'string') {
        console.log('template is a string');
        console.log(template);
        if (template.charAt(0) === '#') {
          template = '通过 id 转换为 template'
        }
      } else if (template.nodeType) {
        template = template.outerHTML
        console.log(template);
      } else {
        console.error('您输入的 template 不合法');
      }
    }

    if (template) {
      let render = function () {
        console.log('将 template 转换成 渲染函数');
        return {tag: 'div', content: 'Hello World!'}
      }
      options.render = render
    }
  }

  mount.call(this, el, hydrating)
}
export default Vue