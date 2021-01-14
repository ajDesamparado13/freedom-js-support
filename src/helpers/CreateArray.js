export default function ( value, delimiter=',') {
    if(!value){
        return [];
    }
    if(Array.isArray(value)){
        return value;
    }
    if(typeof value === 'string'){
        return value.indexOf(delimiter) !== -1 ? value.split(delimiter) : [ value ];
    }
    return [];
}

