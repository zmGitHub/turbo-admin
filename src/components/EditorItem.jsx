import React, { Suspense, lazy } from 'react'

const EditorItem = ({ id, onChange, config, componentMaps }) => {
  const { title, key, component, value } = config
  // TODO: 组件不存在需要处理
  // eslint-disable-next-line dot-notation
  console.log(componentMaps)
  const LoadComponent = componentMaps[component] || componentMaps["error"]
  console.log(LoadComponent)
  const Lazycomponent = lazy(() => LoadComponent)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lazycomponent config={config} onChange={onChange} />
    </Suspense>
  )
}

export default EditorItem
