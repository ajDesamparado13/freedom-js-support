import Arr from '../utilities/arr'

export const use = (plugin) => {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
  }
}

export const setDefaultProps = (props,defaults) => {
  Object.keys(props).forEach((key)=>{
    if(Arr.isObject(props[key])){
      props[key].default = Arr.getProperty(defaults,key,props[key].default)
      return
    }
    props[key] = Arr.getProperty(defaults,key,props[key])
  });
  return props;
}

export const registerComponent = ( Vue, component,defaults={} ) => {
  setDefaultProps(component.props,defaults);
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

