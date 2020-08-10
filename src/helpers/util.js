/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a, b) {
    // eslint-disable-next-line eqeqeq
    return a == b || (
        isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false
    );
}

/**
 * Check if a val exists in arr using looseEqual comparison
 */
export function looseIndexOf(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) {
            return i;
        }
    }

    return -1;
}

/**
 * Check if the given string starts with the query, beginning
 * at the given position
 */
export function startsWith(string, query, position = 0) {
    return string.substr(position, query.length) === query;
}

/**
 * Get value of an object property/path even if it's nested
 */
export function getValueByPath(obj, path) {
    const value = path.split('.').reduce((o, i) => o[i], obj)
    return value
}

/**
 * Extension of indexOf method by equality function if specified
 */
export function indexOf(array, obj, fn) {
    if (!array) return -1

    if (!fn || typeof fn !== 'function') return array.indexOf(obj)

    for (let i = 0; i < array.length; i++) {
        if (fn(array[i], obj)) {
            return i
        }
    }

    return -1
}


/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
export const isMobile = {
    Android: function () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/Android/i)
        )
    },
    BlackBerry: function () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/BlackBerry/i)
        )
    },
    iOS: function () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/iPhone|iPad|iPod/i)
        )
    },
    Opera: function () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/Opera Mini/i)
        )
    },
    Windows: function () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/IEMobile/i)
        )
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        )
    }
}

export function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else {
        el.parentNode.removeChild(el)
    }
}

/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 */
export function escapeRegExpChars(value) {
    if (!value) return value

    // eslint-disable-next-line
    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}

export default {
    isObject,
    looseEqual,
    looseIndexOf,
    startsWith,
    indexOf,
    getValueByPath,
    isMobile,
    escapeRegExpChars,
    removeElement,
}
