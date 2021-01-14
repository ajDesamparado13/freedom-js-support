import Arr from './arr'
const response = {
        getData(response,config={}){
            return response.data || {}

        },
        getError(response,config={}){
            let error = response;
            do {
                error = !error.error ? response.data : error.error;
            }while(error.data || error.error)

            return error || {};
        },
        getValidationMessages(data,{ type='error'}){
            return Arr.getProperty(data,'errors',[]);
        },
        getMessage(data,{ type='error'}){
            return Arr.getProperty(data,'message','');
        }

}

export const VUE_INSTALLER = ( Vue ) => {
    if(Vue._response){
        return;
    }
    Vue._response = response 
    Object.defineProperties(Vue.prototype,{
        $_response:{
            get:() => {
                return Vue._response;
            }
        }
    })
}
export default response
