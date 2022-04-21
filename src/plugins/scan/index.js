import Scan from './Index.vue'
let instance
Scan.install = (Vue, options = {}) => {
    const QRConstructor = Vue.extend(Scan)
    // 需要传qrcode
    Vue.prototype.$scan = (opt = {}) => {
        if (instance) {
            return instance.showDialog()
        }
        instance = new QRConstructor({ data: opt }).$mount()
        document.body.appendChild(instance.$el);
        return instance.showDialog()
    }
}

export default Scan