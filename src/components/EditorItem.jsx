import React, { Suspense, lazy } from 'react'

const EditorItem = ({ onChange, config, componentMaps }) => {
  const { component } = config
  // TODO: 组件不存在需要处理
  // eslint-disable-next-line dot-notation
  const LoadComponent = componentMaps[component] || componentMaps["error"]
  const LazyComponent = lazy(() => LoadComponent)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent config={config} onChange={onChange} />
    </Suspense>
  )
}

export default EditorItem
