/*
 * ALL GET METHODS SHOULD RETURN ACTUAL PRIMARY DATA TYPE OF THE VALUE
 * ALL FORMAT METHODS SHOULD RETURN IN STRING VALUE
 * */
import dateUtil from './date'
// let charsets = {
//  latin: { halfRE: /[!-~]/g, fullRE: /[！-～]/g, delta: 0xFEE0 },
//  hangul1: { halfRE: /[ﾡ-ﾾ]/g, fullRE: /[ᆨ-ᇂ]/g, delta: -0xEDF9 },
//  hangul2: { halfRE: /[ￂ-ￜ]/g, fullRE: /[ᅡ-ᅵ]/g, delta: -0xEE61 },
//  kana: { delta: 0,
//    half: '｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ',
//    full: '。「」、・ヲァィゥェォャュョッーアイウエオカキクケコサシ' +
//                'スセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜' },
//  extras: { delta: 0,
//    half: '¢£¬¯¦¥₩\u0020|←↑→↓■°',
//    full: '￠￡￢￣￤￥￦\u3000￨￩￪￫￬￭￮' }
// }
//
// let toFull = (set) => {
//  if (set.delta) {
//    return String.fromCharCode(c.charCodeAt(0) + set.delta)
//  }
//  return [...set.full][[...set.half].indexOf(c)]
// }
//
// let set ( c ) => {
//    return String.fromCharCode(c.charCodeAt(0) + set.delta)
// }
//
// let re = (set, way) => {
//  set[ way + 'RE' ] || new RegExp('[' + set[way] + ']', 'g')
// }
//
// let sets = Object.keys(charsets).map(i => charsets[i])

//  let charsets = {
//    latin: { halfRE: /[!-~]/g, fullRE: /[！-～]/g, delta: 0xFEE0 },
//    hangul1: { halfRE: /[ﾡ-ﾾ]/g, fullRE: /[ᆨ-ᇂ]/g, delta: -0xEDF9 },
//    hangul2: { halfRE: /[ￂ-ￜ]/g, fullRE: /[ᅡ-ᅵ]/g, delta: -0xEE61 },
//    kana: { delta: 0,
//      half: '｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ',
//      full: '。「」、・ヲァィゥェォャュョッーアイウエオカキクケコサシ' +
//                'スセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜' },
//    extras: { delta: 0,
//      half: '¢£¬¯¦¥₩\u0020|←↑→↓■°',
//      full: '￠￡￢￣￤￥￦\u3000￨￩￪￫￬￭￮' }
//  }

//  let toFull = set => c => set.delta
//    ? String.fromCharCode(c.charCodeAt(0) + set.delta)
//    : [...set.full][[...set.half].indexOf(c)]

//  let toHalf = set => c => set.delta
//    ? String.fromCharCode(c.charCodeAt(0) - set.delta)
//    : [...set.half][[...set.full].indexOf(c)]

//  let sets = Object.keys(charsets).map(i => charsets[i])

//  window.toFullWidth = str0 =>
//    sets.reduce((str, set) => str.replace(re(set, 'half'), toFull(set)), str0)

//  window.toHalfWidth = str0 =>d
//    sets.reduce((str, set) => str.replace(re(set, 'full'), toHalf(set)), str0)


const formatter = 
{
  template: {
    percentage: '%',
    currency: ''
  },
  toHalfWidth (value, set = 'kana') {
    value = value.toString()
    return value.replace(/[\uff01-\uff5e]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    }).replace(/\u3000/g, '\u0020')
  },
  getObjectParameters (param, addon) {
    var parameters = param.split('|')
    var format = parameters[0]
    var options = this.getOptions(parameters.slice(1))
    if (typeof addon === 'object') {
      Object.assign(options, addon)
    }
    return { format, options }
  },
  /*
    * convert array options to key value object
    * ex: ['multiplier:1','precision:2']
    * result: { multiplier:1,'precision:2]
    * */
  getOptions (parameters) {
    var options = {}
    for (let index in parameters) {
      var split_opt = parameters[index].split(':')
      var key = split_opt[0]
      var args = split_opt[1].split(',')
      options[key] = args
    }
    return options
  },
  setLocale (locale) {
    return 'ja'
  },
  isEmpty (a, format = 'text') {
    var ret = false
    if (a === '' || a === undefined || a === null || a === '-') {
      return true
    };
    switch (format) {
      case 'decimal':
      case 'float':
      case 'double':
        ret = isNaN(parseFloat(a))
        break
      case 'integer':
      case 'number':
        ret = isNaN(Number(a))
        break
    }
    return ret
  },
  checkDefault (a, b, format) {
    if (((a === '' || a === undefined || a === null) && b === 0) ||
                (b === '' || b === undefined || b === null) && a === 0) {
      return ''
    }
    if (Number(a) === 0 && Number(b) === 0) {
      return 0
    }
  },
  format (value, type, options) {
    if (this.isEmpty(value, type)) {
      return value
    }
    switch (type) {
      case 'integer':
      case 'number':
        value = this.formatNumber(value, options)
        break
      case 'currency':
        value = this.formatCurrency(value, options)
        break
      case 'date':
        value = this.formatDate(value, options)
        break
      case 'float':
      case 'double':
      case 'decimal':
        value = this.formatDecimal(value, options)
        break
      case 'percentage':
        value = this.formatPercentage(value, options)
        break
    }
    return value.toString()
  },
  formatDate (value, options) {
    if (typeof options.fromString !== 'undefined') {
      return dateUtil.fromString(value, options)
    }
    return dateUtil.format(value)
  },
  formatPercentage (value, { multiplier = 1, precision = 2, symbol = '%' }) {
    if (value == '-') {
      return value
    }
    var number = this.formatDecimal(value, { precision, multiplier })
    return `${number}${symbol}`
  },
  formatNumber (value) {
    if (value == '-') {
      return value
    }
    value = this.toHalfWidth(value)
    return this.getNumber(value).toLocaleString('en')
  },
  formatDecimal (value, { precision = 8, stringify = true, multiplier = 1 }) {
    if (value == '-' || value == '.') {
      return value
    }
    value = this.toHalfWidth(value)
    var number = this.getNumber(value)
    var point = this.getPoint(value)
    if (point) {
      if (precision > 0 && precision != null) {
        point = point.toString().substring(0, precision)
      }
      point = '.' + point
    }
    var newVal = `${number}${point}`
    if (value[0] === '-' && newVal[0] !== '-') {
      newVal = '-' + newVal
    }
    newVal = parseFloat(newVal) * multiplier
    if (!stringify) {
      return newVal
    }
    if (this.isEmpty(newVal)) {
      return ''
    }
    newVal = newVal.toLocaleString('en')
    if (point == '.' && value.indexOf('.') >= 0) {
      newVal = newVal + '.'
    }
    return newVal
  },
  formatCurrency (value, { currency = '$' }) {
    var number = this.getNumber(value)
    if (!isNaN(number)) {
      number = Number(number).toLocaleString('en')
    }
    return currency + number
  },
  getJapanese (value) {
    var match = value
      .match(/[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF\u2605-\u2606\u2190-\u2195]|Tab/)
    value = value.replace(match, '')
    return value
  },
  getNumber (value) {
    if (this.isEmpty(value) || value == '-') {
      return value
    }

    var number = value = this.toHalfWidth(value)
    var negative = number[0] == '-' ? '-' : ''
    var split = number.split('.')
    number = split.length > 0 ? split[0] : number
    number = number.replace(/\D+/g, '')
    number = `${negative}${number}`
    return this.isEmpty(number, 'number') ? '' : Number(number)
  },
  getPoint (value) {
    if (!value) {
      return 0
    }
    var number = value.toString()
    var split = number.split('.')
    number = split.length > 1 ? split[1] : ''
    number = number.replace(/\D+/g, '')
    var is_zero_prefixed = number[0] == '0'
    if (this.isEmpty(number, 'number')) {
      return ''
    }
    if (is_zero_prefixed) {
      return number
    }
    return Number(number)
  },
  getDecimal (value) {
    if (this.isEmpty(value) || value == '-') {
      return value
    }
    value = value.toString()

    var negative = value[0] == '-' ? '-' : ''
    var number = this.getNumber(value)
    var point = this.getPoint(value)
    point = point ? `.${point}` : ''
    var new_val = `${number}${point}`
    return this.isEmpty(new_val, 'decimal') ? '' : parseFloat(new_val)
  },
  getDate (value, options) {
    value = this.getNumber(value).toString()
    return dateUtil.fromString(value, options)
  },
  getValue (value, type, options) {
    if (this.isEmpty(value, type)) {
      return value
    }
    switch (type) {
      case 'integer':
      case 'percentage':
      case 'number':
        value = this.getNumber(value, options)
        break
      case 'currency':
      case 'double':
      case 'decimal':
      case 'float':
        value = this.getDecimal(value, options)
        break
      case 'date':
        value = this.getDate(value, options)
        break
    }
    return value
  }
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