(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

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

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._render = function () {
      const vm = this;

      const { render, _parentVnode } = vm.$options;

      let vnode;
      vnode = render.call(vm._renderProxy, vm.$createElement);
      console.log('render 中', vnode);

      return vnode
    };
  }

  class Watcher {
    constructor(vm, expOrFn, cb, options, isRenderWatcher) {
      console.log('Watcher的构造函数执行了');
    }
  }

  function noop (a, b, c) { }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydratig) {
      console.log('_updata 的作用是将 虚拟DOM 转换为 真实DOM');
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
  lifecycleMixin(Vue);
  renderMixin(Vue);

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
