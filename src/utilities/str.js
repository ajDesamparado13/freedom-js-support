import CreateArray from '../helpers/CreateArray'
import Pluralizer from 'pluralize'
const Str = {
    /**
     * Return the remainder of a string after the first occurrence of a given value.
     *
     * @param  string  $subject
     * @param  string  $search
     * @return string
     */
    after(subject,search,config={}){
        if(!search) return subject
        let position = subject.search(search)
        if(position >= 0) return subject.substr(position)
        return subject
    },

   /**
    * Return the remainder of a string after the last occurrence of a given value.
    *
    * @param  string  $subject
    * @param  string  $search
    * @return string
    */
    afterLast(subject,search,config={}){
        if(!search) return subject
        let position = subject.lastIndexOf(search)
        if(position >= 0) return subject.substring(position) 
        return subject
    },

    /**
     * Transliterate a UTF-8 value to ASCII.
     *
     * @param  string  $value
     * @param  string  $language
     * @return string
     */
    ascii(value,language){
        //TODO
        return value;
    },
    /**
    * Get the portion of a string before the first occurrence of a given value.
    *
    * @param  string  $subject
    * @param  string  $search
    * @return string
    */
    before(subject,search,config={}){
        if(!search) return subject;
        let position = subject.search(search)
        if(position >= 0) return subject.slice(0,position)
        return subject;
    },
    /**
     * Get the portion of a string before the last occurrence of a given value.
     *
     * @param  string  $subject
     * @param  string  $search
     * @return string
     */
    beforeLast(subject,search){
        if(!search) return subject
        let position = subject.lastIndexOf(search)
        if(position >= 0) return subject.slice(0,position)
        return subject;
    },
    /**
    * Get the portion of a string between two given values.
    *
    * @param  string  $subject
    * @param  string  $from
    * @param  string  $to
    * @return string
    */
    between(subject,from,to){
        return (from || to) ? this.beforeLast(this.after(subject,from),to) : subject
    },
    /**
    * Convert a value to camel case.
    *
    * @param  string  $value
    * @return string
    */
    camel(value){
        // TODO
        return value;
    },
    /**
    * Determine if a given string contains a given substring.
    *
    * @param  string  $haystack
    * @param  string|string[]  $needles
    * @return bool
    */
   contains(subject,search){
       return subject.indexOf(search) >= 0
   },
    /**
    * Determine if a given string contains all array values.
    *
    * @param  string  $haystack
    * @param  string[]  $needles
    * @return bool
    */
   containsAll(subject,needles,config={}){
       return CreateArray(needles).reduce((flag,needle) => {
           return flag ? this.contains(subject,needle) : false
       },true)
   },
    /**
    * Determine if a given string ends with a given substring.
    *
    * @param  string  $haystack
    * @param  string|string[]  $needles
    * @return bool
    */
   endsWith(subject,search){
       return subject.endsWith(search)
   },
    /**
     * Cap a string with a single instance of a given value.
     *
     * @param  string  $value
     * @param  string  $cap
     * @return string
     */
    finish(value,cap){
        return this.endsWith(value,cap) ? value : value  + cap 
    },
    /**
    * Determine if a given string matches a given pattern.
    *
    * @param  string|array  $pattern
    * @param  string  $value
    * @return bool
    */
   is(pattern,value){
       return value.match(pattern)
   },
    /**
    * Determine if a given string is 7 bit ASCII.
    *
    * @param  string  $value
    * @return bool
    */
   isAscii(value){
       // TODO
       return value
   },
    /**
    * Determine if a given string is a valid UUID.
    *
    * @param  string  $value
    * @return bool
    */
   isUuid(value){
       return typeof value !== 'string' ? false : value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
   },
    /**
    * Convert a string to kebab case.
    *
    * @param  string  $value
    * @return string
    */
    kebab(value){
        var result = string;
        // Convert camelCase capitals to kebab-case.
        result = result.replace(/([a-z][A-Z])/g, function (match) {
            return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
        });
        // Convert non-camelCase capitals to lowercase.
        result = result.toLowerCase();
        // Convert non-alphanumeric characters to hyphens
        result = result.replace(/[^-a-z0-9]+/g, '-');
        // Remove hyphens from both ends
        result = result.replace(/^-+/, '').replace(/-+$/, '');
        return result;
    },

    /**
     * Return the length of the given string.
     *
     * @param  string  $value
     * @param  string|null  $encoding
     * @return int
     */
    length(value,encoding){
        // TODO
        return value;
    },
    /**
    * Limit the number of characters in a string.
    *
    * @param  string  $value
    * @param  int  $limit
    * @param  string  $end
    * @return string
    */
   limit(subject,limit=100,end='...'){
       return subject.substr(0,limit) + "..."
   },
    /**
    * Convert the given string to lower-case.
    *
    * @param  string  $value
    * @return string
    */
   lower(value){
       return value.toLowerCase()
   },
    /**
     * Limit the number of words in a string.
     *
     * @param  string  $value
     * @param  int  $words
     * @param  string  $end
     * @return string
     */
   words(value,words=100,end='...'){
       // TODO
       return value;
   },
    /**
    * Pad both sides of a string with another.
    *
    * @param  string  $value
    * @param  int  $length
    * @param  string  $pad
    * @return string
    */
   padBoth(value,length,pad=' '){
       length = Math.abs(length);
       return this.repeat(pad,length) + value + this.repeat(pad,length)
   },
    /**
    * Pad the left side of a string with another.
    *
    * @param  string  $value
    * @param  int  $length
    * @param  string  $pad
    * @return string
    */
   padLeft(value,length,pad=' '){
       return this.repeat(pad,length) + value;
   },
    /**
    * Pad the right side of a string with another.
    *
    * @param  string  $value
    * @param  int  $length
    * @param  string  $pad
    * @return string
    */
   padRight(value,length,pad=' '){
       return value + this.repeat(pad,length);
   },
    /**
    * Get the plural form of an English word.
    *
    * @param  string  $value
    * @param  int  $count
    * @return string
    */
   plural(value,count=2){
       return Pluralizer(value,count);
   },
    /**
     * Pluralize the last word of an English, studly caps case string.
     *
     * @param  string  $value
     * @param  int  $count
     * @return string
     */
    pluralStudly(value, count = 2)
    {
        // TODO
       return Pluralizer(value,count);
    },
    /**
    * Generate a more truly "random" alpha-numeric string.
    *
    * @param  int  $length
    * @return string
    */
    random(length = 16,charSet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
    {
        return Array.from({length},(value,key) => { return charSet[Math.floor(Math.random() * charSet.length)]}).join('')
    },
    /**
     * Replace a given value in the string sequentially with an array.
     *
     * @param  string  $search
     * @param  array<int|string, string>  $replace
     * @param  string  $subject
     * @return string
     */
    replaceArray(search, _replace, subject)
    {
        return CreateArray(_replace).reduce((newString,replace,key)=>{
            return this.replaceFirst(search,replace,newString)
        },subject)
    },
    /**
     * Replace the first occurrence of a given value in the string.
     *
     * @param  string  $search
     * @param  string  $replace
     * @param  string  $subject
     * @return string
     */
    replaceFirst(search, replace, subject)
    {
        if(!search) return subject;
        let position = subject.search(search);
        if(search && position >= 0 ){
            return this.before(subject,search) + replace + this.after(subject,search)
        }
        return subject;
    },
    /**
    * Replace the last occurrence of a given value in the string.
    *
    * @param  string  $search
    * @param  string  $replace
    * @param  string  $subject
    * @return string
    */
    replaceLast(search, replace, subject)
    {
        if(!search) return subject;
        let position = subject.search(search);
        if(search && position >= 0 ){
            return this.beforeLast(subject,search) + replace + this.afterLast(subject,search)
        }
        return subject;
    },
    /**
     * Begin a string with a single instance of a given value.
     *
     * @param  string  $value
     * @param  string  $prefix
     * @return string
     */
    start(value, prefix)
    {
        return this.startsWith(value,prefix) ? value : prefix + value;
    },
    /**
     * Convert the given string to upper-case.
     *
     * @param  string  $value
     * @return string
     */
    upper(value)
    {
        return value.toUpperCase();
    },
    /**
     * Convert the given string to title case.
     *
     * @param  string  $value
     * @return string
     */
    title(value)
    {
        //TODO
        return value;
    },
    /**
     * Get the singular form of an English word.
     *
     * @param  string  $value
     * @return string
     */
    singular(value)
    {
       return Pluralizer(value,1);
    },
    /**
     * Generate a URL friendly "slug" from a given string.
     *
     * @param  string  $title
     * @param  string  $separator
     * @param  string|null  $language
     * @return string
     */
    slug(title, separator = '-', language = 'en')
    {
        // TODO
        return title;
    },
    /**
     * Convert a string to snake case.
     *
     * @param  string  $value
     * @param  string  $delimiter
     * @return string
     */
    snake(value, delimiter = '_')
    {
        // TODO
        return value;
    },
    /**
     * Determine if a given string starts with a given substring.
     *
     * @param  string  $haystack
     * @param  string|string[]  $needles
     * @return bool
     */
    startsWith(subject, search)
    {
        return subject.startsWith(search)
    },
    /**
     * Convert a value to studly caps case.
     *
     * @param  string  $value
     * @return string
     */
    studly(value)
    {
        // TODO
        return value;
    },
    /**
     * Returns the portion of string specified by the start and length parameters.
     *
     * @param  string  $string
     * @param  int  $start
     * @param  int|null  $length
     * @return string
     */
    substr(string, start, length = null)
    {
        return string.substr(start,length);
    },
    /**
     * Returns the number of substring occurrences.
     *
     * @param  string  $haystack
     * @param  string  $needle
     * @param  int  $offset
     * @param  int|null  $length
     * @return int
     */
    substrCount(haystack, needle, offset = 0, length = null)
    {
        return haystack.split(needle).length;
    },
    /**
     * Make a string's first character uppercase.
     *
     * @param  string  $string
     * @return string
     */
    ucfirst(value)
    {
        return value[0].toUpperCase() + value.substr(1);
    },
    /**
     * Remove prefix from value 
     * @param string value 
     * @param string prefix 
     * @return string
     */
    removePrefix(value,prefix){
        return this.start(value,prefix).substring(1);
    },
    /**
     * Remove suffix from value 
     * @param string value 
     * @param string suffix 
     * @return string
     */
    removeSuffix(value,suffix){
        let newString = this.finish(value,suffix);
        return newString.slice(0,-1);
    },
    removeEdge(value,edge){
        return this.removeSuffix(this.removePrefix(value,edge),edge)
    },
    /**
     *  Joins Two String with one character
     * @param string valueA 
     * @param string valueB 
     * @param string connector 
     * @return string
     */
    joinWith(valueA,valueB,connector){
        return this.removeSuffix(valueA,connector) + connector + this.removePrefix(valueB,connector);
    },
    /**
     * Mask the string after the specified length of characters from left
     * @param string subject 
     * @param integer length 
     * @param string mask 
     * @return string
     */
    maskFromLeft(subject,length,mask='*'){
        return this.padRight(subject.substring(0,length),subject.length - length, mask);
    },
    /**
     * Mask the string before the specified length of characters from right
     * @param string subject 
     * @param integer length 
     * @param string mask 
     * @return string
     */
    maskToRight(subject,length){
        return this.padLeft(subject.substring(length*-1),subject.length - length, mask);
    },
    repeat(str,count){
        if (str == null) throw new TypeError('can\'t convert ' + this + ' to object');

        var str = '' + str;
        // To convert string to integer.
        count = +count;
        // Check NaN
        if (count != count)
        count = 0;
        count = Math.floor(count);
        count = Math.abs(count);
        if (str.length == 0 || count == 0) return '';

        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) throw new RangeError('repeat count must not overflow maximum string size');

        var maxCount = str.length * count;
        count = Math.floor(Math.log(count) / Math.log(2));
        while (count) {
        str += str;
        count--;
        }
        str += str.substring(0, maxCount - str.length);
        return str;
    }
}

export const VUE_INSTALLER = (Vue) => {
  if(Vue._Str){
      return;
  }
  Object.keys(Str).forEach((key)=>{
      if(!String.prototype.hasOwnProperty(key)) Object.defineProperty(String.prototype,key,Str[key]);
  });
  Vue._Str = Str
  Object.defineProperties(Vue.prototype,{
      $_Str:{
          get:() => {
              return Vue._Str;
          }
      }
  })
}

export default Str;
