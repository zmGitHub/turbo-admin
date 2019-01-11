import { useState } from 'react'

/**
 *
 * @param {初始值} initial
 * 用来设置任何类型的值 返回: any
 */


const useSetState = (initial) => {
  const [ state, set ] = useState(initial)
  const setState = (patch) => {
    if (patch instanceof Function) {
      set(preveState => Object.assign(state, patch(preveState)))
    } else {
      Object.assign(state, patch)
      set(state)
    }
  }
  return [ state, setState ]
}

export default useSetState
