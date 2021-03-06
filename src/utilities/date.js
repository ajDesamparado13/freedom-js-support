import moment from 'moment'
const dateUtil = {
  getTime(val,format="YYYY-MM-DD HH:mm:ss"){
      return moment(val,format).valueOf();
  },
  getDate(str){
      if(!str){
          return "";
      }
      var value = ""
      switch(str.length){
          case 1 :
              value = new Date().getFullYear()+"/"+str;
              break;
          case 2:
              var month = str[1]
              var date = str[0]
              value = new Date().getFullYear()+"/"+month+"/"+ (date ? date : str)
              break;
          default : value = str
      }
      return value;
  },
  fromString(str,{ format="Y-m-d" }){
      if(!str) return '';
      str = str.replace(/[^0-9]/g,'');
      var year = str.length > 4 ? str.substring(0,4) : str;

      if(str.length <= 4 || format=='Y'){
          return year;
      }

      var month = "01";
      var date = "";
      if(str.length>4){
          month = str.substring(4,6);
          if(month == "0"){
          }
          else if(month == "00" || month == "01"){
              month = "01";
          }else{
              month = Number(month);
              if( month < 10 && month > 1){
                  month = "0"+month;
              }else if(month > 12 ){
                  if(str.length==6){
                      month = Number(str.substring(4,5));
                      if(month < 10){
                          month = "0"+month
                      }
                      date = Number(str.substring(5,6));
                  }else{
                      month = 12;
                  }
              }

          }
      }

      if(format == 'Y-m'){
          return `${year}/${month}`;
      }

      if(str.length>6 || date){
          date = !date ? str.substring(6,8) : date.toString();
          if(date == "00"){
              date = "01";
          }else if(date.indexOf('0') == 0){

          }else{
              date = Number(date);
              if(date > 28){
                  var last_date = new Date(Number( year ),Number(month),0).getDate();
                  date = date > last_date ? last_date : date;
              }

              if(date < 1){
                  date = 1;
              }

              if(date > 3 && date < 10 ){
                  date = "0"+date;
              }
          }
      }
      return `${year}${month?'/':''}${month}${date?'/':''}${date}`
  },
  create(date=moment(),options){
      var format = typeof options == 'object' ? Array.isArray(options.format ) ? options.format[0] : options.format : options;
      if(!this.isValid(date,format)){
          return 'Invalid Date';
      }
      return moment(date);
  },
  format(value=moment(), options){
      let date = this.create(value,options);

      if(date === 'Invalid Date') return date;

      var format = typeof options == 'object' ? Array.isArray(options.format ) ? options.format[0] : options.format : options;
      return moment(date).format(format)
  },
  isValid(value,format='Y-m-d'){
      let newDate = new Date(value)
      return newDate !== 'Invalid Date';

  }
}

export const VUE_INSTALLER = (Vue)=>{
    if(Vue._date){
        return;
    }

    Vue._date = dateUtil

    Object.defineProperties(Vue.prototype,{
        $_date:{
            get:() => {
                return Vue._date;
            }
        }
    })
}
export default dateUtil