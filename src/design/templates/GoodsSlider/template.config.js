import component from './index';

export default {
  component,
  config: () => ({
    name: '侧滑商品组件',
    desc: '侧滑商品组件',
    component: 'goodsSlider',
    content: {
      component: 'goodsSliderDesign',
      data: {
        display: ['title', 'desc', 'price'],
        items: [], // { id, src, name, desc }
        url: {
          type: '',
          page: '',
          query: ''
        },
        moreImg: ''
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "margin", // 标志唯一
        name: "外边距", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "marginTop",
            title: '外边距(上)',
            component: "slider",
            value: "8px"
          },
          {
            key: "marginBottom",
            title: '外边距(下)',
            component: "slider",
            value: "8px"
          }
        ]
      },
    ]
  })
}
