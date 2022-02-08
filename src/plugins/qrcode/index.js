import QRModel from './Index.vue'
let instance
QRModel.install = (Vue, options = {}) => {
    const QRConstructor = Vue.extend(QRModel)
    // 需要传qrcode
    Vue.prototype.$showQR = (opt = {}) => {
        if (instance) {
            instance.init(opt)
            return instance.showDialog()
        }
        instance = new QRConstructor({ data: opt }).$mount()
        document.body.appendChild(instance.$el);
        return instance.showDialog()
    }
}

export default QRModel