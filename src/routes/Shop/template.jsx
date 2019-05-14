import React from 'react'
import TemplateMaps from '@/design/templates'

const LazyItem = ({ item }) => {
  const { component, content, style } = item
  const template = TemplateMaps[component] || { component: TemplateMaps.error }
  return React.createElement(template.component || 'div', {
    style,
    data: content.data,
  })
}

const LazyTemplate = ({ templates }) => (
  <div className="container">
    {
      templates.map((item, index) => (
        <LazyItem key={`template_view_${index}`} item={item} />
      ))
    }
  </div>
)

export default LazyTemplate
