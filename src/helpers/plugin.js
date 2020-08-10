export const use = (plugin) => {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
  }
}

export const registerComponent = (Vue, component) => {
  Vue.component(component.name, component)
}

export const registerComponentProgrammatic = (Vue, property, component) => {
  let name = `$${property}`
  if (Vue.prototype[name]) {
    console.error(`Vue already contains the prototype ${name}`)
    return
  }
  Vue.prototype[name] = component
}
