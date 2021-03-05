export default function ( value) {
    if(!value) return '';
    if(Array.isArray(value)) return value.join('');
    if(typeof value === 'object') return JSON.stringify(value);
    return new String(value).toString();
}

