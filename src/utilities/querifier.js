const querifier = {
    querifyable : ['search','with','searchFields','searchJoin','filter','orderBy','meta'],
    /*
    * GET THE QUERY PARAMETER STRING
    * IF OBJECT: { search: {field1:value1, field2:value2 }}
    * TRANSFORMS INTO ?search=field1:value1;field2:value2
    * IF STRING field1=value1
    * TRANSFORM INTO ?field1=value1
    * @returns string
    */
    getQueryString(params,encode=false){

        if(!params){
            //PARAMETER IS EMPTY RETURN
            return'';
        }

        // IF PARAMETER IS ALREADY A STRING THEN SIMPLY RETURN THE STRING
        if(typeof params == 'string'){
            return params.indexOf('?')!=-1?params:`?${params}`
        }

        var queries = []
        // IF PARAMETER IS AN OBJECT THEN BUILD QUERY STRING FROM OBJECT
        if(typeof params == 'object'){
            queries = queries.concat(this.querify(params,0,{encode}));
        }

        if(queries.length === 0){
            return '';
        }

        let queryString = queries.join('&')
        return "?" +  queryString
    },
    querify(params,level=1,config={}){
        if(!params){
            return [];
        }

        let delimeter = config.delimeter || '=';
        var queries = [];
        for(let key in params){
            var param = params[key];
            if(typeof param === 'function' || typeof param === 'undefined'){
                continue;
            }
            const is_array = Array.isArray(param);
            const is_queryfyable = this.querifyable.includes(key);

            if(typeof param == 'object' && !is_array && is_queryfyable){
                queries.push( this.getCriteriaString(param,key,config) );
                continue;
            }

            if(is_array && param.length > 0){
                queries.push(`${key}=${param.join( is_queryfyable ? ';' : ',')}`)
            }
            else if(typeof param == 'object'){
                queries = queries.concat(this.querify(param,level+1,config));
            }
            else if(param || typeof param == 'number'){
                queries.push(key+delimeter+param)
            }
        }
        return queries;
    },
    /*
    * TRANSFORMED Criteria Object INTO STRING
    * refer to http://andersonandra.de/l5-repository/#using-the-requestcriteria for sample query strings
    * @returns string
    */
    getCriteriaString(params,name,config={}){
        if(!params || !name ){
            return;
        }
        let valueOnly = Boolean(config.valueOnly || false);
        let encode = Boolean(config.encode || false);
        let criteriaString = Object.keys(params).reduce((searches,key,index)=>{
            var value = Array.isArray(params[key]) ? params[key].join(',') : params[key];
            const is_empty =  ['',null,undefined,'undefined'].includes(value);
            if(is_empty){
                return searches;
            }
            searches.push(`${key}:${value}`);
            return searches;
        },[]).join(';');
        if(valueOnly){
            return encode ? encodeURIComponent(criteriaString) : criteriaString;
        }
        return name + "=" + (encode ? encodeURIComponent(criteriaString) : criteriaString);
    },
    getQueryObject(queryString){
        if(!queryString || typeof queryString != 'string'){
            return typeof queryString === 'object' ? queryString : "";
        }

        if(queryString.indexOf('?') === 0 ){
            queryString = queryString.slice(1);
        }
        return this.objectify(queryString);
    },
    objectify(queryString){
        if(!queryString){
            return;
        }

        let query = {}
        let splits = queryString.split('&');
        for(let index in splits){
            let [ queryField,queryValue] = splits[index].split('=');

            if(queryValue.indexOf(':') === -1){
                query[queryField] = queryValue;
                continue;
            }

            query[queryField] = this.getCriteriaObject(queryValue,queryField);
        }
        return query;
    },
    getCriteriaObject(_params,config={}){
        if(!_params){
            return;
        }
        let decode = config.decode || false
        let params = Array.isArray(_params) ? _params : _params.split(';');
        return params.reduce((queryObject,param,key)=>{
            let [field,value] = param.split(':');
            queryObject[field] = decode ? decodeURIComponent(value) : value;
            return queryObject
        },{});
    }
}
export const VUE_INSTALLER = ( Vue ) => {
    if(Vue._querifier){
        return;
    }

    Vue._querifier = querifier

    Object.defineProperties(Vue.prototype,{
        $_querifier:{
            get:() => {
                return Vue._querifier;
            }
        }
    })
}

export default querifier
