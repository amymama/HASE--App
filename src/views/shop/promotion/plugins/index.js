import TextDialog from './TextDialog'

// const TextConstructor = Vue.extend(TextDialog)
let instance
TextDialog.install = (Vue, options = {}) => {
    const TextConstructor = Vue.extend(TextDialog)
    Vue.prototype.$inputText = (opt = {}) => {
        if (instance) {
            // undefined情况
            if (typeof opt.required === 'undefined') opt.required = true
            instance.init(opt)
            return instance.showDialog()
        }
        instance = new TextConstructor({ data: opt }).$mount()
        document.body.appendChild(instance.$el);
        return instance.showDialog()
    }
}

export default TextDialog