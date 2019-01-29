import { parse } from 'qs'

/**
 *
 * @param {array} styles
 * @param {string} key
 * 根据样式列表返回 style 对象
 */
export const getStyles = (styles = [], types = []) => {
  const inlineStyles = {}
  if (Array.isArray(types)) {
    types.forEach(style => {
      const styleMap = styles.find(item => item.key === style)
      if (styleMap && Array.isArray(styleMap.items)) {
        styleMap.items.forEach((item) => {
          const { key, value } = item
          inlineStyles[key] = value
        })
      }
    })
  }
  return inlineStyles
}



 export const uniqueId = (len, radix) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = []
  let i = 0
  const radixBase = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radixBase]
  } else {
    let r = ''
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

// function create_UUID(){
//   var dt = new Date().getTime();
//   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = (dt + Math.random()*16)%16 | 0;
//       dt = Math.floor(dt/16);
//       return (c=='x' ? r :(r&0x3|0x8)).toString(16);
//   });
//   return uuid;
// }

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
