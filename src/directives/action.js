import Vue from 'vue'
import store from '@/store'

const action = Vue.directive('action', {
  inserted: function (el, binding) {
    const actionName = binding.arg
    const buttons = store.getters.auths || []
    if (buttons.length > 0) {
      var flag = false
      buttons.map((item) => {
        if (actionName == item.perms) {
          flag = true
        }
      })
      if (!flag) {
        el.parentNode.removeChild(el)
      }
    } else {
      el.parentNode.removeChild(el)
    }
  }
})

export default action
