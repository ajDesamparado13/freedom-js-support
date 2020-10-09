import dateUtil from './date'
const formatter = {
  emptyValues:['',null,undefined,NaN],
  roundNumber(num, precision) {
      if(!("" + num).includes("e")) {
          return +(Math.round(num + "e+" + precision)  + "e-" + precision);
      }
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + precision > 0) {
      sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + precision)) + "e-" + precision);
  },
  getJapanese(value){
      var match = value
      .match(/[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF\u2605-\u2606\u2190-\u2195]|Tab/)
      value  = value.replace(match,'');
      return value;
  },
  getObjectParameters(param,addon={}){
      let [format, ...parameters] = param.split('|');
      let options = Object.assign(parameters.reduce((obj,option)=>{
          let [key,args] = option.split(':');
          obj[key] = args.split(',');
          return obj
      },{}),addon);
      return {format,options};
  },
  toHalfWidth(value){
      if(this.isEmpty(value)){
          return;
      }
      return value.toString().replace(/[\uff01-\uff5e]/g, (s)=>{
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      })
  },
  isEmpty(value,type="text"){
      if(this.emptyValues.includes(value) || value === '-'){
          return true;
      }
      switch(type){
          case 'decimal':
          case 'float':
          case 'double':
          case 'integer':
          case 'number':
              return isNaN( Number(value.toString().replace(/\D/g,'')) );
      }
      return false;
  },
  checkDefault(a,b,format){
      if(( ( a === '' || a === undefined || a === null ) && b === 0 ) ||
          ( b === '' || b === undefined || b === null ) && a === 0 ){
          return '';
      }
      if( Number(a) === 0 && Number(b) === 0){
          return 0;
      }
  },
  format(value,type,options={}){
      options =  Object.assign({suffix:'',prefix:''},options)
      var { suffix,prefix } = options
      if(this.isEmpty(value,type)){
          return value;
      }
      switch(type){
          case 'integer':
          case 'number':
              value = this.formatNumber(value,options);
              break;
          case 'currency':
              value = this.formatCurrency(value,options);
              break;
          case 'date':
              value = this.formatDate(value,options);
              break;
          case 'float':
          case 'double':
          case 'decimal':
              value = this.formatDecimal(value,options);
              break;
          case 'percentage':
              value = this.formatPercentage(value,options);
              break;
      }
      return `${prefix}${value.toString()}${suffix}`
  },
  formatDate(value,options){
      if(typeof options.fromString != 'undefined'){
          return dateUtil.fromString(value,options);
      }
      return dateUtil.format(value,options);
  },
  formatPercentage(value,{multiplier=1,precision=2,symbol="%" }={}){
      if(value == "-"){
          return value;
      }
      var number = this.formatDecimal(value,{precision,multiplier});
      return `${number}${ symbol }`;
  },
  formatNumber(value){
      if(value == "-"){
          return value;
      }
      value = this.toHalfWidth(value)
      return this.getNumber(value).toLocaleString('en');;
  },
  formatDecimal(value,{ precision=8,stringify=true ,multiplier=1}={}){
      if(value == "-" || value == '.'){
          return value;
      }
      var number = this.getNumber(value)
      var point =  this.getPoint(value,precision)
      var result = parseFloat(number+ point).toFixed(precision) * multiplier;
      if(this.isEmpty(result)){
          return '';
      }
      return stringify ? result.toLocaleString('en') : result;
  },
  formatCurrency(value,{ currency="$" }={}){
      var number = this.getNumber(value);
      if(!isNaN(number)){
          number = Number(number).toLocaleString('en');
      }
      return currency+number;
  },
  getNumber(value,{type='signed'}={}){
      if(this.isEmpty(value) || value == "-"){
          return value;
      }

      // convert number to half width characters
      // remove characters after the decimal point
      var number =  this.toHalfWidth(value).split('.')[0];
      if(type != 'signed'){
          number = number.replace(/[^\d]/g,'')
      }else{
          //fix the sign character
          number = `${number.replace(/[^+-]/g,'')}${number.replace(/\D/g,'')}`
      }

      return  Number(number);
  },
  getPoint(value,{type='signed',precision=8}={}){
      if(!Boolean(value)){
          return 0;
      }
      // convert number to half width characters
      // remove characters before the decimal point
      value = this.toHalfWidth(value);
      var number = value.split('.').slice(1).join('')
      if(type != 'signed'){
          number = `0.${number.replace(/[^\d]/g,'')}`
      }else{
          //fix the sign character
          number = `${value.replace(/[^+-]/g,'')}0.${number.replace(/\D/g,'')}`
      }

      if(isNaN(Number(number))){
          return 0;
      }
      return parseFloat(number).toFixed(precision) * 1;
  },
  getDecimal(value){
    if(this.emptyValues.includes(value)){
        return value;
    }
    var number = this.getNumber(value) + this.getPoint(value);
    return this.isEmpty(number,'decimal') ? '' : parseFloat(number);
  },
  getDate (value, options={}) {
    return dateUtil.fromString(this.getNumber(value).toString(), options)
  },
  getValue(value,type,options={}){
      if(this.isEmpty(value,type)){
          return value;
      }
      switch(type){
          case 'integer':
          case 'percentage':
          case 'number':
              value = this.getNumber(value,options);
              break;
          case 'currency':
          case 'double':
          case 'decimal':
          case 'float':
              value = this.getDecimal(value,options);
              break;
          case 'date':
              value = this.getDate(value,options)
              break;
      }
      return value;
  },
}
export const VUE_INSTALLER = (Vue) => {
  if(Vue._formatter){
      return;
  }

  Vue._formatter = formatter

  Object.defineProperties(Vue.prototype,{
      $_formatter:{
          get:() => {
              return Vue._formatter;
          }
      }
  })
}

export default formatter;