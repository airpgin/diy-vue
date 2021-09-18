import Vue from '../../../core/index'
import { query } from '../util/index'
import { mountComponent } from '../../../core/instance/lifecycle'
import { patch } from './patch'

Vue.prototype.__patch__ = patch

Vue.prototype.$mount = function (el, hydrating) {
  el = query(el)
  return mountComponent(this, el, hydrating)
}

export default Vue