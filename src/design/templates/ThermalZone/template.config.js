
import component from './index';

export default {
  component,
  config: () => ({
    name: '图片热区',
    desc: '在图片上添加热区',
    component: 'thermalZone',
    content: {
      component: 'thermalZoneDesign',
      data: {
        coordinates: [],
        height: 0,
        src: '' // 图片链接 必须是 https 开头
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "img", // 标志唯一
        name: "图像", // 装修组件上的名称
        component: "image", // 引入装修组件
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
            value: "0"
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
