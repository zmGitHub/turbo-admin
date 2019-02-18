import { useState } from 'react'

/**
 *
 * @param {初始值} initial
 * 用来设置任何类型的值 返回: any
 */


const useSetState = (initial) => {
  const [ state, set ] = useState(initial)
  const setState = patch => {
    if (patch instanceof Function) {
      set(prevState => Object.assign({}, prevState, patch(prevState)))
    } else {
      set(Object.assign({}, state, patch))
    }
  }
  return [ state, setState ]
}

export default useSetState
