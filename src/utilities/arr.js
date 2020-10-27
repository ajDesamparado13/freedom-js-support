const Arr = {
    getObject(_config, defaultValue = {}, tap = null) {
        let config = typeof _config === 'object' ? _config : defaultValue;
        return typeof tap === 'function' ? tap(config) : config
    },
    getProperty(_config, key, defaultValue, tap = null) {
        let property = (this.getObject(_config))[key] || defaultValue
        return typeof tap === 'function' ? tap(property) : property
    }
}

export const VUE_INSTALLER = (Vue) => {
  if(Vue._Arr){
      return;
  }
  Vue._Arr = Arr
  Object.defineProperties(Vue.prototype,{
      $_Arr:{
          get:() => {
              return Vue._Arr;
          }
      }
  })
}

export default Arr;