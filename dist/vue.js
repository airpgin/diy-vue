(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  let initProxy;

  initProxy = function initProxy (vm) {
    vm._renderProxy = vm;
  };

  class VNode {
    constructor(tag, data, children, text, ele, context, componentOptions, asyncFactory) {
      this.tag = tag;
      this.data = data;
      
      this.ele = ele;
      this.children = children;
      this.context = context;
    }
  }

  function createElement$1 (context, tag, data, children, normalizationType, alwaysNormalize) {
    console.log('createElement 函数执行了');
    return _createElement(context, tag, data, children)
  }

  function _createElement (context, tag, data, children, normalizationType) {

    let vnode;

    if (typeof tag === 'string') {
      // TODO
      vnode = new VNode(tag, data, children, undefined, undefined, context);
      return vnode
    }
  }

  function initRender(vm) {
    vm.$createElement = (a, b, c, d) => createElement$1(vm, a, b, c);
  }

  function renderMixin(Vue) {
    Vue.prototype._render = function () {
      const vm = this;

      const { render, _parentVnode } = vm.$options;

      let vnode;
      vnode = render.call(vm._renderProxy, vm.$createElement);

      return vnode
    };
  }

  function initMixin (Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      console.log('这里就是 Vue 构造函数中 _init 所做的事情');
      if (options && options._isComponent) {
        // 如果是组件
        console.log('是组件');
      } else {
        // 不是组件的情况
        console.log('不是组件');
        vm.$options = options;
      }

      initProxy(vm);
      initRender(vm);

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  class Watcher {
    constructor(vm, expOrFn, cb, options, isRenderWatcher) {
      console.log('Watcher的构造函数执行了');
    }
  }

  function noop (a, b, c) { }

  function isUndef (v) {
    return v === undefined || v === null
  }

  function isDef (v) {
    return v !== undefined && v !== null
  }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      console.log('_updata 的作用是将 虚拟DOM 转换为 真实DOM');
      console.log(vnode);
      console.log(hydrating);
      const vm = this;
      const prevNode = vm._node;
      if (!prevNode) {
        // 第一次挂载
        vm.__patch__(vm.$el, vnode, hydrating, false);
      }
    };
  }

  function mountComponent (vm, el, hydrating) {
    vm.$el = el;

    let updateComponent;
    updateComponent = () => {
      // _render 的作用是 生成 虚拟DOM
      // _update 的作用是 将虚拟DOM 转换为 真实DOM
      vm._update(vm._render(), hydrating);
    };

    updateComponent();


    new Watcher(vm, updateComponent, noop, {}, true);

    return vm
  }

  function Vue (options) {
    if (/*process.env.NODE_ENV !== 'production' && */ !(this instanceof Vue)) {
      console.error('请不要把我当成普通函数调用！');
    }
    // 执行初始化
    this._init(options);
  }

  initMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue);

  function query (el) {
    if (typeof el === 'string') {
      const dom = document.querySelector(el);
      if (!dom) {
        console.log('没有找到 ' + el);
      }
      return dom
    } else {
      return el
    }
  }

  function createElement (tagName, vnode) {
    const ele = document.createElement(tagName);
    return ele
  }

  function appendChild (node, child) {
    node.appendChild(child);
  }

  function parentNode (node) {
    console.log(node);
    return node.parentNode
  }

  function tagName (node) {
    return node.tagName
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createElement: createElement,
    appendChild: appendChild,
    parentNode: parentNode,
    tagName: tagName
  });

  function createPatchFunction (backend) {

    const { modules, nodeOps } = backend;

    function createEle (vnode, parentEle) {
      vnode.data;
      vnode.children;
      const tag = vnode.tag;
      console.log(tag);
      if (isDef(tag)) {
        vnode.ele = nodeOps.createElement(tag, vnode);
        insert(parentEle, vnode.ele);
      }
    }

    function insert (parent, ele, ref) {
      if (isDef(parent)) {
        if (isDef(ref)) ; else {
          nodeOps.appendChild(parent, ele);
        }
      }
    }

    function emptyNodeAt(ele) {
      return new VNode(nodeOps.tagName(ele).toLowerCase(), {}, [], undefined, ele)
    }


    return function patch (oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(oldVnode)) {
        console.log('没有老 vnode');
      } else {
        const isRealElement = isDef(oldVnode.nodeType);
        if (isRealElement) {
          oldVnode = emptyNodeAt(oldVnode);
        }
        const oldEle = oldVnode.ele;
        const parentEle = nodeOps.parentNode(oldEle);
        console.log(parentEle, '---');
        createEle(vnode, parentEle);
      }
    }
  }

  const modules = '';

  const patch = createPatchFunction({nodeOps, modules});

  Vue.prototype.__patch__ = patch;

  Vue.prototype.$mount = function (el, hydrating) {
    el = query(el);
    return mountComponent(this, el, hydrating)
  };

  const mount = Vue.prototype.$mount;

  Vue.prototype.$mount = function (el, hydrating) {
    el = el && query(el);

    const options = this.$options;
    if (!options.render) {
      let template = options.template;
      if (template) {
        console.log(template);
        if (typeof template === 'string') {
          console.log('template is a string');
          console.log(template);
          if (template.charAt(0) === '#') {
            template = '通过 id 转换为 template';
          }
        } else if (template.nodeType) {
          template = template.outerHTML;
          console.log(template);
        } else {
          console.error('您输入的 template 不合法');
        }
      }

      if (template) {
        let render = function () {
          console.log('将 template 转换成 渲染函数');
          return {tag: 'div', content: 'Hello World!'}
        };
        options.render = render;
      }
    }

    mount.call(this, el, hydrating);
  };

  return Vue;

})));
