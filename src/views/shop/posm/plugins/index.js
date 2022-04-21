import NumDialog from './NumDialog'

// const NumConstructor = Vue.extend(NumDialog)
let instance
NumDialog.install = (Vue, options = {}) => {
    const NumConstructor = Vue.extend(NumDialog)
    Vue.prototype.$inputNumber = (opt = {}) => {
        if (instance) {
            instance.init(opt)
            return instance.showDialog()
        }
        instance = new NumConstructor({ data: opt }).$mount()
        document.body.appendChild(instance.$el);
        return instance.showDialog()
    }
}

export default NumDialog