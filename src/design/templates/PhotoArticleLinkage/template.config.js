import component from './index';

export default {
  component,
  config: () => ({
    name: '图文联动',
    desc: '图文联动组件',
    component: 'photoArticleLinkage',
    content: {
      component: 'photoArticleLinkageDesign',
      data: {
        items: [],
        interval: '5000' // 自动切换时间间隔
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "img", // 标志唯一img
        name: "图片", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "backgroundColor",
            title: '背景颜色',
            component: "color",
            value: "#ffffff"
          },
          {
            key: "height",
            title: '高度',
            component: "slider",
            min: 50,
            max: 999,
            value: "148px"
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
      },
    ]
  })
}
