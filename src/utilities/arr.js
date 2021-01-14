import CreateArray from '../helpers/CreateArray';
import Vue from 'vue';

const Arr = {
    getObject(_config, defaultValue = {}, tap = null) {
        let config = this.isObject(_config) ? _config : defaultValue;
        return typeof tap === 'function' ? tap(config) : config
    },
    getProperty(_config, key, defaultValue, tap = null) {
        let property = CreateArray(key,'.').reduce(( config,key ) => {
            return this.hasProperty(config,key) ? config[key] : defaultValue;
        },this.getObject(_config))

        return typeof tap === 'function' ? tap(property) : property
    },
    isObject(_config){
        return typeof _config === 'object'  && !Array.isArray(_config) && Boolean(_config);
    },
    //addObject(_config,newObject,path=""){
    //    if(!path){
    //        return Object.assign(_config,newObject);
    //    }
    //    let keys = CreateArray(path,'.');
    //    if(keys.length === 1){
    //        Vue.set(_config,path,newObject);
    //    }
    //    return keys.reverse().reduce((obj,key,index)=>{
    //        if(index === keys.length - 1){
    //            Vue.set(obj,key,newObject);
    //            return _config;
    //        } else if (!this.hasProperty(obj,key) ){
    //            Vue.set(obj,key,{});
    //        }
    //        return obj[key];
    //    },newObject)
    //},
    //removeObject(_config,path){
    //    Vue.delete()
    //},
    hasProperty(_config,_key){
        if(!this.isObject){
            return false;
        }
        return Boolean(CreateArray(_key,'.').reduce((config,key)=>{
            return (this.isObject(config) && config.hasOwnProperty(key)) ? config[key] : null;
        },this.getObject(_config)));
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