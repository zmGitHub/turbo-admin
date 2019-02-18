import { useState, useCallback } from 'react'

/**
 *
 * @param {初始值} initial
 * 用来控制 modal等 显示和隐藏 返回: true 或者 false
 */


const useToggle = (initial) => {
  const [ value, setValue ] = useState(initial)
  const toggle = useCallback((nextValue) => {
    if (typeof nextValue !== 'undefined') {
      setValue(!!nextValue)
      return
    }
    setValue(!value)
  }, [setValue])
  return [ value, toggle ]
}

export default useToggle
