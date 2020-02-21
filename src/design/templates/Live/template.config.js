import component from './index';

export default {
  component,
  config: () => ({
    name: '直播',
    desc: '默认样式',
    component: 'live',
    content: {
      component: 'liveDesign',
      data: {
        url: {
          type: '',
          page: '',
          query: ''
        },
        height: 200, // 图片默认高度
        src: '' // 图片链接 必须是 https 开头
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "live", // 标志唯一
        name: "直播", // 装修组件上的名称
        component: "live", // 引入装修组件
        items: [ // 可编辑的项
          {
            key: "backgroundColor",
            title: '背景颜色',
            component: "color",
            value: "#ffffff"
          },
          {
            key: "borderRadius",
            title: '圆角',
            component: "slider",
            value: "2px"
          }
        ]
      },
      {
        key: "margin", // 标志唯一
        name: "外边距", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "marginTop",
            title: '外边距(上)',
            component: "slider",
            value: "0"
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
            value: "0"
          },
          {
            key: "marginRight",
            title: '外边距(右)',
            component: "slider",
            value: "0"
          },
        ]
      }
    ]
  })
}
