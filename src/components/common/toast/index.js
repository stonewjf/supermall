import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {

    // 创建组件构造器
    const toastConstrustor = Vue.extend(Toast)

    // 根据new的方式，用组件构造器创建组件对象
    const toast = new toastConstrustor()

    // 将组件对象手动挂载到某个元素上
    toast.$mount(document.createElement('div'))

    // toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast

}

export default obj