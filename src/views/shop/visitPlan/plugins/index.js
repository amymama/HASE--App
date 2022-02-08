import PlanInfo from './PlanInfo'

let instance
PlanInfo.install = (Vue) => {
    const PlanConstructor = Vue.extend(PlanInfo)
    Vue.prototype.$planInfo = (opt = {}) => {
        if (instance) {
            instance.init(opt)
            return instance.showDialog()
        }
        instance = new PlanConstructor({ data: opt }).$mount()
        document.body.appendChild(instance.$el);
        return instance.showDialog()
    }
}

export default PlanInfo