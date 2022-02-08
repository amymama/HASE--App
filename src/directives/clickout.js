import Vue from 'vue'

Vue.directive('clickOut', {
    bind(el, binding) {
        const handler = (e) => {
            if (el.contains(e.target)) return false;

            if (binding.expression) {
                binding.value()
            }
        }
        el.__vueClickOut__ = handler
        document.addEventListener('click', handler)
    },
    unbind(el) {
        document.removeEventListener('click', el.__vueClickOut__)
        delete el.__vueClickOut__
    }
})