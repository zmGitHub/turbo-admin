import component from './index';

export default {
  component,
  config: () => ({
    name: '商品组件',
    desc: '展示商品列表, 多种布局可选',
    component: 'goodsCard',
    content: {
      component: 'goodsCardDesign',
      data: {
        items: [], // { id, src, name, desc }
        type: 'full', // full-全屏, half-半屏,fulll-全屏左侧, fullr-全屏右侧
        buyButton: true
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
            value: "0"
          },
          {
            key: "marginLeft",
            title: '外边距(左)',
            component: "slider",
            value: "12px"
          },
          {
            key: "marginRight",
            title: '外边距(右)',
            component: "slider",
            value: "12px"
          },
        ]
      },
    ]
  })
}
