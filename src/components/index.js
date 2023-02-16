/* Components */
import Vue from 'vue'

// 全局注册组件
const components = import.meta.globEager('./myComponents/*.vue')
Object.keys(components).forEach(key => {
  let component = components[key].default
  Vue.component(component.name, component)
})
