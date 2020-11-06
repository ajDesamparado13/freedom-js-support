const Arr = {
    getObject(_config, defaultValue = {}, tap = null) {
        let config = this.isObject(_config) ? _config : defaultValue;
        return typeof tap === 'function' ? tap(config) : config
    },
    getProperty(_config, key, defaultValue, tap = null) {
        let property = key.split('.').reduce(( config,key ) => {
            return this.hasProperty(config,key) ? config[key] : defaultValue;
        },this.getObject(_config))

        return typeof tap === 'function' ? tap(property) : property
    },
    isObject(_config){
        return typeof _config === 'object'  && !Array.isArray(_config) && Boolean(_config);
    },
    hasProperty(_config,key){
        return this.isObject(_config) && _config.hasOwnProperty(key);
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