
export default {
  component: () => import('./index'),
  config: () => ({
    name: '单张图片',
    desc: '默认样式',
    component: 'image',
    content: {
      component: 'imageDesign',
      data: {
        url: {
          type: 'navigate',
          page: '',
          query: ''
        },
        src: '' // 图片链接 必须是 https 开头
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "padding", // 标志唯一
        name: "内边距", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "paddingTop",
            title: '内边距(上)',
            component: "slider",
            value: "0"
          },
          {
            key: "paddingBottom",
            title: '内边距(下)',
            component: "slider",
            value: "0"
          },
          {
            key: "paddingLeft",
            title: '内边距(左)',
            component: "slider",
            value: "0"
          },
          {
            key: "paddingRight",
            title: '内边距(右)',
            component: "slider",
            value: "0"
          },
        ]
      },
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
            value: "2px"
          },
          {
            key: "height",
            title: '高度',
            component: "slider",
            min: 10,
            max: 999,
            value: "200px"
          },
        ]
      }
    ]
  })
}
