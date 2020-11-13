import Vue from 'vue';

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
    },
    clone(source,target){
        Object.keys(target).forEach((key)=>{
            let value = target[key];
            Vue.set(source,key,Array.isArray(value) ? [ ...value ] : value);
        })
        return source;
    },
    /*
     * Loosely Check if value a and b are equal
     */
    looseEqual(a, b, keyName=null) {
        return ( this.isObject(a) ? ( keyName ? this.looseEqual(this.getProperty(a,keyName)) : JSON.stringify(a) ) : a  ) ===
            ( this.isObject(b) ? ( keyName ? this.looseEqual(this.getProperty(b,keyName)) : JSON.stringify(b) ) : b )
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