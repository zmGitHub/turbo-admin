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

